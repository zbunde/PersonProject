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

app.factory('UsersService', function($http) {
  return {
    create: function(attrs) {
      return $http.post('/api/signup', attrs).then(function(response) {
      })
    }
  }
})
