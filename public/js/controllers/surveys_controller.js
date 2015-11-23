app.controller('SurveysController', ["$scope", "$state", "SurveysService", "SurveyItemsService", "ModalService", "$location", "SessionService",
  function ($scope, $state, SurveysService, SurveyItemsService, ModalService, $location, SessionService) {

  SurveysService.all().then(function (response) {
    $scope.surveys = SurveyItemsService.shuffle(response);
  })
  $scope.loggedInUser = SessionService;
  $scope.newSurvey = function () {
    $state.go('admin.new_survey');
  };
}]);
  
