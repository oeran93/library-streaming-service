let video = require('../api/video.js')()

module.exports = function (app) {
  app.get('/video', video.show)
}