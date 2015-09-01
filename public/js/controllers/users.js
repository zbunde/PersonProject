app.controller('UsersController', function ($scope, UsersService) {
  UsersService.all().then(function (users) {
    $scope.users = users;
  })
})
