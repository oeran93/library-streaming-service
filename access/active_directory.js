 const config = {
  url: 'ldap://lib-lswv125.wulib.wustl.edu',
  baseDN:'dc=wulib, dc=wustl, dc=edu',
  username: 'ldap',
  password: process.env.LDAP_PASSWORD
}
const ad = require('activedirectory')(config)
const domain = "@wulib.wustl.edu"

module.exports = function (group) {

  let pub = {}

  pub.login =  function (req, res) {
    ad.authenticate(req.body.name + domain, req.body.password, (err, auth) => {
      if (err) res.send({error: true})
      else {
        ad.isUserMemberOf(req.body.name + domain, group, (err, isMember) => {
          if (err) res.send({error: true})
          else {
            if (req.session && isMember){
              req.session.user = req.body.name
              res.send({error: false})
            }else {
              res.send({error: true})
            }
          }
        })
      }
    })
  }

  pub.login_page = function (req, res) {
    res.render('login')
  }

  return pub

}
