const { replyImage } = require("../utils")

module.exports = async (client, msg) => {
  const query = msg.content.split('!qi').pop()
  
  if (query.includes('wf')) {
    const category = query.split('wf ').pop()
    replyImage(msg, category)
  } else if (query.includes('waifu')) {
    const category = query.split('waifu ').pop()
    replyImage(msg, category)
  }

  // if (query === ' foto ical') {
  //   const attachment = new MessageAttachment('https://cdn.discordapp.com/attachments/747165287065059348/830488445872898048/22RmCZt.png');
  //   // Send the attachment in the message channel
  //   msg.channel.send(`${msg.author}, ini foto ical`, attachment);
  // }
  // if (query === ' istri ical') {
  //   const attachment = new MessageAttachment('https://media.discordapp.net/attachments/472313197836107780/546586994600443914/XBhmywF.png');
  //   // Send the attachment in the message channel
  //   msg.channel.send(`${msg.author}, ini foto ical`, attachment);
  // }
}