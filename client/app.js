const express     = require('express')
const app         = express()
const video_router = require('./routing/video.js')
var exphbs  = require('express-handlebars')

module.exports = function (db) {
  db()
  app.engine('.hbs', exphbs({
    extname:'.hbs',
    defaultLayout:'layout.hbs',
    layoutsDir: __dirname+ '/views'
  }))
  app.set('view engine', '.hbs')
  app.set('views', __dirname+ '/views')
  app.use(express.static(__dirname + '/views'))
  video_router(app)

  return app

}
