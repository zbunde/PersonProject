var ensureLoggedIn = require('./ensureLoggedIn');
var ensureAdmin = require('./ensureAdmin');
var ensurePasswordWithCredentials = require('./ensurePasswordWithCredentials');

module.exports = {
  ensureLoggedIn: ensureLoggedIn,
  ensureAdmin: ensureAdmin,
  ensurePasswordWithCredentials: ensurePasswordWithCredentials
};
