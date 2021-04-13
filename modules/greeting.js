const { makeEmbed } = require("../utils")

const greeting = ["oit kenapa?", "apaan?", "ada apa nih?"]

module.exports = async (client, msg) => {
  const query = msg.content.split('!qi').pop()

  if (query === '' || query === ' ') {
    msg.reply(greeting[Math.floor(Math.random() * greeting.length)]);
  } else if (query.toLowerCase().includes('help')) {
    makeEmbed({
      title: 'List Commands',
      desc: "!qi => manggil BOT\n!qi help => list commands\n!qi wf => gacha waifu\n!qi wf wangy => gacha waifu wangy\n!qi bc :channel :message => broadcast message\n!qi tag :jumlah_pesan :@user => tag user"
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
  }
}
