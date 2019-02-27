const bcrypt = require('bcrypt-nodejs');
const db = require('../database/index');
const createSession = require('./auth').createSession;
const user = db.User;

const addUser = function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password);
  let info = req.body.info;
  let createdAt = new Date();
  let token = bcrypt.hashSync(req.body.email).replace(/[/]/g, '');
  db.searchByEmail(email, function (err, item) {
    if (err) throw err
    if (item[0]) {
      res.status(403).send('User is already existed')
    } else {
      let newUser = new user({ name: name, email: email, password: password, info: info, token: token, createdAt: createdAt });
      newUser.save().then(() => {
        createSession(req, res, [{email: email, token: token}])
      }).catch(err => console.log('sign up server error', err))
    }
  })
}

const editUser = function (req, res) {
  let name = req.body.name;
  let password = bcrypt.hashSync(req.body.password);
  let info = req.body.info;
  db.updateField('token', req.session.token, {
    name: name || item[0].name,
    password: password || item[0].password,
    info: info || item[0].info,
  }, function (err, done) {
    if (err) throw err
    if (done) {
      res.status(200).send({message: 'User is edited successfully!'})
    }
  })
}

const deleteUser = function (req, res) {
  db.searchByField('token', req.session.token, function (err, item) {
    if (err) throw err;
    if (item[0]) {
      db.deleteUser(item[0].email, function (err, done) {
        if (err) throw err;
        if (done) {
          res.status(200).send({message: 'Account is removed'})
        }
      })
    } else {
      res.statusStatus(500)
    }
  })
}

const getUser = function (req, res) {
  db.searchByField('token', req.params.token, function (err, item) {
    if (err) throw err;
    if (item[0]) {
      res.status(200).send({name: item[0].name, info: item[0].info, createdAt: item[0].createdAt});
    } else {
      res.sendStatus(404);
    }
  })
}

module.exports.addUser = addUser;
module.exports.editUser = editUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
