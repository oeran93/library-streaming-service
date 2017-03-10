const express     = require('express')
const app         = express()
const body_parser = require('body-parser')
const jwplayer_router = require('./routing/jwplayer.js')
const video_router = require('./routing/video.js')

module.exports = function (db) {
  db()
  app.use(body_parser.json())
  app.use(body_parser.urlencoded({extended: true}))
  app.use(express.static(__dirname + '/views'))
  jwplayer_router(app)
  video_router(app)

  return app

}