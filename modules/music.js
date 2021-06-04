const {
  prefixPlayMusic,
  prefixPlayMusic2,
  prefixSkipMusic,
  prefixStopMusic,
  prefixDcMusic
} = require('../config.json')

const ytdl = require('ytdl-core')
const ytpl = require('ytpl')
const validUrl = require('valid-url');
const { youtubeApi } = require("../config.json")
 
const { makeEmbedText } = require('../utils')
const { YTSearcher } = require('ytsearcher');

const searcher = new YTSearcher({
    key: youtubeApi,
    revealed: true
});

const queue = new Map()

async function music (client, msg) {
  const serverQueue = queue.get(msg.guild.id);

  if (msg.content.startsWith(prefixPlayMusic)) {
    execute(msg, serverQueue, prefixPlayMusic);
    return;
  } else if (msg.content.startsWith(prefixPlayMusic2)) {
    execute(msg, serverQueue, prefixPlayMusic2);
    return;
  } else if (msg.content.startsWith(prefixSkipMusic)) {
    skip(msg, serverQueue, prefixSkipMusic);
    return;
  } else if (msg.content.startsWith(prefixStopMusic)) {
    stop(msg, serverQueue, prefixStopMusic);
    return;
  } else if (msg.content.startsWith(prefixDcMusic)) {
    dc(msg, serverQueue, prefixDcMusic)
  }
}


async function execute(message, serverQueue, localPrefix){
  let vc = message.member.voice.channel;
  if(!vc){
    return message.channel.send("Please join a voice chat first");
  }else{
    const query = message.content.slice(localPrefix.length)
    const queryTrim = query.trim()

    if (validUrl.isUri(queryTrim)){
      if (ytdl.validateURL(queryTrim)) {
        const songInfo = await ytdl.getInfo(queryTrim)
        const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url
        };
        addMusic(message, song)
      } else {
        try {
          // Playlist
          const playlistId = await ytpl.getPlaylistID(queryTrim)
          const playlist = await ytpl(playlistId);
          const songs = await playlist.items.map((item) => {
            return {
              title: item.title,
              url: item.shortUrl
            }
          })

          await addMusic(message, songs, true)
        } catch (err) {
          return message.channel.send("Invalid URL!");
        }
      }
    } else {
      try {
        const result = await searcher.search(query, { type: "video" })
        const songInfo = await ytdl.getInfo(result.first.url)
        const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url
        };
        addMusic(message, song)
      } catch (err) {
        return message.channel.send("Server doesn't respond, try using url video.")
      }
    }
  }
}
async function play(guild, song){
  const serverQueue = queue.get(guild.id);
  if(!song){
      serverQueue.vChannel.leave();
      queue.delete(guild.id);
      return;
  }

  let msgPlaying = {}
  const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on('finish', () =>{
          msgPlaying.delete()
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
      })
      msgPlaying = await serverQueue.txtChannel.send(`Now playing ${serverQueue.songs[0].url}`)
}
function stop (message, serverQueue){
  if(!message.member.voice.channel)
      return message.channel.send("You need to join the voice chat first!")
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}
function skip (message, serverQueue){
  if(!message.member.voice.channel)
      return message.channel.send("You need to join the voice chat first");
  if(!serverQueue)
      return message.channel.send("There is nothing to skip!");
  serverQueue.connection.dispatcher.end();
}
function dc (message, serverQueue){
  if(!message.member.voice.channel)
      return message.channel.send("You need to join the voice chat first");
      
  serverQueue.vChannel.leave()
  queue.delete(message.guild.id)
}


async function addMusic (message, song, isArray = false) {
  const serverQueue = queue.get(message.guild.id);
  let vc = message.member.voice.channel;

  if(!serverQueue){
    const queueConstructor = {
      txtChannel: message.channel,
      vChannel: vc,
      connection: null,
      songs: [],
      volume: 10,
      playing: true
    };
    queue.set(message.guild.id, queueConstructor);

    if (isArray) {
      song.forEach((s) => {
        queueConstructor.songs.push(s);
      })
    } else {
      queueConstructor.songs.push(song);
    }

    try{
      let connection = await vc.join();
      queueConstructor.connection = connection;
      play(message.guild, queueConstructor.songs[0]);

      if (isArray) {
        return makeEmbedText(`${song.length} songs has been added`, (embed) => {
          message.channel.send(embed);
        })
      }
    }catch (err){
      queue.delete(message.guild.id);
      return message.channel.send(`Unable to join the voice chat ${err}`)
    }
  } else{
    if (isArray) {
      song.forEach((s) => {
        serverQueue.songs.push(s);
      })
      return makeEmbedText(`${song.length} Songs has been added`, (embed) => {
        message.channel.send(embed);
      })
    } else {
      serverQueue.songs.push(song)
      const author = message.author.id
      return makeEmbedText(`Queued ${song.title} [<@${author}>]`, (embed) => {
        message.channel.send(embed);
      })
    }
  }
}

module.exports = music