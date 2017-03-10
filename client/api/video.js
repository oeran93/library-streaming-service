const Video = require('../../database/video.js')
const path = require('path')

module.exports = function () {

  let pub = {}

  pub.show = function (req,res) {
    console.log(req.query.id)
    Video.findOne({obfuscated_itemID:req.query.id}, (err, video) => {
      if (err) console.log(err.message)
      if (!video) {
        res.render('not_found')
        return
      }
      res.render('video', {itemID: video.itemID, mediaID: video.mediaID})
    })
  }

  return pub

}