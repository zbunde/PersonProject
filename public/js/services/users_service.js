app.factory('UsersService', function($http, $cookies) {
  var users;
  return {
    create: function(attrs) {
      return $http.post('https://person-project.herokuapp.com/api/v1/users/signup', attrs).then(function (response) {
        return response.data;
      });
    },
    all: function () {
      return $http.get('https://person-project.herokuapp.com/api/v1/users').then(function (response) {
       return response.data
      })
    },
    signin: function (user) {
      return $http.post('https://person-project.herokuapp.com/api/v1/users/signin', user ).then(function (response) {
        return response.data;
      });
    },
    createAdmin: function (admin) {
      return $http.post('https://person-project.herokuapp.com/api/v1/users', admin).then(function (response) {
        return response.data;
      });
    },
    find: function(user){
      return $http.get('https://person-project.herokuapp.com/api/v1/users/' + user.id).then(function (response) {
        return response
      })
    },

    destroy: function (user) {
      return $http.delete('https://person-project.herokuapp.com/api/v1/users/' + user).then(function (response) {
        return response.status === 200 ? true : false;
      })
    }
  }
})
