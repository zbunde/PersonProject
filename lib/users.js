var User = require('../models/user');


module.exports = {
  getUsers: function () {
    return User.fetchAll()
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
