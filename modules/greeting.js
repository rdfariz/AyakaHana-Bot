const { prefix } = require("../config.json")
const { makeEmbed } = require("../utils")

module.exports = async (client, msg) => {
  const query = msg.content.split(prefix).pop()
  const queryTrim = query.trim().toLowerCase()

  const help = {
    title: 'List Commands',
    desc: `${prefix} => List Commands\n!!split mm:ss/part => Split Duration into Parts`
  }

  // const musicHelp = '!!p :music => Play Music\n!!skip => Skip Music\n!!stop => Stop Music\n!!dc => Disconnect Music'

  if (queryTrim === '' || queryTrim === ' ') {
    makeEmbed(help, (embed) => {
      msg.reply(embed)
    })
  } else if (query.toLowerCase().includes('help')) {
    makeEmbed(help, (embed) => {
      msg.reply(embed)
    })
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
