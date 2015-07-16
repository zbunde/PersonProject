var request = require("request");
var base_url = "http://localhost:3000/users/signup"

describe("Users", function() {
  describe("User Authentication", function() {
    it("a can visit the signup page", function(done) {
      request.get(base_url, function(err, response, body) {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual("Signup")
        done();
      });
    });
  })
});
