/* eslint-disable no-console */
const _ = require('lodash')
const path = require('path')
const minimist = require('minimist')
const express = require('express')
const morgan = require('morgan')

const fruits = require('./fruits')
const app = express()

// get port from passed in args from scripts/start.js
const port = minimist(process.argv.slice(2)).port

app.use(morgan('dev'))
app.use(express.static('.'))
app.use('/node_modules', express.static(path.join(__dirname, '..', '..', 'node_modules')))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})



app.get('/favorite-fruits-jsonp', (req, res) => {
  // we expect the query to have the function name "fruitsCallback"
  // we need to call when the result gets back into the browser
  console.log(req.query)

  // return random 4 fruits for JSONP requests
  const selectedFruits = _.sampleSize(fruits, 4)
  const selectedFruitsJS = JSON.stringify(selectedFruits)

  res.header('Content-Type', 'application/javascript')
  res.header('Charset', 'utf-8')
  res.send(`${req.query.fruitsCallback}(${selectedFruitsJS})`)
})

app.get('/favorite-fruits', (req, res) => {
  res.json(_.sampleSize(fruits, 2))
})



app.listen(port)
