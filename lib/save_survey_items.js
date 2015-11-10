var SurveyItem = require('../models/survey_item');

module.exports = function(survey_items, success_msg, failure_msg) {
  if (!success_msg || success_msg === "") {
    success_msg = "Survey items seeded.";
  }

  if (!failure_msg || failure_msg === "") {
    failure_msg = "ERROR: Surveys items did not seed";
  }

  Promise.all(survey_items.map(function (item) {
    return new SurveyItem(item).save();
  })).then(function() {
    console.log(success_msg);
    process.exit();
  }, function() {
    console.log(failure_msg);
    process.exit(1);
  });
}
