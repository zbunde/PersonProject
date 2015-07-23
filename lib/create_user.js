var bcrypt = require('bcryptjs');
var User = require('../models/user');
var validateUser = require('../lib/user_validation');

module.exports = function(user, cb) {
  var hashed_pass = bcrypt.hashSync(user.password, 8);
  new User({ username: user.username, hashed_pass: hashed_pass}).save()
    .then(function(data) {
      cb(data);
    });
}
