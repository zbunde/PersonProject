app.controller('ResultsController', function ($scope, $stateParams, SurveysService,
SurveyItemsService) {
  $scope.score = $stateParams.score;
  $scope.answers = [];

  if($stateParams.id !== "00"){
    $scope.demographicsComplete = true;
  }

  SurveysService.find(45).then(function (response) {
    $scope.survey = response;
  })

  SurveyItemsService.find(45).then(function (response) {
    $scope.surveyItems = response;
  })

  $scope.submitSurvey = function () {
    $scope.demographicsComplete = true;
  }
})
