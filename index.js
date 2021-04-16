const Discord = require("discord.js")
const client = new Discord.Client()
const { prefix, token } = require("./config.json")
const { makeEmbedWelcome } = require("./utils")

// Modules
const gacha = require("./modules/gacha")
const greeting = require("./modules/greeting")
const general = require("./modules/general")
const { execute, stop, skip } = require("./modules/music")

const queue = new Map()

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
  
  if (!msg.content.startsWith(prefix)) {
    return
  } else if (msg.content.startsWith(prefix)) {
    gacha(client, msg)
    greeting(client, msg)
  }

  // Music
  const serverQueue = queue.get(msg.guild.id);
  if (msg.content.startsWith(`${prefix}play`)) {
    execute(msg, serverQueue);
    return;
  } else if (msg.content.startsWith(`${prefix}skip`)) {
    skip(msg, serverQueue);
    return;
  } else if (msg.content.startsWith(`${prefix}stop`)) {
    stop(msg, serverQueue);
    return;
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