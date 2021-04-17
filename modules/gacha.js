const { prefix } = require("../config.json")
const { replyImage } = require("../utils")

module.exports = async (client, msg) => {
  const query = msg.content.split(prefix).pop().toLowerCase()
  
  if (query.includes('wf')) {
    const category = query.split('wf ').pop()
    replyImage(msg, category)
  } else if (query.includes('waifu')) {
    const category = query.split('waifu ').pop()
    replyImage(msg, category)
  }

  // if (query.includes('foto ical')) {
  //   const attachment = new MessageAttachment('https://cdn.discordapp.com/attachments/747165287065059348/830488445872898048/22RmCZt.png');
  //   msg.channel.send(`${msg.author}, ini foto ical`, attachment);
  // } else if (query.includes('istri ical')) {
  //   const attachment = new MessageAttachment('https://media.discordapp.net/attachments/472313197836107780/546586994600443914/XBhmywF.png');
  //   msg.channel.send(`${msg.author}, ini foto ical`, attachment);
  // }
}