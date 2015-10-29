// these survey_items depend on twitter_1.js

var SurveyItem = require('../../../models/survey_item');

var options_2 = JSON.stringify([])
var subQuestions_2 = JSON.stringify([])

var title_2 = 'Approximately how many followers do you have on twitter?';

// ----------------------------------------

var options_3 = JSON.stringify([])
var subQuestions_3 = JSON.stringify([])

var title_3 = 'Approximately how many twitter accounts do you follow?';

// -------------------------------------

var options_4 = JSON.stringify([
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

var subQuestions_4 = JSON.stringify([]);

var title_4 = 'How often do you "tweet"?';

//--------------------------------------

var options_5 = JSON.stringify([])
var subQuestions_5 = JSON.stringify([])

var title_5 = 'How much time (in minutes) do you spend on Twitter in a typical day?';

// -------------------------------------

var survey_items = [
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "numeric_input",
    title: title_2,
    layout: "free_form",
    position: 2,
    options: options_2,
    sub_questions: subQuestions_2,
    depends_on: {id: 48, value: 1}
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "numeric_input",
    title: title_3,
    layout: "free_form",
    position: 3,
    options: options_3,
    sub_questions: subQuestions_3,
    depends_on: {id: 48, value: 1}
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "multiple_choice",
    title: title_4,
    layout: "multiple_choice",
    position: 4,
    options: options_4,
    sub_questions: subQuestions_4,
    depends_on: {id: 48, value: 1}
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "numeric_input",
    title: title_5,
    layout: "free_form",
    position: 5,
    options: options_5,
    sub_questions: subQuestions_5,
    depends_on: {id: 48, value: 1}
  }
]

survey_items.forEach(function (item) {
  new SurveyItem(item).save();
})
