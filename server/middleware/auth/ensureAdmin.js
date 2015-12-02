module.exports = function ensureAdmin() {
  return function(req, res, next) {
    if (!req.user || req.user.admin !== true) {
      return res.status(401).json({error: "User not authorized"});
    }
    next();
  };
};