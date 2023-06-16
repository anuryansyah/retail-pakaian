const express = require('express')
const bodyParser = require('body-parser')
// IMPORT DB
const connDB = require('./config/db')
// IMPORT ROUTE
const typesRoute = require('./routes/TypesRoute')

// PORT
const port = 3000
const app = express()

// KONEKSI DB
connDB()


app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to retail app',
  })
})

app.use(typesRoute)

app.listen(port, () => {
  console.log('server running on port: ' + port)
})
