var SurveyItem = require('../../../models/survey_item');

var options_1 = JSON.stringify([
  {
    text: 'Never',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'On occassion',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'About half of the time',
    value: 3,
    additionalTextField: false
  },
  {
    text: 'Most of the time',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'Always',
    value: 5,
    additionalTextField: false
  }
])

var subQuestions_1 = JSON.stringify([]);

var title_1 = 'How often do you write reviews for the things you buy (Yelp, Amazon, etc)?';

// ---------------------------------------------

var options_2 = JSON.stringify([
  {
    text: 'Never',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'On occassion',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'About half of the time',
    value: 3,
    additionalTextField: false
  },
  {
    text: 'Most of the time',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'Always',
    value: 5,
    additionalTextField: false
  }
])

var subQuestions_2 = JSON.stringify([
  {text: 'How often do you and your friends converse with each other?'},
  {text: 'How often do you spend time with your friends?'}
]);

var title_2 = 'n/a';

// ---------------------------------------------

var options_3 = JSON.stringify([
  {
    text: 'Not at all',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'A little bit',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'Somewhat',
    value: 3,
    additionalTextField: false
  },
  {
    text: 'Fairly well',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'Very well',
    value: 5,
    additionalTextField: false
  },
  {
    text: 'Extremely well',
    value: 6,
    additionalTextField: false
  },
  {
    text: 'Could not know any better',
    value: 7,
    additionalTextField: false
  }
])

var subQuestions_3 = JSON.stringify([
  {text: 'How well do you feel you know your friend?'},
  {text: 'How well do you feel your friend knows you?'}
]);

var title_3 = 'For the following questions, think of the friend you interact with most:';

// ----------------------------------------

var options_4 = JSON.stringify([
  {
    text: 'I don\'t know this person well enough to decide',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'I don\'t trust this person',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'I trust this person somewhat',
    value: 3,
    additionalTextField: false
  },
  {
    text: 'I generally trust this person',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'I highly trust this person',
    value: 5,
    additionalTextField: false
  },
  {
    text: 'I would trust this person with my life',
    value: 6,
    additionalTextField: false
  }
])

var subQuestions_4 = JSON.stringify([]);

var title_4 = 'How much do you trust your friend?';

// ----------------------------------

var options_5 = JSON.stringify([
  {
    text: 'I don\'t know this person well enough to decide',
    value: 1,
    additionalTextField: false
  },
  {
    text: 'my friend doesn\'t trust me',
    value: 2,
    additionalTextField: false
  },
  {
    text: 'my friend trusts me somewhat',
    value: 3,
    additionalTextField: false
  },
  {
    text: 'my friend generally trusts me',
    value: 4,
    additionalTextField: false
  },
  {
    text: 'my friend highly trusts me',
    value: 5,
    additionalTextField: false
  },
  {
    text: 'my friend trusts me with his/her life',
    value: 6,
    additionalTextField: false
  }
])

var subQuestions_5 = JSON.stringify([]);

var title_5 = 'How much does your friend trust you?';

// ----------------------------------

var survey_items = [
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "multiple_choice",
    title: title_1,
    layout: "multiple_choice",
    position: 1,
    options: options_1,
    sub_questions: subQuestions_1
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "multiple_choice",
    title: title_2,
    layout: "table",
    position: 2,
    options: options_2,
    sub_questions: subQuestions_2
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "multiple_choice",
    title: title_3,
    layout: "table",
    position: 3,
    options: options_3,
    sub_questions: subQuestions_3
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "multiple_choice",
    title: title_4,
    layout: "multiple_choice",
    position: 4,
    options: options_4,
    sub_questions: subQuestions_4
  },
  {
    survey_id: 44,
    strategy: "n/a",
    item_type: "multiple_choice",
    title: title_5,
    layout: "multiple_choice",
    position: 5,
    options: options_5,
    sub_questions: subQuestions_5
  }
]

survey_items.forEach(function (item) {
  new SurveyItem(item).save();
})
