const db        = require('../../../database/start.js')
const app       = require('../../app.js')(db)
const supertest = require('supertest')
const should = require('should')

describe('jwplayer logic', () => {

  it('should create a video', done => {
    supertest(app)
    .post('/videos/create')
    .send({
      id: "151311"
    })
    .end((err, res) => {
      if (err) {
        console.log("err: ", err)
        done()
      }
      else {
        console.log(res.body)
        done()
      }
    })
  })

})
