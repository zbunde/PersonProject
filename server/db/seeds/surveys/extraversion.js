var createSurvey = require("./create-survey");

var data = {
  survey: {
    name: "Extraversion",
    description: "",
    est_completion_time_minutes: 15,
  },
  version: {
    version: 1,
    status: "In progress"
  },
  questions: [
    {
      id: "extra-q1",
      group_number: 0,
      group_type: "table",
      text: "I see myself as extraverted, enthusiastic"
    },
    {
      id: "extra-q2",
      group_number: 0,
      group_type: "table",
      text: " I see myself as reserved, quiet"
    }
  ],
  fields: [
    {
      id: "extra-f1",
      value: 1,
      position: 0,
      text: "disagree strongly",
      widget: "radio"
    },
    {
      id: "extra-f2",
      value: 2,
      position: 1,
      text: "disagree moderately",
      widget: "radio"
    },
    {
      id: "extra-f3",
      value: 3,
      position: 2,
      text: "disagree a little",
      widget: "radio"
    },
    {
      id: "extra-f4",
      value: 4,
      position: 3,
      text: "neither agree or disagree",
      widget: "radio"
    },
    {
      id: "extra-f5",
      value: 5,
      position: 4,
      text: "agree a little",
      widget: "radio"
    },
    {
      id: "extra-f6",
      value: 6,
      position: 5,
      text: "agree moderately",
      widget: "radio"
    },
    {
      id: "extra-f7",
      value: 7,
      position: 6,
      text: "agree strongly",
      widget: "radio"
    }
  ],
  mappings: [
    {
      qid: "extra-q1",
      fid: ["extra-f1", "extra-f2", "extra-f3", "extra-f4", "extra-f5", "extra-f6", "extra-f7"]
    },
    {
      qid: "extra-q2",
      fid: ["extra-f1", "extra-f2", "extra-f3", "extra-f4", "extra-f5", "extra-f6", "extra-f7"]
    }
  ]
};

createSurvey(data);
