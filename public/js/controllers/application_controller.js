app.controller('ApplicationController', function ($scope, $location, $cookies, SessionService) {
    $scope.session = SessionService;
});
