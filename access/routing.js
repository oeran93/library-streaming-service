const AD = require('./active_directory.js')()

module.exports = function (app) {
  app.post('/login', AD.login)
  app.get('/login', is_logged_in, AD.login_page)
}

function is_logged_in(req, res, next) {
  if (req.session.user) res.redirect('/default')
  else next()
}
