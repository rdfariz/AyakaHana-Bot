const Discord = require("discord.js")
const client = new Discord.Client()
const { prefix, token } = require("./config.json")
const { makeEmbedWelcome } = require("./utils")

// Modules
const gacha = require("./modules/gacha")
const greeting = require("./modules/greeting")
const general = require("./modules/general")
const music = require("./modules/music")

const idGamerNubi = "704446762059956274"
const chWelcomeGamerNubi = "814485275307671612"

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity(`${prefix}`, { type: 'PLAYING' })
})

client.on("message", async msg => {
  if (msg.author.bot) return;

  if (msg.guild.id === idGamerNubi) {
    general(client, msg)
  }

  music(client, msg)
  
  if (msg.content.startsWith(prefix)) {
    gacha(client, msg)
    greeting(client, msg)
  } else if (!msg.content.startsWith(prefix)) {
    return
  }
})

client.on('guildMemberAdd', member => {
  if (member.guild.id === idGamerNubi) {
    makeEmbedWelcome(member, (embed) => {
      member.guild.channels.cache.get(chWelcomeGamerNubi).send(embed)
    })
  }
});

client.on('guildMemberRemove', member => {
  console.log('someone leave the server')
});

client.login(token)