const express     = require('express')
const app         = express()
const body_parser = require('body-parser')
const jwplayer_router = require('./routing/jwplayer.js')
const video_router = require('./routing/video.js')
const access_router = require('../access/routing.js')
const session     = require('client-sessions')
var exphbs  = require('express-handlebars')

module.exports = function (db) {
  db()
  app.use(body_parser.json())
  app.use(body_parser.urlencoded({extended: true}))
  app.engine('.hbs', exphbs({
    extname:'.hbs',
    defaultLayout:'layout.hbs',
    layoutsDir: __dirname+ '/views'
  }))
  app.use(session(
    {
      cookieName: 'session',
      secret: "wdssdfsafasdfsdf",
      duration: 60 * 1000,
      activeDuration: 60 * 1000
    }
  ))
  app.set('view engine', '.hbs')
  app.set('views', __dirname+ '/views')
  app.use(express.static(__dirname + '/views'))
  jwplayer_router(app)
  video_router(app)
  access_router(app)
  app.use((req,res) => {res.redirect('/login')})
  return app
}
