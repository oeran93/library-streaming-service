let jwplayer = require('../api/jwplayer.js')

module.exports = function (app) {
  app.post('/video/create', jwplayer.create_video)
}