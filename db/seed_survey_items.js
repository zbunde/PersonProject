var SurveyItem = require('../models/survey_item');

var options = JSON.stringify([
  {
    text: "Less than 1 day: Rarely",
    value: 1,
    additionalTextField: false
  },
  {
    text: "1-2 days: Some or a little of the time",
    value: 2,
    additionalTextField: false
  },
  {
    text: "3-4 days: Occasionally or a moderate amount of the time",
    value: 3,
    additionalTextField: false
  },
  {
    text: "5-7 days: Most or all of the time",
    value: 4,
    additionalTextField: false
  }
])

var subQuestions = JSON.stringify([
  {
    text: "I was bothered by things that usually don't bother me."
  },
  {
    text: " I didn't feel like eating; I had a poor appetite."
  },
  {
    text: ". I felt that I could not shake off the blues even with help from my family or friends."
  },
  {
    text: "I had trouble keeping my mind on what I was doing."
  },
  {
    text: "I felt depressed."
  },
  {
    text: "I felt like everything I did was an effort."
  },
  {
    text: "I thought that my life until now had been a failure."
  },
  {
    text: "I felt afraid."
  },
  {
    text: "I couldn't sleep well."
  },
  {
    text: "I was happy."
  },
  {
    text: "I talked less than usual."
  },
  {
    text: "I felt lonely."
  },
  {
    text: "People were unfriendly."
  },
  {
    text: "I enjoyed life."
  },
  {
    text: "I had crying spells."
  },
  {
    text: "I felt that people disliked me."
  },
  {
    text: "I couldn't get going."
  },
  {
    text: "I felt that I was just as good as other people."
  },
  {
    text: "I felt hopeful about the future."
  },
  {
    text: "I felt sad."
  }
])

var survey_item = {
  survey_id: 1,
  strategy: "n/a",
  item_type: "multiple_choice",
  title: "n/a",
  layout: "table",
  position: 1,
  options: options,
  sub_questions: subQuestions
}

new SurveyItem(survey_item).save();
