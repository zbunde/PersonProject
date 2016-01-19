/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('AdminController', ["$scope", function ($scope) {
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('SurveyController', ["$rootScope", "$scope", "$stateParams", "$location", "$state", "ModalService", "SurveysService", "SurveyItemsService", "LocalAuthService",
  function ($rootScope, $scope, $stateParams, $location, $state, ModalService, SurveysService, SurveyItemsService, LocalAuthService) {

  if ($stateParams.survey_id) {
    SurveysService.find($stateParams.survey_id).then(function (response) {
      $rootScope.survey = $scope.survey = response;
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
    if($scope.consent){
      $location.path('/users/surveys/' + survey.id);
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

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('ResultsController', ["$scope",  "$state", "LocalAuthService", "UsersService", function($scope, $state, LocalAuthService, UsersService){
  $scope.signup = function(){
    $state.go('signup');
  };

  $scope.isAnon = !LocalAuthService.isAuthenticated();
  UsersService.result().then(function(result){
    $scope.result = result;
  });
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('SurveyItemController', ["$rootScope", "$scope",  "$state", "$location", "SurveyItemsService", "$stateParams", "LocalAuthService",
  function ($rootScope, $scope, $state, $location, SurveyItemsService, $stateParams, LocalAuthService) {

  $scope.$watch('answers', function(obj){
    if(!obj) return;

    Object.keys(obj).forEach(function(key){
      $scope.survey.groups.forEach(function(group){
        if(group.dependent_id === key){
          group.show = group.dependent_value === obj[key];
        }
      });
    });

  }, true);

  $rootScope.$watch('survey', function(){
    if(!$rootScope.survey) return;

    SurveyItemsService.find($rootScope.survey.id).then(function(response){
      $scope.recordedTime = 0;

      setInterval(function(){
        $scope.recordedTime += 1;
      }, 1000);

      $scope.keys = Object.keys;
      $scope.answers = {};
      $scope.survey = response;
    });
  });

  $scope.submitSurvey = function(){
    SurveyItemsService.submitSurvey({recordedTime: $scope.recordedTime, survey: $scope.survey, answers: $scope.answers, userToken: LocalAuthService.getToken()}).then(function(){

      if($scope.survey.name !== "Demographics" && $scope.survey.name !== "Feedback"){
        $state.go('user.survey', {survey_id: 'Feedback'});
      }else if($scope.survey.name === "Feedback" && !LocalAuthService.completedDemographics()){
        $state.go('user.survey', {survey_id: 'Demographics'});
      }else if($scope.survey.name === "Demographics" && LocalAuthService.isAuthenticated()){
        LocalAuthService.setCompletedDemographics();
        $state.go('user.results');
      }else{
        $state.go('user.results');
      }
    });
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('SurveysController', ["$scope", "$state", "SurveysService", "SurveyItemsService", "ModalService", "$location", "LocalAuthService",
  function ($scope, $state, SurveysService, SurveyItemsService, ModalService, $location, LocalAuthService) {

  var surveyPromise;

  if ($state.current.name === "surveys") {
    surveyPromise = SurveysService.all();
  } else {
    surveyPromise = SurveysService.featured();
  }
  surveyPromise.then(function (response) {
    $scope.surveys = SurveyItemsService.shuffle(response);
  });

  $scope.userId = function() {
    return LocalAuthService.userId();
  }

  $scope.newSurvey = function () {
    $state.go('admin.new_survey');
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('AdminSelectSurveysController', ["$scope", "$state", "AdminService",  "$location", "LocalAuthService",
  function ($scope, $state, AdminService, $location, LocalAuthService) {

  $scope.view = {selected: []};

  AdminService.surveys.all().then(function (response) {
    $scope.view.surveys = response.surveys;
  });

  $scope.toggleSurvey = function(id) {
    var index = $scope.view.selected.indexOf(id);
    if (index >= 0) {
      $scope.view.selected.splice(index, 1);
    } else {
      $scope.view.selected.push(id);
    }
  };

  $scope.selectSurveys = function() {
    var url = '/admin/surveys/download';
    $location.path(url).search("id", $scope.view.selected);
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */


app.controller('AdminSelectSurveyItemsController', ["$scope", "$state", "AdminService",  "$location", "LocalAuthService",
  function ($scope, $state, AdminService, $location, LocalAuthService) {

  $scope.view = {selected: {}};
  $scope.view.options = [{value: "first", display: "Include first result for users"},
                         {value: "last", display: "Include last result for user"},
                        ];
  if ($location.search().id && $location.search().id.length === 1) {
    $scope.view.options.unshift({value: "all", display: "Include all user results"});
  }
  $scope.view.include = "";
  AdminService.surveys.items($location.search().id).then(function(data) {
    $scope.view.surveys = data.surveys;
  });

  $scope.selectSurveyQuestion = function(surveyId, questionId) {
    if ($scope.view.selected[surveyId] !== undefined) {
      var index = $scope.view.selected[surveyId].indexOf(questionId);
      if (index >= 0) {
        $scope.view.selected[surveyId].splice(index, 1);
        if ($scope.view.selected[surveyId].length === 0) {
          delete $scope.view.selected[surveyId];
        }
      } else {
        $scope.view.selected[surveyId].push(questionId);
      }
    } else {
      $scope.view.selected[surveyId] = [questionId];
    }
  };

  $scope.createCSV = function() {
    AdminService.surveys.csv($scope.view.selected, $scope.view.include);
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('UsersController', ["$rootScope", "$scope", "UsersService", "$location", "LocalAuthService", "$stateParams",
  function ($rootScope, $scope, UsersService, $location, LocalAuthService, $stateParams) {

  $scope.view = {loginInfo: {}};

  $scope.signup = function() {
    UsersService.create($scope.newUser).then(function(response) {
      if (response.error) {
        $scope.errors = response.error;
        $scope.newUser = {};
        $location.path('/signup');
      } else {
        $location.path('/');
      }
    });
  };

  $scope.logout = function () {
    UsersService.logout().finally(function() {
      $location.path("/");
    });
  };

  $scope.signin = function () {
    UsersService.signin($scope.view.loginInfo).then(function (response) {
      if(LocalAuthService.isAuthenticated()){
        $scope.view.loginInfo = {};
        if(LocalAuthService.isAdmin()){
          $location.path('/admin/surveys');
        } else {
          $location.path('/users/surveys');
        }
      } else {
        throw new Error("Login Failed");
      }
    }).catch(function(error) {
      LocalAuthService.clearCredentials();
      $scope.view.loginInfo.password = "";
      $scope.errors = error.statusText || error.message || "Login Failed";
    });
  };

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
  };

  $scope.show = function(user) {
    UsersService.find(user).then(function(response) {
      $location.path('admin/users')
    })
  };

  $scope.delete = function (user) {
    var success_url = 'admin/users'
    var fail_url = 'admin/users';
    UsersService.destroy(user).then(function (response) {
      return response ? $location.path(success_url) : $location.path(fail_url)
    })
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */
