/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('AdminController', ["$scope", "UsersService", "ModalService",
  function ($scope, UsersService, ModalService) {
    $scope.admin = {};
    $scope.users = [];

    UsersService.getAdmins().then(function (users) {
      $scope.users = users;
    });

    $scope.deleteAdmin = function(userId) {
      ModalService.showModal({
        templateUrl: "/partials/admin/delete_admin_modal.html",
        controller: "AdminDeleteController",
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if (result === "DELETE") {
            UsersService.deleteAdmin(userId).then(function() {
              $scope.users = $scope.users.filter(function(user) {
                return user.id !== userId;
              });
            });
          }
        });
      });
    };

    $scope.createAdmin = function () {
      UsersService.createAdmin($scope.admin).then(function (response) {
        if(response.error){
          $scope.admin = {};
          $scope.errors = response.error;
        } else {
          $scope.admin = {};
          $scope.users.push(response)
        }
      });
    };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('AdminDeleteController', ["$scope", "close",
  function($scope, close) {
    $scope.dismissModal = function(result) {
      close(result, 200);
    }

}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('AdminSurveysController', ["$scope", "SurveysService", "SurveyItemsService", "ModalService", "AdminService",
  function($scope, SurveysService, SurveyItemsService, ModalService, AdminService) {
    $scope.surveys;
    $scope.surveyForEdit;
    $scope.surveyJSON;

    SurveysService.all(true).then(function(data) {
      $scope.surveys = data;
    });

    $scope.showSurvey = function(survey) {
      $scope.surveyForEdit = survey;
      SurveyItemsService.find(survey.id).then(function(json) {
        $scope.surveyJSON = {survey: survey, items: json};
      });
    };

    $scope.dismissEdit = function() {
      $scope.surveyForEdit = undefined;
      $scope.surveyJSON = undefined;
    };

    $scope.updateSurvey = function(survey) {

    };

    $scope.deleteSurvey = function(survey) {
      ModalService.showModal({
        templateUrl: "/partials/admin/delete_survey_modal.html",
        controller: "AdminDeleteController",
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if (result === "DELETE") {
            // TODO: Is this a good idea?  Would we ever want to do this?
            //AdminService.deleteServey(survey.id).then(function() {
            $scope.surveys = $scope.surveys.filter(function(s) {
              return s.id !== survey.id;
            });
            //});
          }
        });
      });
    };
}]);


/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('FeaturedSurveysController', ["$scope", "SurveysService", "AdminService",
  function ($scope, SurveysService, AdminService) {
    $scope.view = {};
    var MAX_FEATURED_SURVEYS = 8;

    SurveysService.all().then(function(data) {
      $scope.view.surveys = data;
    });

    function sortedFeaturedSurveys() {
      return $scope.view.surveys.reduce(function(acc, s) {
      if (s.is_featured) acc.push(s);
        return acc;
      }, []).sort(function(a, b) {
        return Number(a.position) - Number(b.position);
      });
    }

    $scope.surveyOrder = function(survey) {
      if (survey.is_featured && survey.position !== null) return +survey.position;
      return MAX_FEATURED_SURVEYS + 1;
    };

    $scope.toggleFeaturedSurvey = function(survey) {
      if (survey.is_featured) {
        var max = $scope.view.surveys.reduce(function(acc, s) {
          if (+s.position > acc) return +s.position;
          return acc;
        }, -Infinity);
        if (max < MAX_FEATURED_SURVEYS) {
          if (!isFinite(max)) { survey.position = 1; }
          else { survey.position = max + 1; }
        }
      } else {
        delete survey['position'];
        sortedFeaturedSurveys().forEach(function(s, index) {
          s.position = index + 1;
        });
      }
    };

    $scope.moveSurvey = function(survey, moveUp) {
      var featured = sortedFeaturedSurveys();
      if (moveUp === true && featured.length > 0 && Number(survey.position) > +featured[0].position) {
        for (var i = 0; i < featured.length; i++) {
          if (+featured[i].position === +survey.position) {
            var temp = featured[i - 1];
            featured[i-1] = featured[i];
            featured[i-1].position = featured[i-1].position - 1;
            featured[i] = temp;
            temp.position = temp.position + 1;
            break;
          }
        }
      } else if (moveUp === false && featured.length > 0 && Number(survey.position) < +featured[featured.length - 1].position) {
        for (var i = 0; i < featured.length; i++) {
          if (+featured[i].position === +survey.position) {
            var temp = featured[i + 1];
            featured[i+1] = featured[i];
            featured[i+1].position = featured[i+1].position + 1;
            featured[i] = temp;
            temp.position = temp.position - 1;
            break;
          }
        }
      }
    };

    $scope.saveSurveyOrder = function() {
      var data = {};
      data.featuredOrder = sortedFeaturedSurveys().map(function(survey) {
        return {id: survey.id, position: survey.position};
      });
      AdminService.surveys.featuredOrder(data).then(function() {
        $scope.view.messages = "Order Saved";
      }).catch(function() {
        $scope.view.error = "Order Failed To Save";
      })
    };

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
  UsersService.result($state.params.completion_id).then(function(result){
    if(result.survey === "Not Implemented"){
      $state.go('user.dashboard');
    }else{
      $scope.result = result;
    }
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
  $scope.view = {};
  $scope.view.options = [{value: "first", display: "Include first result for users"},
                         {value: "last", display: "Include last result for user"},
                        ];
  if ($location.search().id && $location.search().id.length === 1) {
    $scope.view.options.unshift({value: "all", display: "Include all user results"});
  }
  $scope.view.include = "";
  AdminService.surveys.items($location.search().id).then(function(data) {
    $scope.view.surveys = data.surveys;
    if ($scope.view.surveys && _.isArray($scope.view.surveys)) {
      $scope.view.surveys.forEach(function(survey) {
        if (_.isArray(survey.questions)) {
          survey.selectAll = false;
          survey.questions.forEach(function(question) {
            question.selected = false;
          });
        }
      });
    }
  });

  $scope.selectAll = function(survey) {
    if (survey.selectAll === true) {
      survey.questions.forEach(function(question) {
        question.selected = true;
      });
    } else {
      survey.questions.forEach(function(question) {
        question.selected = false;
      });
    }
  };

  $scope.createCSV = function() {
    var selected = {};
    $scope.view.surveys.forEach(function(survey) {
      survey.questions.forEach(function(question) {
        if (question.selected === true) {
          if (selected[survey.id] === undefined) {
            selected[survey.id] = [];
          }
          selected[survey.id].push(question.id);
        }
      });
    });
    AdminService.surveys.csv(selected, $scope.view.include);
  };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('UserDashboardController', ["$state", "$rootScope", "$scope", "UsersService", "$location", "LocalAuthService", "$stateParams",
  function ($state, $rootScope, $scope, UsersService, $location, LocalAuthService, $stateParams) {

  $scope.email = LocalAuthService.email();
  $scope.username = LocalAuthService.username();

  $scope.destroy = function(){
    UsersService.destroy().then(function(data){
      LocalAuthService.clearCredentials();
      $state.go('home');
    });
  };

  UsersService.completedSurveys().then(function(data){
    $scope.completions = data.rows;
  });
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('UserPasswordController', ["$scope", "$state", "UsersService",
  function ($scope, $state, UsersService) {
    $scope.change = function(password, new_password){
      UsersService.changePassword(password, new_password).then(function(){
        $state.go('user.dashboard');
      });
    };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('UserProfileController', ["$scope", "$state", "UsersService",
  function ($scope, $state, UsersService) {
    $scope.change = function(profile){
      UsersService.changeProfile(profile).then(function(){
        return UsersService.verifyLogin();
      }).then(function(){
        $state.go('user.dashboard');
      });
    };
}]);

/* *********************************************************************************** */
/* *********************************************************************************** */
/* *********************************************************************************** */

app.controller('UsersController', ["$timeout", "$state", "$rootScope", "$scope", "UsersService", "$location", "LocalAuthService", "$stateParams",
  function ($timeout, $state, $rootScope, $scope, UsersService, $location, LocalAuthService, $stateParams) {

  $scope.view = {loginInfo: {}};

  $scope.$on('login', function(){
    $scope.username = LocalAuthService.username();
  });

  $scope.dashboard = function(){
    $state.go('user.dashboard', {user_id: LocalAuthService.userId()});
  };

  $scope.signup = function() {
    UsersService.create($scope.newUser).then(function(response) {
      if (response.error) {
        $scope.errors = response.error;
        $scope.newUser = {};
        $location.path('/signup');
      } else {
        UsersService.migrate().then(function(response){
          if(response.demographics){
            LocalAuthService.setCompletedDemographics();
          }

          $state.go('home');
        });
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
          $state.go('home');
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
