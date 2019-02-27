const db = require('../database/index');

const createSession = function (req, res, item) {
    if (item[0]) {
      req.session.token = item[0].token;
      req.session.email = item[0].email;
      res.status(200).send({token: item[0].token});
    } else {
      res.status(401).send({message: 'This is not a valid user'})
    }
}

const checkSession = function (req, res, next) {
  // db.searchByField(token, req.session.token, function (err, item) {
  //   if (err) throw err;
  //   if (item[0]) {
  //     res.next();
  //   }
  // })
  if (!!req.session.token) {
    next();
  } else {
    res.status(401).redirect('login')
  }
}

module.exports.createSession = createSession;
module.exports.checkSession = checkSession;
