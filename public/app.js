var app = angular.module('person-project', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: "/partials/about.html",
    controller: "ApplicationController"
  })
  .when('/signup', {
    templateUrl: "/partials/signup.html",
    controller: "SignupController"
  })
  .when('/users', {
    templateUrl: "/partials/users.html",
    controller: "UsersController"
  }).otherwise({
        templateUrl: "/partials/about.html"
      })
})

app.controller('ApplicationController', function ($scope, $location) {
  $scope.setBackground = function () {
    return '/' == $location.path() || '/signup' == $location.path();
  }
});

app.controller('SignupController', function ($scope, UsersService) {
  $scope.createUser = function() {
    UsersService.create($scope.newUser).then(function(response) {
    });
  }
})

app.controller('UsersController', function ($scope, UsersService) {
  UsersService.all().then(function (users) {
    $scope.users = users;
  })
})

app.factory('UsersService', function($http) {
  var users;
  return {
    create: function(attrs) {
      return $http.post('/api/signup', attrs).then(function(response) {
      })
    },
    all: function () {
      return $http.get('/api/users').then(function (response) {
        users = response.data
        return users;
      })
    }
  }
})
