const Discord = require("discord.js")
const animePictures = require('anime-pictures')
const randomanime = require("random-anime")

const { MessageEmbed } = Discord
const client = new Discord.Client()

const token = "ODMwNTI5NzYwNzQ0NTcwOTQx.YHIBHQ.0TxL5XE96jWiuxGvlW_hHKvkzxw"
const what = ["oit kenapa?", "apaan?", "ada apa nih?"]
const responseWaifu = [
  "Waifu kamu nihh, langgeng yaa",
  "Wuihh, hoki bngt kakkk",
  "Gila!, beruntung bngt kak :(",
  "Langgeng terus ya kak!!",
  "Kalian serasi deh :D",
  "Kayaknya kalian kurang serasi deh :("
]

function makeEmbed ({ title = '', image = '', desc = '' }, callback) {
  const embed = new MessageEmbed()
    .setTitle(title)
    .setImage(image)
    .setColor(0xff0000)
    .setDescription(desc);
  return callback(embed)
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('!qi', { type: 'PLAYING' });
})

// Add Welcome
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome-message');
  // Do nothing if the channel wasn't found on this server
  console.log(channel)
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, mari kita main dan nyantuy bersama ${member}`);
});

// On Message
client.on("message", async msg => {

  if (msg.content.startsWith('!qi')) {
    const _message = msg.content.split('!qi').pop()

    if (_message === '' || _message === ' ') {
      makeEmbed({
        title: 'List Commands',
        desc: "!qi => manggil BOT\n!qi help => list commands\n!qi wf => gacha waifu\n!qi wf wangy => gacha waifu wangy\n!qi bc :channel :message => broadcast message"
      }, (embed) => {
        msg.reply(what[Math.floor(Math.random() * what.length)], embed);
      })
    }
    
    if (_message.includes('bc')) {
      const query = _message.split('bc ').pop()

      var index = query.indexOf(' ')
      var split = [query.slice(0, index), query.slice(index + 1)]

      const channelBc = split[0]
      const messageBc = split[1]

      const channel = msg.guild.channels.cache.find(ch => ch.name === channelBc);
      if (!channel) return;
      channel.send(messageBc);

    } else if (_message.includes('summon')) {
      
    } else if (_message.includes('wf')) {
      const category = _message.split('wf ').pop()
      if (category.includes('wangy')) {
        const anime = randomanime.anime()
        makeEmbed({ image: anime }, (embed) => {
          msg.reply(responseWaifu[Math.floor(Math.random() * responseWaifu.length)], embed);
        })
      } else if (category.includes('nsfw')) {
        const anime = randomanime.nsfw()
        makeEmbed({ image: anime }, (embed) => {
          msg.reply(responseWaifu[Math.floor(Math.random() * responseWaifu.length)], embed);
        })
      } else {
        animePictures.random()
        .then(result => {
          const obj = { title: result.name, image: result.character_image, desc: result.desc }
          makeEmbed(obj, (embed) => {
            msg.reply(responseWaifu[Math.floor(Math.random() * responseWaifu.length)], embed);
          })
        });
      }

    } else if (_message.includes('help')) {
      makeEmbed({
        title: 'List Commands',
        desc: "!qi => manggil BOT\n!qi help => list commands\n!qi wf => gacha waifu\n!qi wf wangy => gacha waifu wangy\n!qi bc :channel :message => broadcast message"
      }, (embed) => {
        msg.reply('', embed);
      })
    }

    

    // if (_message.includes('waifu')) {
    //   axios.get(`http://www.animecharactersdatabase.com/api_series_characters.php?character_q=`)
    //     .then((res) => {
    //       const data = res.data.search_results
    //       const selectedWaifu = data[Math.floor(Math.random() * data.length)]
    //       const obj = { title: selectedWaifu.name, image: selectedWaifu.character_image, desc: selectedWaifu.desc }
    //       makeEmbed(obj, (embed) => {
    //         msg.reply(responseWaifu[Math.floor(Math.random() * responseWaifu.length)], embed);
    //       })
    //     })
    //     .catch((err) => {
    //     })
    // }

    // if (_message.includes('play')) {
    //   const query = _message.split('play ').pop()
    //   var index = query.indexOf(' ')
    //   var split = [query.slice(0, index), query.slice(index + 1)]

    //   const urlMusic = split[0]
      
    //   if (!msg.guild) return;
      
    //   if (msg.member.voice.channel) {
    //     const connection = await msg.member.voice.channel.join()
    //     const dispatcher = connection.play(ytdl(urlMusic))
    //   } else {
    //     msg.reply('You need to join a voice channel first!');
    //   }
    // } else if (_message.includes('dc')) {
    //   if (!msg.guild) return;
      
    //   if (msg.member.voice.channel) {
    //     await msg.member.voice.channel.leave()
    //   } else {
    //     msg.reply('You need to join a voice channel first!');
    //   }
    // }
  }

  // if (_message === ' foto ical') {
  //   const attachment = new MessageAttachment('https://cdn.discordapp.com/attachments/747165287065059348/830488445872898048/22RmCZt.png');
  //   // Send the attachment in the message channel
  //   msg.channel.send(`${msg.author}, ini foto ical`, attachment);
  // }
  // if (_message === ' istri ical') {
  //   const attachment = new MessageAttachment('https://media.discordapp.net/attachments/472313197836107780/546586994600443914/XBhmywF.png');
  //   // Send the attachment in the message channel
  //   msg.channel.send(`${msg.author}, ini foto ical`, attachment);
  // }
})

client.login(token)