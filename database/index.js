const mongoose = require('mongoose');
mongoose.connect('mongodb://qusay:qusay123@ds341605.mlab.com:41605/news');


const db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

const user = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  info: String,
  token: String,
  createdAt: Date
  //client: [{ type: mongoose.Schema.Types.ObjectId, ref: 'client' }]
});

const User = mongoose.model('user', user);

// select all users
const selectAll = function (callback) {
  User.find({}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

// select all Users with the same name
const selectAllNames = function (name, callback) {
  User.find({ name: name }, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

// select all Users with the same name
const searchByEmail = function (email, callback) {
  User.find({ email: email }, function (err, item) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, item);
    }
  });
};

// select all Users with the same name
const searchByField = function (field, fieldData, callback) {
  User.find({ [field]: fieldData }, function (err, item) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, item);
    }
  });
};

// update profile fields
const updateField = function (field, fieldData, updatingData, callback) {
  User.updateMany({ [field]: fieldData }, { $set: updatingData }, function (err, done) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, done);
    }
  })
}

const deleteUser = function (email, callback) {
  User.deleteOne({ email: email }, function (err, done) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, done);
    }
  })
}

module.exports.User = User;
module.exports.selectAll = selectAll;
module.exports.selectAllNames = selectAllNames;
module.exports.searchByEmail = searchByEmail;
module.exports.searchByField = searchByField;
module.exports.updateField = updateField;
module.exports.deleteUser = deleteUser;
