let jwplayer = require('../api/jwplayer.js')
//let video = require('../api/video.js')

module.exports = function (app) {
  app.post('/videos/create', jwplayer.create_video)
  //app.get('/videos/list', video.list)
}