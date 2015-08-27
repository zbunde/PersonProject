var app = angular.module('person-project', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: "/partials/about.html",
    controller: "ApplicationController"
  })
  .when('/signup', {
    templateUrl: "/partials/signup.html",
    controller: "SignupController"
  })
  .when('/users/:id', {
    templateUrl: "/partials/user.html",
    controller: "UsersController"
  })
  .when('/users', {
    templateUrl: "/partials/users.html",
    controller: "UsersController"
  }).otherwise({
        templateUrl: "/partials/about.html"
      })

  $locationProvider.html5Mode(true);
})

app.controller('ApplicationController', function ($scope, $location) {
  
});

app.controller('SignupController', function ($scope, $location, $cookies, UsersService) {
  $scope.errors = false;
  $scope.createUser = function() {
    UsersService.create($scope.newUser).then(function(response) {
      if (response.data.error) {
        $scope.errors = "Username already exists";
        $location.path('/signup');
      } else {
        $cookies.put('user_id', response.data.id);
        $location.path('/users/' + response.data.id);
      }
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
      return $http.post('/api/signup', attrs);
    },
    all: function () {
      return $http.get('/api/users').then(function (response) {
        users = response.data
        return users;
      })
    },
    signin: function () {
      return $http.get('/api/signin');
    }
  }
})
