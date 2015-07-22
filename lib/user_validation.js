module.exports = function(user) {
  return user.username === "user@example.com" && user.password === "password1234";
}
