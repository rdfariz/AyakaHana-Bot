const Discord = require("discord.js")
const client = new Discord.Client()
const { prefix, token, chWelcome } = require("./config.json")
const { makeEmbedWelcome } = require("./utils")

// Modules
const gacha = require("./modules/gacha")
const greeting = require("./modules/greeting")
const general = require("./modules/general")

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('!qi help', { type: 'PLAYING' })
})

client.on("message", async msg => {
  if (msg.author.bot) return;

  general(client, msg)
  
  if (!msg.content.startsWith(prefix)) {
    return
  } else if (msg.content.startsWith(prefix)) {
    greeting(client, msg)
    gacha(client, msg)
  }
})

client.on('guildMemberAdd', member => {
  makeEmbedWelcome(member, (embed) => {
    member.guild.channels.cache.get(chWelcome).send(embed)
  })
});

client.on('guildMemberRemove', member => {
  console.log('someone leave the server')
});

client.login(token)