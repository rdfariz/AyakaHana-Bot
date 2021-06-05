const { prefixSplit } = require("../config.json")
const { makeEmbed } = require('../utils')
const moment = require('moment')

function increaseSeconds (minute, seconds, increase) {
  let _minute = parseInt(minute)
  let _seconds = parseInt(seconds)
  const _increase = parseInt(increase)

  _seconds += _increase
  if (_seconds >= 60) {
    _minute++
    _seconds -= 60 
  }

  const minuteToSeconds = _minute*60
  const final = moment.utc((minuteToSeconds + _seconds)*1000).format('mm:ss')
  const totalSeconds = minuteToSeconds + _seconds

  return {
    mm: _minute,
    ss: _seconds,
    txt: final,
    totalSeconds
  }
}

module.exports = async (client, msg) => {
  const _query = msg.content.split(prefixSplit).pop().toLowerCase()
  const query = _query.replace(/\s/g, '')

  var index = query.indexOf('/')
  var data = [query.slice(0, index), query.slice(index + 1)]

  const time = data[0]
  const minute = parseInt(time.split(':')[0])
  const seconds = parseInt(time.split(':')[1])
  const player = data[1]
  const minuteToSeconds = minute*60
  const totalSeconds = minuteToSeconds + seconds

  // Security
  if (minute.toString().length > 2 || seconds.toString().length > 2 || parseInt(player) <= 0) {
    makeEmbed({ title: 'Invalid Format', desc: 'Valid Format: !!split mm:ss/part' }, (embed) => {
      msg.reply(embed)
    })

    return
  }
  if (parseInt(player) > 100) {
    makeEmbed({ title: 'Too many parts', desc: 'Valid Part: < 100' }, (embed) => {
      msg.reply(embed)
    })
    return
  }

  
  // Calculating
  let increase = (totalSeconds/player).toFixed(1)
  const increaseSplit = increase.toString().split('.')
  if (increaseSplit[increaseSplit.length-1].toString() === '0') {
    increase = parseInt(increase)
  }

  const txt = moment.utc((minuteToSeconds + seconds)*1000).format('mm:ss')
  const inputObj = { mm: minute, ss: seconds, txt, totalSeconds}

  if (parseInt(increase) >= 1) {
    let prevData = { mm: 0, ss: 0, txt: '00:00', totalSeconds: 0 }
    const arr = [prevData]
    
    for (let i = 0; i < player; i++) {
      const data = increaseSeconds(prevData.mm, i > 0 ? prevData.ss : prevData.ss, increase)
      prevData = {...data}
      arr.push({...data})
    }

    // Message
    let message = ''
    message += `Split: ${parseInt(increase)} Seconds/Part`

    if (arr[arr.length-1].txt.toString() !== inputObj.txt.toString()) {
      // Calculate last part
      const lastIndexToSeconds = arr[arr.length-1].totalSeconds
      const lastPartLength = parseInt(totalSeconds) - parseInt(lastIndexToSeconds)

      if (parseInt(lastPartLength) <= parseInt(increase)) {
        message+= `\nLast Part: ${parseInt(parseFloat(increase) + parseFloat(lastPartLength))} Seconds`
        arr[arr.length-1] = inputObj
      } else {
        message+= `\nLast Part: ${lastPartLength} Seconds`
        arr.push(inputObj)
      }
    }

    message += "\n\n"

    arr.map((item, index) => {
      if (index > 0) {
        message += " / "
      }
      message += item.txt
    })
    
    makeEmbed({ title: `${txt} / ${player} Part`, desc: message }, (embed) => {
      msg.reply(embed)
    })
  } else {
    // msg.reply(`Durasi terlalu pendek untuk dibagi ${player}`)
  }
}


/*
lastpart <= split ->>>>  lastpart = lastpart.seconds + last

https://stackoverflow.com/questions/48717188/split-time-into-smaller-parts

#Alrogitm:
1. time -> second
2.second -> 

ex:
1menit/4
60/4 = 15 detik / orang

time -- time + 15 detik
time + 15 detik -- time + 15 detik + 15 detik
time + 15 detik -- time + 15 detik + 15 detik + 15 detik

#increase time with second func:
function (minute, seconds, increase) {
  const minute = minute
  const seconds = _ + increase -> if (hasil >= 60) {  minute++; return hasil - 60  }

  return minute +":"+ seconds
}

const arr = []

*/