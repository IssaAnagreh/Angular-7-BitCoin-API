const bcrypt = require('bcrypt-nodejs');
const db = require('../database/index');
const createSession = require('./auth').createSession;

const postLogin = function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  db.searchByEmail(email, function (err, item) {
    if (err) throw err;
    if (item[0]) {
      bcrypt.compare(password, item[0].password, function (err, found) {
        if (err) throw err;
        if (found) {
          createSession(req, res, item);
        } else {
          res.status(401).send('Wrong password or username!');
        }
      })
    } else {
      res.status(401).send('Wrong username or password')
    }
  })
}

const checkLogin = function (req, res) {
  if (req.body.token) {
    let token = req.body.token
    if (req.session.token == token) {
      res.send(JSON.stringify({message: 'OK'}));
    } else {
      res.send(JSON.stringify({message: 'Not Authorized'}));
    }
  } else {
    res.send(JSON.stringify({message: 'Not Authorized'}));
  }
}

const logout = function (req, res) {
  console.log('before logout: ', req.session.token)
  req.session.destroy(function (err) {
    if (err) throw err;
    res.status(200).send({message: 'logged out!'});
  })
}

module.exports.postLogin = postLogin;
module.exports.checkLogin = checkLogin;
module.exports.logout = logout;
