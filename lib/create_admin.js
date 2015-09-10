var bcrypt = require('bcryptjs');
var User = require('../models/user');

module.exports = function(user, pw, cb) {
  var hashed_pass = bcrypt.hashSync(pw, 8);
  return new User({ username: user, hashed_pass: hashed_pass, admin: true}).save();
}
