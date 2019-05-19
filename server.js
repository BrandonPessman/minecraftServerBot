const express = require('express')
const app = express()

const fetch = require('isomorphic-fetch')

const Discord = require('discord.js')
const client = new Discord.Client()

require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  intervalFunc()
})

var count = 0
function intervalFunc() {
  fetch('https://mcapi.us/server/status?ip=51.79.44.222&port=25592')
    .then(response => response.json())
    .then(data => {
      client.user
        .setActivity(
          'Minecraft | ' + data.players.now + '/' + data.players.max + ' Online'
        )
        .then(e => {
          console.log(count + ': ' + data.players.now + '/' + data.players.max)
          count++
          setTimeout(intervalFunc, 5 * 60000)
        })
    })
}

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})

client.login('' + process.env.CLIENT_KEY)

app.listen(process.env.PORT, () => {
  console.log('API Live on Port: ' + process.env.PORT)
})
