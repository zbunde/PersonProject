app.controller('ApplicationController', function ($scope, $location, $cookies, UsersService) {
  $scope.loggedInUser = $cookies.get('session_id');

  $scope.logout = function () {
    $scope.errors = "You have been logged out"
    $scope.loggedInUser = $cookies.remove('session_id');
    $location.path("/");
  }

  $scope.signin = function () {
    UsersService.signin($scope.user).then(function (response) {
      if(response.error){
        $scope.user.password = "";
        $scope.errors = response.error;
      } else {
        $cookies.put('session_id', response.id);
        $scope.user = {};
        $location.path('/users/' + response.id);
        $scope.loggedInUser = $cookies.get('session_id');
      }
    });
  }
});
