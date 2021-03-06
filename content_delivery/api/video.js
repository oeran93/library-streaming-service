const Video = require('../../database/video.js')
const path = require('path')

module.exports = function () {

  let pub = {}

  pub.show = function (req,res) {
    Video.findOne({obfuscated_itemID:req.query.id}, (err, video) => {
      if (err) console.log(err.message)
      if (!video) {
        res.redirect('/not_found')
        return
      }
      res.render('video', {itemID: video.itemID, mediaID: video.mediaID, title: video.title, course: video.course_name, instructor: video.instructor})
    })
  }

  return pub

}
