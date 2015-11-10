app.controller('UsersController', function ($scope, UsersService, $location, $cookies, SessionService, $stateParams) {
  $scope.loggedInUser = SessionService;
  UsersService.all().then(function (users) {
    $scope.users = users;
  })

  $scope.user = $stateParams.user_id
  $scope.signup = function() {
    UsersService.create($scope.newUser).then(function(response) {
      if (response.error) {
        $scope.errors = response.error;
        $scope.newUser = {};
        $location.path('/signup');
      } else {
        SessionService.set(response.id);
        $location.path('/users/' + response.id + '/surveys');
      }
    });
  }

  $scope.logout = function () {
    $cookies.remove('session_id');
    SessionService.currentUser = null;
    $location.path("/");
  }

  $scope.signin = function () {
    UsersService.signin($scope.session).then(function (response) {
      if(response.error){
        $scope.session.password = "";
        $scope.errors = response.error;
      } else {
        SessionService.set(response.id);
        $scope.session = {};
        if(response.admin){
          SessionService.admin = true;
          $location.path('/admin/' + response.id + '/surveys');
        } else {
          $location.path('/users/' + response.id + '/surveys');
        }
      }
    });
  }

  $scope.newAdmin = function () {
    UsersService.createAdmin($scope.admin).then(function (response) {
      if(response.error){
        $scope.admin = {};
        $scope.errors = response.error;
      } else {
        $scope.admin = {};
        $location.path('/')
      }
    })
  },

  $scope.show = function(user) {
    var admin_id = $stateParams.id;
    UsersService.find(user).then(function(response) {
      $location.path('admin/' + admin_id + '/users/' + response.data.id)
    })
  },

  $scope.delete = function (user) {
    var admin_id = $stateParams.id
    var success_url = 'admin/' + admin_id + '/users'
    var fail_url = 'admin/' + admin_id + '/users/' + $stateParams.user_id
    UsersService.destroy(user).then(function (response) {
      return response ? $location.path(success_url) : $location.path(fail_url)
    })
  }
})
