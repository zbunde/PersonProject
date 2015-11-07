app.factory('SurveysService', function ($http) {
  var url = 'https://person-project.herokuapp.com/api/v1';
  return {
    all: function () {
      return $http.get(url + '/surveys').then(function (response) {
        return response.data;
      });
    },

    create: function (survey) {
      return $http.post(url + '/surveys', survey).then(function (response) {
        return response.data;
      });
    },

    find: function (survey_id) {
      return $http.get(url + '/surveys/' + survey_id).then(function (response) {
        return response.data;
      })
    },
    requestSurvey: function (survey) {
      this.survey = survey;
    }
  }
})
