app.controller('AdminController', ["$scope", function ($scope) {

}]);

app.controller('ApplicationController', ["$scope", "$location", "$cookies", "SessionService", function ($scope, $location, $cookies, SessionService) {
    $scope.session = SessionService;
}]);

app.controller('ResultsController', ["$scope", "$stateParams", "SurveysService", "SurveyItemsService",
  function ($scope, $stateParams, SurveysService, SurveyItemsService) {
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
}]);

app.controller('SurveyController', ["$scope", "$stateParams", "$location", "$state", "ModalService", "SurveysService", "SurveyItemsService", "SessionService",
  function ($scope, $stateParams, $location, $state, ModalService, SurveysService, SurveyItemsService, SessionService) {

  if ($stateParams.survey_id) {
    SurveysService.find($stateParams.survey_id).then(function (response) {
      $scope.survey = response;
    })
  }

  $scope.showConsentModal = function(survey) {
    SurveysService.requestSurvey(survey);
    ModalService.showModal({
      templateUrl: "/partials/users/consent.html",
      controller: "SurveyController"
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
      });
    });
  }

  $scope.submitConsentForm = function () {
    var survey = SurveysService.survey;
    if($scope.consent && SessionService.currentUser){
      $location.path('/users/' + SessionService.currentUser + '/surveys/' + survey.id);
    } else if($scope.consent && !SessionService.currentUser) {
      $location.path('/users/00/surveys/' + survey.id );
    }
  }

  $scope.dismissModal = function(result) {
    close(result, 200);
    $location.path('/')
 };

  $scope.createSurvey = function () {
    SurveysService.create(vm.survey).then(function (response) {
      $state.go('admin.survey', {survey_id: response.id});
    })
  }

  var vm = this;
  vm.survey = {};

  vm.surveyFields = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Title',
        placeholder: 'Survey title',
        required: true
      }
    },
    {
      key: 'description',
      type: 'input',
      templateOptions: {
        type: 'textArea',
        label: 'Description',
        placeholder: 'Description',
        required: true
      }
    },
    {
      key: 'version',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Version',
        placeholder: 'Survey Version',
        required: true
      }
    },
    {
      key: 'estimated_time_to_complete',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Estimated Time to Complete',
        placeholder: 'Estimated Time to Complete',
        required: true
      }
    },
    {
      key: 'status',
      type: 'select',
      templateOptions: {
        label: 'Status',
        options: [
          {
            "name":"In Design",
            "value":"in_design",
          },
          {
            "name":"Published",
            "value":"published"
          },
          {
            "name":"Retired",
            "value":"retired"
          }
        ],
        required: true
      }
    }
  ];
}]);

app.controller('SurveyItemController', ["$scope",  "$state", "$location", "SurveyItemsService", "$stateParams",
  function ($scope, $state, $location, SurveyItemsService, $stateParams) {
  
  $scope.shuffle = SurveyItemsService.shuffle;
  $scope.submitted=false;
  $scope.submitAnyway = false;
  $scope.answers = [];
  $scope.totalQuestions;
  SurveyItemsService.find($stateParams.survey_id).then(function (response) {
    if(response.length > 1) {
      $scope.totalQuestions = response.length;
      $scope.surveyItems = SurveyItemsService.shuffle(response);
      $scope.freeForm = true;
      response.forEach(function (item) {
        if(item.depends_on){
          item.dependentIndex = SurveyItemsService.getDependent(response, item.depends_on.id);
        }
      })
    } else {
      $scope.totalQuestions = response[0].sub_questions.length;
      $scope.surveyOptions = response[0].options;
      $scope.subQuestions = SurveyItemsService.shuffle(response[0].sub_questions);
      $scope.table = true;
    }
  });

  $scope.submitSurvey = function () {
    if(SurveyItemsService.hasUnansweredQuestions($scope.answers, $scope.totalQuestions) && !$scope.submitAnyway){
      $scope.submitted = true;
      $scope.submitAnyway = true;
    } else {
      $scope.score = SurveyItemsService.getScore($scope.answers);
      var path = 'users/' + $stateParams.id + '/results/' + $scope.score
      $location.path(path);
    }
  };

}]);

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
  
app.controller('UsersController', ["$scope", "UsersService", "$location", "$cookies", "SessionService", "$stateParams", 
  function ($scope, UsersService, $location, $cookies, SessionService, $stateParams) {

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
}]);
