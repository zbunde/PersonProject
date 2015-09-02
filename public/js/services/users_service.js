app.factory('UsersService', function($http) {
  var users;
  return {
    create: function(attrs) {
      return $http.post('/api/signup', attrs);
    },
    all: function () {
      return $http.get('/api/users').then(function (response) {
        users = response.data
        return users;
      })
    },
    signin: function (user) {
      return $http.post('/api/signin', user ).then(function (response) {
        return response.data;
      });
    }
  }
})
