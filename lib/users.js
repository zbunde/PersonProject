var User = require('../models/user');


module.exports = {
  getUsers: function (cb) {
    return User.fetchAll().then(function (users) {
      cb(users.models);
    })
  },
  getUser: function(user_id, cb) {
    new User({ id: user_id })
      .fetch().then(function (user) {
        if(user){
          cb(user);
        }
      });
  }
}
