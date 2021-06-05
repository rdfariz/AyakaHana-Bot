const Discord = require("discord.js")
const { MessageEmbed } = Discord

async function makeEmbed ({ author = '', authorImage = '', thumbnail = '', footer = '', title = '', image = '', desc = '' }, callback) {
  const embed = await new MessageEmbed()
    .setAuthor(author, authorImage)
    .setTitle(title)
    .setImage(image)
    .setColor(0xff0000)
    .setDescription(desc)
    .setThumbnail(thumbnail)
    .setFooter(footer);
  return callback(embed)
}

async function makeEmbedLyrics ({ author = '', authorImage = '', url = '', thumbnail = '', title = '', image = '', desc = '' }, callback) {
  const embed = await new MessageEmbed()
    .setAuthor(author, authorImage)
    .setTitle(title)
    .setImage(image)
    .setColor(0xff0000)
    .setDescription(desc)
    .setThumbnail(thumbnail)
    .addField('Source:', `[Full Lyrics](${url})`, true)
  return callback(embed)
}

function makeEmbedWelcome (member, callback) {
  const embed = new MessageEmbed()
    .setAuthor(`${member.user.tag} just joined!`, member.user.avatarURL())
    .setDescription(`${member} Welcome to ${msg.guild.name}! Don't forget to read the rules!`)
    .setColor("FF0000");
  return callback(embed)
}

function makeEmbedText (text, callback) {
  const embed = new MessageEmbed()
    .setDescription(text)
    .setColor("FF0000");
  return callback(embed)
}

module.exports = { makeEmbed, makeEmbedText, makeEmbedWelcome, makeEmbedLyrics }