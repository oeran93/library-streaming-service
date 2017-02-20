const http = require('http')
const jwtools = require('../../tools/jwplayer.js')()
const axios = require('axios')

module.exports = {

	create_video: function (req, res) {
    axios({
      method: 'post',
      url: jwtools.get_api_call('/v1/videos/create', {title: 'a random title', download_url: 'https://mysite.net/videos/myVideo.mp4'})
    })
    .then(({data}) => res.send(data))
    .catch(err => console.log(err))
  }
	
}