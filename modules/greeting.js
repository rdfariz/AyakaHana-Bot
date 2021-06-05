
const Discord = require("discord.js")
const { MessageEmbed } = Discord

const { prefix } = require("../config.json")

module.exports = async (client, msg) => {
  const query = msg.content.split(prefix).pop()
  const queryTrim = query.trim().toLowerCase()

  // const musicHelp = '!!p :music => Play Music\n!!skip => Skip Music\n!!stop => Stop Music\n!!dc => Disconnect Music'

  const embed = await new MessageEmbed()
    .setTitle('List Commands')
    .setColor(0xff0000)
    .addFields(
      { name: '**!!kh**', value: 'List Commands', inline: false },
      { name: '**!!split mm:ss/part**', value: 'Split Duration into Parts', inline: false },
      { name: '**!!lyrics :music**', value: 'Search Lyrics Music', inline: false },
      { name: '**!!p :music**', value: 'Play Music', inline: false },
      { name: '**!!skip**', value: 'Skip Music', inline: false },
      { name: '**!!stop**', value: 'Stop Music', inline: false },
      { name: '**!!dc**', value: 'Disconnect Music', inline: false },
    )

  if (queryTrim === '' || queryTrim === ' ') {
    msg.reply(embed)
  } else if (query.toLowerCase().includes('help')) {
    msg.reply(embed)
  }
  
  if (queryTrim === 'join') {
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
