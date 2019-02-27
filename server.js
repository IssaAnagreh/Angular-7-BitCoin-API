const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); //requires npm install
const session = require('express-session'); //requires npm install
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const request = require('request'); //requires npm install
// const partial = require('express-partial'); //requires npm install

// from server folder
const user = require('./server/user')
const auth = require('./server/auth')
const registration = require('./server/registration')

//from Database
const db = require('./database');
let userModel = db.User;

//use express
const app = express();

//app.use(partial());

// body parser
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

//cookies and session
app.use(cookieParser('shhhh, very secret'));
app.use(session({
  cookie: { secure: false, maxAge: 60000 },
  secret: 'shhh, it\'s a secret',
  resave: true,
  saveUninitialized: true
}));

// user
app.post('/user/signup', user.addUser);
app.delete('/user/delete', auth.checkSession, user.deleteUser);

// registration
app.post('/user/login', registration.postLogin);
app.post('/user/login/check', registration.checkLogin);
app.get('/user/logout', registration.logout);

//
app.get('/profile/:token', auth.checkSession, user.getUser);
app.put('/profile/edit', auth.checkSession, user.editUser);


// connect to angular
app.use(express.static(__dirname + '/dist/my-app'));


// to not get 404 error when reload page( redirect to index.html when reload )
app.get('/*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './dist/my-app/index.html'));
});

// listen to local host
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening to port 3000!');
});
