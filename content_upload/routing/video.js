let video = require('../api/video.js')('./')

module.exports = function (app) {
  app.post('/videos/upload', video.create)
  app.get('/videos/upload', video.upload)
  app.get('/videos/list', video.list)
  app.post('/videos/delete_local', video.delete)
}
