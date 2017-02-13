const express     = require('express')
const app         = express()
const body_parser = require('body-parser')

module.exports = function (db) {
  //start DB
  db()
  //set up express
  app.use(body_parser.json())
  app.use(body_parser.urlencoded({extended: true}))
  app.use(express.static(__dirname + '/views'))
  return app
}