let env = process.env
let video = require('../api/video.js')(env.VIDEO_UPLOAD_DIR || './')

module.exports = function (app) {
  app.get('/default', is_logged_in, (req,res) => res.render('default'))
  app.post('/videos/upload',is_logged_in, video.create)
  app.get('/videos/upload', is_logged_in, video.upload)
  app.get('/videos/list', is_logged_in, video.list)
  app.post('/videos/delete_local', is_logged_in, video.delete)
  app.get('/logout', (req,res) => {req.session.user = null; res.redirect('/login')})
}


function is_logged_in(req, res, next) {
  if (req.session.user) next()
  else res.redirect('/login')
}
