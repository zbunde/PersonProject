app.controller('UserController', function ($scope, UsersService, $location, $cookies) {

  $scope.errors = false;

  $scope.signup = function() {
    UsersService.create($scope.newUser).then(function(response) {
      if (response.data.error) {
        $scope.errors = response.data.error;
        $scope.newUser = {};
        $location.path('/signup');
      } else {
        $cookies.put('session_id', response.data.id);
        $location.path('/users/' + response.data.id);
        $scope.loggedInUser = $cookies.get('session_id');
      }
    });
  }

  $scope.logout = function () {
    $scope.errors = "You have been logged out";
    $cookies.remove('session_id');
    $scope.loggedInUser = null;
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
})
