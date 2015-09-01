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
