var User = require('../models/user');
var bcrypt = require('bcryptjs');

module.exports = {
  errors: function(user) {
    var errors = [];
    if(!user.username.trim()){
      errors.push("Username cannot be blank");
    }
    if(!user.password.trim()){
      errors.push("Password cannot be blank");
    }
    if(!(user.password === user.password_confirmation)){
      errors.push("Passwords do not match");
    }
    return errors;
  },
  userExists: function (username, cb) {
    new User({ username: username })
      .fetch().then(function (model) {
        if(model){
          cb(model);
        } else {
          cb(model);
        }
      });
  },
  checkPassword: function (input, record) {
    return bcrypt.compareSync(input.password, record.attributes.hashed_pass)
  }
}
