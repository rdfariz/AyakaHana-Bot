const { replyImage } = require("../utils")

module.exports = async (client, msg) => {
  const query = msg.content.toLowerCase()
  
  const idArip = "336055510774317057"
  const idIcal = "460801785527926794"
  const idAkbar = "689453829523243107"
  const idYuuqi = "499167473505927169"
  const idRey = "576569097165471796"
  const idFandy = "806402900766490644"
  const idHeiSava = "601981577630842880"
  const idZexarr = "635000192151846927"

  const author = msg.author.id
  if (author !== idIcal && (query === 'cal' || query === 'ical')) {
    msg.channel.send(`<@${idIcal}> dipanggil <@${author}> tuh`)
  }
  if (author !== idArip && (query === 'rip' || query === 'rif' || query === 'arip')) {
    msg.channel.send(`<@${idArip}> dipanggil <@${author}> tuh`)
  }
  if (author !== idAkbar && (query === 'bar' || query === 'akbar')) {
    msg.channel.send(`<@${idAkbar}> dipanggil <@${author}> tuh`)
  }
  if (author !== idYuuqi && !query.includes('!qi') && (query === 'ki' || query === 'qi' || query === 'yuuqi' || query === 'yuuki')) {
    msg.channel.send(`<@${idYuuqi}> dipanggil <@${author}> tuh`)
  }
  if (author !== idRey && query === 'rey') {
    msg.channel.send(`<@${idRey}> dipanggil <@${author}> tuh`)
  }
  if (author !== idFandy && (query === 'fan' || query === 'fandy' || query === 'fandi')) {
    msg.channel.send(`<@${idFandy}> dipanggil <@${author}> tuh`)
  }
  if (author !== idHeiSava && (query === 'va' || query === 'sava' || query === 'heisava')) {
    msg.channel.send(`<@${idHeiSava}> dipanggil <@${author}> tuh`)
  }
  if (author !== idZexarr && (query === 'man' || query === 'zexarr' || query === 'zexarrr')) {
    msg.channel.send(`<@${idZexarr}> dipanggil <@${author}> tuh`)
  }

  // Filter
  if (query === 'anj' || query === 'anjing' || query === 'ajing' || query === 'ajg') {
    const msgReply = ["Astaghfirullah, jgn kasar :("]
    msg.reply(msgReply[Math.floor(Math.random() * msgReply.length)])
  }
  if (query.includes('gabut') || query.includes('bosan') || query.includes('bosen')) {
    const msgReply = ["mending main sama aku sini kak :3", "nambang skuyy", "pubg ga qi"]
    msg.reply(msgReply[Math.floor(Math.random() * msgReply.length)])
  }
  if (query.includes('ramein')) {
    const msgReply = ["skuyy ramein guys", "ayo guys rameinnn", "gass ramaikan!"]
    msg.reply(msgReply[Math.floor(Math.random() * msgReply.length)])
  }
  
  // if (query.includes('wkwk') || query.includes('wkkw') || query.includes('owk') || query.includes('awok') || query.includes('waok') || query.includes('aowk')) {
  //   const msgReply = ["awokwaokw", "wkwkkw", "wkkwk", "kocakk XD"]
  //   msg.channel.send(msgReply[Math.floor(Math.random() * msgReply.length)])
  // }

  // Ramadhan
  if (query.includes('sahur') || query.includes('saur')) {
    msg.channel.send(`@everyone sahur guysss`)
  }
  if (query.includes('buka')) {
    if (query.includes('puasa')) {
      replyImage(msg, "wangy", "Selamat berbuka puasa guys, nih mimin kasih yg wangy :D")
    } else {
      // msg.channel.send(`Selamat berbuka puasa guysss`)
    }
  }
}
