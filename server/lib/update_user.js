var bcrypt = require('bcryptjs');
var User = require('../models/user');

exports.password = function(id, pw) {
  var hashed_pass = bcrypt.hashSync(pw, 8);
  return new User({id: id, hashed_pass: hashed_pass}).save();
}
