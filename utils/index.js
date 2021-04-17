const Discord = require("discord.js")
const { MessageEmbed } = Discord
const animePictures = require('anime-pictures')
const randomanime = require("random-anime")

const { server } = require("../config.json")

const responseWaifu = [
  "Waifu kamu nihh, langgeng yaa",
  "Wuihh, hoki bngt kakkk",
  "Gila!, beruntung bngt kak :(",
  "Langgeng terus ya kak!!",
  "Kalian serasi deh :D",
  "Kayaknya kalian kurang serasi deh :("
]

async function makeEmbed ({ title = '', image = '', desc = '' }, callback) {
  const embed = await new MessageEmbed()
    .setTitle(title)
    .setImage(image)
    .setColor(0xff0000)
    .setDescription(desc);
  return callback(embed)
}

function makeEmbedWelcome (member, callback) {
  const embed = new MessageEmbed()
    .setAuthor(`${member.user.tag} just joined!`, member.user.avatarURL())
    .setDescription(`${member} Welcome to ${server}! Don't forget to read the <#787051075520692235>!`)
    .setColor("FF0000");
  return callback(embed)
}

function makeEmbedText (text, callback) {
  const embed = new MessageEmbed()
    .setDescription(text)
    .setColor("FF0000");
  return callback(embed)
}

async function replyImage (msg, category, text = responseWaifu[Math.floor(Math.random() * responseWaifu.length)]) {
  if (category.includes('wangy')) {
    const anime = randomanime.anime()
    makeEmbed({ image: anime }, (embed) => {
      msg.reply(text, embed);
    })
  } else if (category.includes('nsfw')) {
    const anime = randomanime.nsfw()
    makeEmbed({ image: anime }, (embed) => {
      msg.reply(text, embed);
    })
  } else {
    animePictures.random()
    .then(async result => {
      const obj = { title: result.name, image: result.character_image, desc: result.desc }
      await makeEmbed(obj, (embed) => {
        msg.reply(text, embed);
      })
    });
  }
}

module.exports = { makeEmbed, makeEmbedText, makeEmbedWelcome, replyImage }