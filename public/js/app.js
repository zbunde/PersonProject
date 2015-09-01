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
