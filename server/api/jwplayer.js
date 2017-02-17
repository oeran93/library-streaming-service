const http = require('http')
const api_key = 'TCZkoYFj'
const api_secret = 'qISqUKnbFiy6GwMuimuN3W8g'
const api_timestamp = Math.floor(Date.now()/1000)
const jwtools = require('../../tools/jwplayer.js')
const api_nonce = jwtools.api_nonce()


module.exports = {

	create_video: function (req, res) {
    http.request(
      {
      host: 'https://api.jwplatform',
      path: '/v1/videos/create?'+
      method: 'POST',
      data: {
        api_key,
        api_timestamp,
        api_nonce,
        api_signature: jwtools.api_signature(req.body, 'json', api_key, api_secret, api_nonce, api_timestamp)
      },
      (data) => {
        res.send(data)
      }
    )
  }
	
}

http://api.jwplatform.com/v1/videos/list?text=d%C3%A9mo&api_nonce=80684843&
   api_timestamp=1237387851&api_format=xml&
   api_signature=fbdee51a45980f9876834dc5ee1ec5e93f67cb89&api_key=XOqEAfxj