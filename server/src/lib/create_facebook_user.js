var bcrypt = require('bcryptjs');
var User = require('../models/user');
var uuid = require('node-uuid');

module.exports = function(facebook_id, facebook_token, facebook_user_info) {
  var username = uuid.v1();
  var password = uuid.v1();
  var hashed_pass = bcrypt.hashSync(password, 8);
  return new User({ username: username,
                    hashed_pass: hashed_pass,
                    facebook_id: facebook_id,
                    facebook_user_info: facebook_user_info}).save();
};
