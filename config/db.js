const mongoose = require('mongoose')
require('dotenv').config()

const dbName = process.env.DB_NAME
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const uri = `mongodb+srv://${username}:${password}@${dbName}.e6k9ayj.mongodb.net/?retryWrites=true&w=majority`

const connDB = () => {
  mongoose.connect(uri)
  const db = mongoose.connection

  db.once('open', () => {
    console.log('Mongoose :)')
  })
  db.on('err', () => {
    console.log('Mongoose :(')
  })
}

module.exports = connDB
