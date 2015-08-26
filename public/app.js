var app = angular.module('person-project', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: "/partials/about.html",
    controller: "MainController"
  }).otherwise({
        templateUrl: '/partials/about.html'
      })
})

app.controller('MainController', function ($scope, $location) {
  $scope.setBackground = function () {
    return '/' == $location.path();
  }
});
