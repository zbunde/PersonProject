var SurveyItem = require('../../../models/survey_item');

var options_1 = JSON.stringify([])
var subQuestions_1 = JSON.stringify([])

var title_1 = 'On average, how many emails do you SEND per day?';

// -------------------------------------

var options_2 = JSON.stringify([])
var subQuestions_2 = JSON.stringify([])

var title_2 = 'On average, how many emails do you RECEIVE per day?';

// -------------------------------------

var options_3 = JSON.stringify([])
var subQuestions_3 = JSON.stringify([])

var title_3 = 'How much time (in minutes) do you spend on email in a typical day?';

// -------------------------------------

var survey_items = [
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "numeric_input",
    title: title_1,
    layout: "free_form",
    position: 18,
    options: options_1,
    sub_questions: subQuestions_1
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "numeric_input",
    title: title_2,
    layout: "free_form",
    position: 19,
    options: options_2,
    sub_questions: subQuestions_2
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "numeric_input",
    title: title_3,
    layout: "free_form",
    position: 20  ,
    options: options_3,
    sub_questions: subQuestions_3
  }
]

survey_items.forEach(function (item) {
  new SurveyItem(item).save();
})
