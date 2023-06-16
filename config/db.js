const mongoose = require('mongoose')

const uri = 'mongodb+srv://arisda:qeYLGTMkaWWvOreD@retail-tubes.e6k9ayj.mongodb.net/?retryWrites=true&w=majority'

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
