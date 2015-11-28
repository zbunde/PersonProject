var ensureLoggedIn = require('./ensureLoggedIn')();
var ensureAdmin = require('./ensureAdmin')();

module.exports = {
  ensureLoggedIn: ensureLoggedIn,
  ensureAdmin: ensureAdmin
};