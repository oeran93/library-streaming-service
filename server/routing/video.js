let video = require('../api/video.js')('./')

module.exports = function (app) {
  app.post('/videos/upload', video.upload)
}