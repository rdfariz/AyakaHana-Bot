const Discord = require("discord.js")
const client = new Discord.Client()
const { prefix, prefixSplit, token } = require("./config.json")

// Modules
const greeting = require("./modules/greeting")
const split = require("./modules/split")
const music = require("./modules/music")

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity(`for ${prefix}`, { type: 'WATCHING' })
})

client.on("message", async msg => {
  if (msg.author.bot) return;

  if (msg.content.startsWith(prefix)) {
    return greeting(client, msg)
  } else if (msg.content.startsWith(prefixSplit)) {
    return split(client, msg)
  }

  music(client, msg)
})

client.login(token)