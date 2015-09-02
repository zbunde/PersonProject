app.controller('UsersController', function ($scope, $cookies, UsersService) {
  $scope.loggedInUser = $cookies.get('session_id');
  UsersService.all().then(function (users) {
    $scope.users = users;
  })
})
