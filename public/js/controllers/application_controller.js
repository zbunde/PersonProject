app.controller('ApplicationController', ["$scope", "$location", "$cookies", "SessionService", function ($scope, $location, $cookies, SessionService) {
    $scope.session = SessionService;
}]);
