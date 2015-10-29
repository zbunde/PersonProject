var SurveyItem = require('../../../models/survey_item');

var options_1 = JSON.stringify([
  {
    text: 'Yes',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'No',
    value: 2,
    additionalTextField: false
  }
])

var subQuestions_1 = JSON.stringify([]);


var title_1 = "Do you have a twitter account?";

var surveyItem_1 = new SurveyItem({
  survey_id: 44,
  strategy: "n/a",
  item_type: "multiple_choice",
  title: title_1,
  layout: "multiple_choice",
  position: 1,
  options: options_1,
  sub_questions: subQuestions_1
}).save();
