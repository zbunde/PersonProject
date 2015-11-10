var app = angular.module('person-project', ['ui.router', 'ngCookies', 'angularModalService', 'formly', 'formlyBootstrap', 'angularUtils.directives.dirPagination']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      controller: 'UsersController',
      views: {
        '' : {
          templateUrl: '/partials/welcome/home.html',
          controller: 'UsersController'
        },
        'surveys@home' : {
          templateUrl: '/partials/surveys/index.html',
          controller: 'SurveysController'
        }
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/partials/registrations/new.html',
      controller: 'UsersController'
    })
    .state('user', {
      url: '/users/:id',
      templateUrl: '/partials/users/dashboard.html',
      controller: 'UsersController'
    })
    .state('user.surveys', {
      url: '/surveys',
      templateUrl: '/partials/surveys/index.html',
      controller: 'SurveysController'
    })
    .state('user.survey', {
      url: '/surveys/:survey_id',
      controller: 'SurveyController',
      views: {
        '' : {
          templateUrl: '/partials/surveys/show.html',
          controller: 'SurveyController'
        },
        'surveyItems@user.survey' : {
          templateUrl: 'partials/survey_items/show.html',
          controller: 'SurveyItemController as vm'}
      }
    })
    .state('user.results', {
      url: '/results/:score',
      templateUrl: 'partials/users/results.html',
      controller: 'ResultsController',
    })
    .state('admin', {
      url: '/admin/:id',
      templateUrl: '/partials/admin/dashboard.html',
      controller: 'AdminController'
    })
    .state('admin.new', {
      url: '/new',
      templateUrl: '/partials/admin/new.html',
      controller: 'UsersController'
    })
    .state('admin.surveys', {
      url: '/surveys',
      templateUrl: 'partials/surveys/index.html',
      controller: 'SurveysController'
    })
    .state('admin.new_survey', {
      url: '/surveys/new',
      templateUrl: '/partials/surveys/new',
      controller: 'SurveyController as vm'
    })
    .state('admin.survey', {
      url: '/surveys/:survey_id',
      templateUrl: '/partials/surveys/show.html',
      controller: 'SurveyController'
    })
    .state('admin.users', {
      url: '/users',
      templateUrl: '/partials/users/index.html',
      controller: 'UsersController'
    })
    .state('admin.user', {
      url: '/users/:user_id',
      templateUrl: '/partials/admin/show_user.html',
      controller: 'UsersController'
    })
    .state('terms', {
      url: '/terms',
      templateUrl: '/partials/welcome/terms.html',
      controller: 'UsersController'
    })
})
