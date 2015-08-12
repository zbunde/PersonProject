var User = require('../models/user');


module.exports = function (cb) {
  return User.fetchAll().then(function (users) {
    cb(users.models);
  })
}
