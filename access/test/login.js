const db        = require('../../database/start.js')
const app       = require('../../inventory/app.js')(db)
const supertest = require('supertest')
const should = require('should')

describe('ldap authentication', () => {

  it('should be able to authenticate', done => {
    supertest(app)
    .post('/login')
    .send()
    .end((err, res) => {
      if (err) {
        console.log("err: ", err)
        done()
      }
      else {
        console.log("success")
        done()
      }
    })
  })

})
