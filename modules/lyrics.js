const {
  prefixLyrics,
  geniusAppi
} = require('../config.json')

const { getSongById } = require('genius-lyrics-api')
const Genius = require('genius-lyrics')
const Client = new Genius.Client(geniusAppi);

const { makeEmbedLyrics, makeEmbed } = require('../utils')

async function lyrics (client, msg) {
  if (msg.content.startsWith(prefixLyrics)) {
    execute(msg, prefixLyrics);
    return;
  }
}

async function execute(msg, localPrefix){
  const query = msg.content.slice(localPrefix.length)
  const queryTrim = query.trim()

  // Security
  if (!query || !queryTrim) {
    makeEmbed({ title: 'Invalid Format', desc: 'Valid Format: !!lyrics song' }, (embed) => {
      msg.reply(embed)
    })

    return
  }
  
  // Application
  let msgLoading = {}
  msgLoading = await msg.channel.send('Searching Lyrics...')

  Client.songs.search(query)
    .then(async (searches) => {
      // Pick first one
      const firstSong = searches[0];
      // const title = firstSong.title
      // const artist = firstSong.artist.name
      const fullTitle = firstSong.fullTitle
      const firstId = firstSong.id

      await getSongById(firstId, geniusAppi)
        .then((res) => {
          msgLoading.delete()

          const albumArt = res.albumArt
          const url = res.url
          let lyrics = res.lyrics

          if (lyrics.length >= 1950) {
            lyrics = lyrics.substring(0,1950) + " ....."
          }

          makeEmbedLyrics({ title: fullTitle, desc: lyrics, thumbnail: albumArt, url }, (embed) => {
            msg.reply(embed)
          })

          // Related Songs
          let relatedMessages = ''
          searches.map((song, index) => {
            relatedMessages += `${(index+1)}. ${song.fullTitle} | [Lyrics](${song.url})\n`
          })
          makeEmbed({ title: 'Related Songs', desc: relatedMessages }, (embed) => {
            msg.reply(embed)
          })
        })
        .catch((err) => {
          msgLoading.delete()
          msg.reply('No result was found')
        })

      // const options = {
      //   apiKey: geniusAppi,
      //   title: title,
      //   artist: artist,
      //   optimizeQuery: true
      // };

      // await searchSong(options)
      //   .then((songs) => {
      //     if (songs) {
      //       let message = ''
      //       songs.map((song, index) => {
      //         console.log(song)
      //         message += `${(index+1)}. ${song.title} | [Lyrics](${song.url})\n`
      //       })
      //       makeEmbed({ title: 'Related Songs', desc: message }, (embed) => {
      //         msg.reply(embed)
      //       })
      //     }
      //   })
      //   .catch((err) => {})
    })
    .catch((err) => {
      msgLoading.delete()
      msg.reply('No result was found')
    })
}

module.exports = lyrics