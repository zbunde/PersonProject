function ensureLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({error: "Username/password invalid"});
  }
  next();
}

module.exports = ensureLoggedIn;
