function ensureAdmin(req, res, next) {
  if (!req.user || req.user.admin !== true) {
    return res.status(401).json({error: "User not authorized"});
  }
  next();
}

module.exports = ensureAdmin;
