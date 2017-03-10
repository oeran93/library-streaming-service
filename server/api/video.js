const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

module.exports = function (upload_path) {

  let pub = {}

  pub.upload = function (req, res) {
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

  return pub

}