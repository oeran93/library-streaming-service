const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const Video = require('../../database/video.js')

module.exports = function (upload_path) {

  let pub = {}

  pub.create = function (req, res) {
    var form = new formidable.IncomingForm()
    form.multiples = true
    form.uploadDir = (upload_path)
    form.on('file', (field, file) => {
      fs.rename(file.path, path.join(form.uploadDir, file.name))
    })
    form.on('error', (err) => {
      console.log(err.message)
    })
    form.on('end', function () {
      res.end('success')
    })
    form.parse(req)
  }

  pub.list = function (req, res) {
    Video.find({}, (err, videos) =>{
      if (err) res.status(500)
      else res.render('list_videos', {videos})
    })
  }

  pub.upload = function (req, res) {
    res.render('new_video')
  }

  return pub

}
