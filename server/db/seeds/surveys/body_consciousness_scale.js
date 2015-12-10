var createSurvey = require('./create-survey');

var data = {
  survey: {
    name: "Body Consciousness Scale-3",
    description: "Please rate the following statements as they relate to your personal experience as accurately as possible on the provided scale.",
    est_completion_time_minutes: 10
  },
  revision: {
    version: 1,
    status: "In progress",
    survey_id: null
  },
  questions: [
    {
      id: 'bc-q1',
      order: 1,
      text: "I'm sensitive to internal bodily tensions."
    },
    {
      id: 'bc-q2',
      order: 2,
      text: "I know immediately when my mouth or throat gets dry."
    },
    {
      id: 'bc-q3',
      order: 3,
      text: "I can often feel my heart beating."
    },
    {
      id: 'bc-q4',
      order: 4,
      text: "I am quick to sense the hunger contractions of my stomach."
    },
    {
      id: 'bc-q5',
      order: 5,
      text: "I'm very aware of changes in my body temperature."
    }
  ],
  options: [
    {
      id: 'bc-o1',
      value: 1,
      text: "extremely uncharacteristic",
      order: 1,
      metadata: { type: 'radio' }
    },
    {
      id: 'bc-o2',
      value: 2,
      text: "",
      order: 2,
      metadata: { type: 'radio' }
    },
    {
      id: 'bc-o3',
      value: 3,
      text: "",
      order: 3,
      metadata: { type: 'radio' }
    },
    {
      id: 'bc-o4',
      value: 4,
      text: "",
      order: 4,
      metadata: { type: 'radio' }
    },
    {
      id: 'bc-o5',
      value: 5,
      text: "extremely characteristic",
      order: 5,
      metadata: { type: 'radio' }
    }
  ],
  mappings: [
    {
      q: 'bc-q1',
      o: ['bc-o1','bc-o2','bc-o3','bc-o4','bc-o5']
    },
    {
      q: 'bc-q2',
      o: ['bc-o1','bc-o2','bc-o3','bc-o4','bc-o5']
    },
    {
      q: 'bc-q3',
      o: ['bc-o1','bc-o2','bc-o3','bc-o4','bc-o5']
    },
    {
      q: 'bc-q4',
      o: ['bc-o1','bc-o2','bc-o3','bc-o4','bc-o5']
    },
    {
      q: 'bc-q5',
      o: ['bc-o1','bc-o2','bc-o3','bc-o4','bc-o5']
    }
  ]
};

createSurvey(data);
