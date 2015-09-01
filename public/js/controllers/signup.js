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
