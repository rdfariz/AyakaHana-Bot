const { prefix } = require("../config.json")
const { makeEmbed } = require("../utils")

const greeting = ["oit kenapa?", "apaan?", "ada apa nih?"]

module.exports = async (client, msg) => {
  const query = msg.content.split(prefix).pop()
  const queryTrim = query.trim().toLowerCase()

  if (queryTrim === '' || queryTrim === ' ') {
    makeEmbed({
      title: 'List Commands',
      desc: `${prefix} => manggil BOT\n${prefix} help => list commands\n${prefix} wf => gacha waifu\n${prefix} wf wangy => gacha waifu wangy\n\n!!p :music => Play Music\n!!skip => Skip Music\n!!stop => Stop Music\n!!dc => Disconnect Music\n\n${prefix} bc :channel :message => broadcast message\n${prefix} tag :jumlah_pesan :@user => tag user`
    }, (embed) => {
      msg.reply(greeting[Math.floor(Math.random() * greeting.length)], embed)
    })
  } else if (query.toLowerCase().includes('help')) {
    makeEmbed({
      title: 'List Commands',
      desc: `${prefix} => manggil BOT\n${prefix} help => list commands\n${prefix} wf => gacha waifu\n${prefix} wf wangy => gacha waifu wangy\n\n!!p :music => Play Music\n!!skip => Skip Music\n!!stop => Stop Music\n!!dc => Disconnect Music\n\n${prefix} bc :channel :message => broadcast message\n${prefix} tag :jumlah_pesan :@user => tag user`
    }, (embed) => {
      msg.reply('', embed)
    })
  } else if (query.toLowerCase().includes('bc')) {
    const str = query.split('bc ').pop()
    var index = str.indexOf(' ')
    var split = [str.slice(0, index), str.slice(index + 1)]

    const channelBc = split[0]
    const messageBc = split[1]

    const channel = msg.guild.channels.cache.find(ch => ch.name === channelBc);
    if (!channel) return;
    channel.send(messageBc);
  } else if (query.toLowerCase().includes('tag')) {
    const str = query.split('tag ').pop()
    var index = str.indexOf(' ')
    var split = [str.slice(0, index), str.slice(index + 1)]

    const iterator = split[0]
    
    if (isNaN(iterator)) {
      const users = msg.mentions.users
      let final = ""
      await users.forEach((user) => {
        final += `<@${user.id}> `
      })
      await msg.channel.send(final)
    } else if (iterator <= 10) {
      const users = msg.mentions.users
      let final = ""
      await users.forEach((user) => {
        final += `<@${user.id}> `
      })

      for (let i = 0; i < iterator; i++) {
        await msg.channel.send(final)
      }
    } else {
      msg.reply("Melebihi batas maksimal, batas maksimal 10 Pesan.. jgn barbar ya anda :)")
    }
  } else if (queryTrim === 'join') {
    const vc = msg.member.voice.channel;
    if(!vc){
      return msg.channel.send("Please join a voice chat first");
    }else{
      await vc.join();
    }
  } else if (queryTrim === 'dc') {
    const vc = msg.member.voice.channel;
    if(!vc){
      return msg.channel.send("Please join a voice chat first");
    }else{
      await vc.leave();
    } 
  }
}
