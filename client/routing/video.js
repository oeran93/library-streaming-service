let Video = require('../api/video.js')()

module.exports = function (app) {
  app.get('/video*', Video.show)
}
