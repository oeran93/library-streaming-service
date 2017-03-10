const jwtools = require('../../tools/jwplayer/index.js')({api_key: 'TCZkoYFj', api_secret: 'qISqUKnbFiy6GwMuimuN3W8g'})
const external_db = require('../../database/external_db.js')()
const Video = require('../../database/video.js')
const _ = require('underscore')
const sha1 = require('sha1')

module.exports = {

	create_video: function (req, res) {
    external_db.get_movie(req.body.id)
    .then(records => {
      let info = _.pick(records[0], 'Title', 'Description', 'Author', 'PubDate')
      jwtools.call_api({
        method: 'post',
        path: '/v1/videos/create'
      },{
        title: info.Title,
        description: info.Description || 'No description',
        author: info.Author,
        date: info.PubDate,
        sourcetype: 'url',
        sourceformat: 'mp4',
        sourceurl: `rtmp://128.252.67.12:1935/reserves/${req.body.id}.mp4`
      })
      .then(data => {
        Video.create({itemID: req.body.id, mediaID: data.data.video.key, obfuscated_itemID: sha1(req.body.id)}, (err) => {
          if (err) res.sendCode(500)
          res.sendCode(200)
        })
      })
      .catch(err => console.log(err.message))
    })
    .catch(err => console.log(err.message))
  }
	
}