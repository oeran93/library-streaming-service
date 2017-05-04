let jwplayer = require('../api/jwplayer.js')

module.exports = function (app) {
  app.post('/videos/create', jwplayer.create_video)
  
}