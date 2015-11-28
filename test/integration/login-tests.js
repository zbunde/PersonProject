'use strict';

describe('Person Project', function() {
  describe('login', function() {
    it('should show sign up on main page', function() {
      browser.get('/');
      var el = element(by.id('signuplink'));
      el.getText().then(function(text) {
        expect(text).toBe("Signup");
      });
    });

    it('should have email and password form', function() {
      browser.get('/');
      var emailInput = element(by.id('email'));
      var passwordInput = element(by.id('password'));

      expect(emailInput.isPresent()).toBeTruthy();
      expect(passwordInput.isPresent()).toBeTruthy();
    })
  });
});
