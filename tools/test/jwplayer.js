const jwplayer = require('../jwplayer.js')()
const should = require('should')

describe('jwplayer api', function () {

  it('should return an object with all param to create url', done => {
    res = jwplayer.get_query({a: 'test', b:'test2'})
    res.should.have.property('api_format')
    res.should.have.property('api_key')
    res.should.have.property('api_nonce')
    res.should.have.property('api_timestamp')
    res.should.have.property('a')
    res.should.have.property('b')
    done()
  })

  it('should return the complete working url', done => {
    /http:\/\/api\.jwplatform\.com\/v1\/videos\/create\/\?api_format=json&api_key=.+&api_nonce=[0-9]{8}&api_timestamp=[0-9]+&title=.+&api_signature=.+/
    .test(jwplayer.get_api_call('/v1/videos/create/',{title: "this title"}))
    .should.be.true()
    done()
  })

})