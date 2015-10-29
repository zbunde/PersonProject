// these survey_items depend on instagram_1.js

var SurveyItem = require('../../../models/survey_item');

var options_2 = JSON.stringify([
  {
    text: 'Never',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'Less than Once a Month',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'Once a Month',
    value: 3,
    additionalTextField: false
  },
  {
    text: '2-3 Times a Month',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'Once a Week',
    value: 5,
    additionalTextField: false
  },
  {
    text: '2-3 Times a Week',
    value: 6,
    additionalTextField: false
  },
  {
    text: 'Every other Day',
    value: 7,
    additionalTextField: false
  },
  {
    text: 'Daily',
    value: 8,
    additionalTextField: false
  }
])

var subQuestions_2 = JSON.stringify([]);

var title_2 = 'How often do you post pictures on Instagram?';

//-----------------------------------------------

var options_3 = JSON.stringify([])
var subQuestions_3 = JSON.stringify([])

var title_3 = 'Approximately how many pictures have you posted on Instagram?';

// ----------------------------------------

var options_4 = JSON.stringify([])
var subQuestions_4 = JSON.stringify([])

var title_4 = 'Approximately how many followers do you have on Instagram?';

// -------------------------------------

var options_5 = JSON.stringify([])
var subQuestions_5 = JSON.stringify([])

var title_5 = 'Approximately how people do you follow on Instagram?';

// -------------------------------------

var options_6 = JSON.stringify([])
var subQuestions_6 = JSON.stringify([])

var title_6 = 'Approximately how many times do you check your Instagram per day?';

// -------------------------------------

var options_7 = JSON.stringify([])
var subQuestions_7 = JSON.stringify([])

var title_7 = ' How much time (in minutes) do you spend on Instagram per day?';

// -------------------------------------

var survey_items = [
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "multiple_choice",
    title: title_2,
    layout: "multiple_choice",
    position: 7,
    options: options_2,
    sub_questions: subQuestions_2,
    depends_on: {id: 88, value: 1}
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "numeric_input",
    title: title_3,
    layout: "free_form",
    position: 8,
    options: options_3,
    sub_questions: subQuestions_3,
    depends_on: {id: 88, value: 1}
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "numeric_input",
    title: title_4,
    layout: "free_form",
    position: 9,
    options: options_4,
    sub_questions: subQuestions_4,
    depends_on: {id: 88, value: 1}
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "numeric_input",
    title: title_5,
    layout: "free_form",
    position: 10,
    options: options_5,
    sub_questions: subQuestions_5,
    depends_on: {id: 88, value: 1}
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "numeric_input",
    title: title_6,
    layout: "free_form",
    position: 11,
    options: options_6,
    sub_questions: subQuestions_6,
    depends_on: {id: 88, value: 1}
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "numeric_input",
    title: title_7,
    layout: "free_form",
    position: 12,
    options: options_7,
    sub_questions: subQuestions_7,
    depends_on: {id: 88, value: 1}
  }
]

survey_items.forEach(function (item) {
  new SurveyItem(item).save();
})
