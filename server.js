const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express()

const fetch = require('isomorphic-fetch')

const Discord = require('discord.js')
const client = new Discord.Client()

require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  intervalFunc()
})

function intervalFunc() {
  fetch('https://mcapi.us/server/status?ip=51.79.44.222&port=25592')
    .then(response => response.json())
    .then(data => {
      client.user.setActivity(
        'Online with ' + data.players.now + '/' + data.players.max + ' Players!'
      )
      console.log(data.players.now + '/' + data.players.max)
      setInterval(intervalFunc, 60000)
    })
    .catch(err => {
      console.log(err)
      setInterval(intervalFunc, 60000)
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
