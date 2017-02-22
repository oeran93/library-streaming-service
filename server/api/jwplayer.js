const jwtools = require('../../tools/jwplayer/index.js')({api_key: 'TCZkoYFj', api_secret: 'qISqUKnbFiy6GwMuimuN3W8g'})

module.exports = {

	create_video: function (req, res) {
    jwtools.call_api({
      method: 'post',
      path: '/v1/videos/create',
    }, req.body.data)
    .then(({data}) => res.send(data))
    .catch(err => console.log(err))
  }
	
}