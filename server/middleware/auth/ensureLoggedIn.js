module.exports = function ensureLoggedIn() {
  return function(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({error: "Username/password invalid"});
    }
    next();
  };
};