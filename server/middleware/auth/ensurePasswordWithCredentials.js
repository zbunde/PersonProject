var validate = require("../../lib/user_validation");
var User = require("../../models/user");

function ensurePasswordWithCredentials(req, res, next) {
  if (!req.isAuthenticated() ||
      !req.user ||
      !req.body.password) { 
    return res.status(401).json({error: "Username/password invalid"});
  }

  new User({id: req.user.id}).fetch().then(function(user) {
    if (!validate.checkPassword(req.body.password, user.attributes)) {
      return res.status(401).json({error: "Username/password invalid"});
    }
    next();
  }).catch(function() {
    return res.status(401).json({error: "Username/password invalid"});
  });
}

module.exports = ensurePasswordWithCredentials;
