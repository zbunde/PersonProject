app.controller('SignupController', function ($scope, $location, $cookies, UsersService) {
  $scope.errors = false;
  $scope.createUser = function() {
    UsersService.create($scope.newUser).then(function(response) {
      if (response.data.error) {
        $scope.errors = response.data.error;
        $scope.newUser = {};
        $location.path('/signup');
      } else {
        $cookies.put('session_id', response.data.id);
        $scope.loggedInUser = $cookies.get('session_id');
        $location.path('/users/' + response.data.id);
      }
    });
  }
})
