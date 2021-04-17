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

  if (msg.content.startsWith('!!p')) {
    execute(msg, serverQueue, '!!p');
    return;
  } else if (msg.content.startsWith('!!play')) {
    execute(msg, serverQueue, '!!play');
    return;
  } else if (msg.content.startsWith('!!skip')) {
    skip(msg, serverQueue, '!!skip');
    return;
  } else if (msg.content.startsWith('!!stop')) {
    stop(msg, serverQueue, '!!stop');
    return;
  } else if (msg.content.startsWith('!!dc')) {
    dc(msg, serverQueue, '!!dc')
  }
}


async function execute(message, serverQueue, localPrefix){
  let vc = message.member.voice.channel;
  if(!vc){
    return message.channel.send("Please join a voice chat first");
  }else{
    const args = message.content.slice(localPrefix.length).trim().split(/ +/g)
    const query = args.join(" ")

    if (validUrl.isUri(query)){
      if (ytdl.validateURL(query)) {
        const songInfo = await ytdl.getInfo(query)
        const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url
        };
        addMusic(message, song)
      } else {
        try {
          // Playlist
          const playlistId = await ytpl.getPlaylistID(query)
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
      const result = await searcher.search(query, { type: "video" })
      const songInfo = await ytdl.getInfo(result.first.url)
      const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url
      };
      addMusic(message, song)
    }
  }
}
function play(guild, song){
  const serverQueue = queue.get(guild.id);
  if(!song){
      serverQueue.vChannel.leave();
      queue.delete(guild.id);
      return;
  }
  const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on('finish', () =>{
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
      })
      serverQueue.txtChannel.send(`Now playing ${serverQueue.songs[0].url}`)
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
      return makeEmbedText(`${song.length} songs has been added`, (embed) => {
        message.channel.send(embed);
      })
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`The song has been added ${song.url}`);
    }
  }
}

module.exports = music