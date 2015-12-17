var createSurvey = require('./create-survey');

var data = {
  survey: {
    name: "Real World Sharing",
    description: "",
    est_completion_time_minutes: 20
  },
  version: {
    version: 1,
    status: "In progress"
  },
  questions: [
    {
      id: 'rw-share-q1',
      group_number: 0,
      position: 0,
      text: "How often do you write reviews for the things you buy (Yelp, Amazon, etc)?"
    },
    {
      id: 'rw-share-q2',
      group_number: 1,
      position: 0,
      text: "On average, how many emails do you SEND per day?"
    },
    {
      id: 'rw-share-q3',
      group_number: 2,
      position: 0,
      text: "Do you have a Twitter account?"
    },
    {
      id: 'rw-share-q4',
      group_number: 3,
      position: 0,
      text: "Do you have a Facebook account?"
    },
    {
      id: 'rw-share-q5',
      group_number: 4,
      position: 0,
      text: "How much do you trust your friend?"
    },
    {
      id: 'rw-share-q6',
      group_number: 5,
      group_type: 'table',
      position: 0,
      text: "How well do you feel you know your friend?"
    },
    {
      id: 'rw-share-q7',
      group_number: 5,
      group_type: 'table',
      position: 1,
      text: "How well do you feel your friend knows you?"
    },
    {
      id: 'rw-share-q8',
      group_number: 6,
      position: 0,
      text: "Do you use Instagram?"
    },
    {
      id: 'rw-share-q9',
      group_number: 7,
      position: 0,
      text: "How much does your friend trust you?"
    },
    {
      id: 'rw-share-q10',
      group_number: 8,
      position: 0,
      text: "On average, how many emails do you RECEIVE per day?"
    },
    {
      id: 'rw-share-q11',
      group_number: 9,
      group_type: 'table',
      position: 0,
      text: "How often do you spend time with your friends?"
    },
    {
      id: 'rw-share-q12',
      group_number: 9,
      group_type: 'table',
      position: 1,
      text: "How often do you and your friends converse with each other?"
    },
    {
      id: 'rw-share-q13',
      group_number: 10,
      position: 0,
      text: "How much time (in minutes) do you spend on email in a typical day?"
    },
  ],
  fields: [
    {
      id: 'rw-share-f1',
      widget: 'text'
    },
    {
      id: 'rw-share-f2',
      value: 1,
      position: 0,
      text: "On occassion",
      widget: 'radio'
    },
    {
      id: 'rw-share-f3',
      value: 2,
      position: 1,
      text: "Most of the time",
      widget: 'radio'
    },
    {
      id: 'rw-share-f4',
      value: 3,
      position: 2,
      text: "Never",
      widget: 'radio'
    },
    {
      id: 'rw-share-f5',
      value: 4,
      position: 3,
      text: "Always",
      widget: 'radio'
    },
    {
      id: 'rw-share-f6',
      value: 5,
      position: 4,
      text: "About half of the time",
      widget: 'radio'
    },
    {
      id: 'rw-share-f7',
      value: 1,
      position: 0,
      text: "No",
      widget: 'radio'
    },
    {
      id: 'rw-share-f8',
      value: 2,
      position: 1,
      text: "Yes",
      widget: 'radio'
    },
    {
      id: 'rw-share-f9',
      value: 1,
      position: 0,
      text: "I generally trust this person",
      widget: 'radio'
    },
    {
      id: 'rw-share-f10',
      value: 2,
      position: 1,
      text: "I highly trust this person",
      widget: 'radio'
    },
    {
      id: 'rw-share-f11',
      value: 3,
      position: 2,
      text: "I trust this person somewhat",
      widget: 'radio'
    },
    {
      id: 'rw-share-f12',
      value: 4,
      position: 3,
      text: "I don't trust this person",
      widget: 'radio'
    },
    {
      id: 'rw-share-f13',
      value: 5,
      position: 4,
      text: "I don't know this person well enough to decide",
      widget: 'radio'
    },
    {
      id: 'rw-share-f14',
      value: 6,
      position: 5,
      text: "I would trust this person with my life",
      widget: 'radio'
    },
    {
      id: 'rw-share-f15',
      value: 1,
      position: 0,
      text: "Not at all",
      widget: 'radio'
    },
    {
      id: 'rw-share-f16',
      value: 2,
      position: 1,
      text: "A little bit",
      widget: 'radio'
    },
    {
      id: 'rw-share-f17',
      value: 3,
      position: 2,
      text: "Somewhat",
      widget: 'radio'
    },
    {
      id: 'rw-share-f18',
      value: 4,
      position: 3,
      text: "Fairly well",
      widget: 'radio'
    },
    {
      id: 'rw-share-f19',
      value: 5,
      position: 4,
      text: "Very well",
      widget: 'radio'
    },
    {
      id: 'rw-share-f20',
      value: 6,
      position: 5,
      text: "Extremely well",
      widget: 'radio'
    },
    {
      id: 'rw-share-f21',
      value: 7,
      position: 6,
      text: "Could not know any better",
      widget: 'radio'
    },
    {
      id: 'rw-share-f22',
      value: 1,
      position: 0,
      text: "I don't know this person well enough to decide",
      widget: 'radio'
    },
    {
      id: 'rw-share-f23',
      value: 2,
      position: 1,
      text: "My friend highly trusts me",
      widget: 'radio'
    },
    {
      id: 'rw-share-f24',
      value: 3,
      position: 2,
      text: "My friend doesn't trust me",
      widget: 'radio'
    },
    {
      id: 'rw-share-f25',
      value: 4,
      position: 3,
      text: "My friend trusts me with his/her life",
      widget: 'radio'
    },
    {
      id: 'rw-share-f26',
      value: 5,
      position: 4,
      text: "My friend generally trusts me",
      widget: 'radio'
    },
    {
      id: 'rw-share-f27',
      value: 6,
      position: 5,
      text: "My friend trusts me somewhat",
      widget: 'radio'
    },
    {
      id: 'rw-share-f28',
      value: 1,
      position: 0,
      text: "Never",
      widget: 'radio'
    },
    {
      id: 'rw-share-f29',
      value: 2,
      position: 1,
      text: "On occassion",
      widget: 'radio'
    },
    {
      id: 'rw-share-f30',
      value: 3,
      position: 2,
      text: "About half of the time",
      widget: 'radio'
    },
    {
      id: 'rw-share-f31',
      value: 4,
      position: 3,
      text: "Most of the time",
      widget: 'radio'
    },
    {
      id: 'rw-share-f32',
      value: 5,
      position: 4,
      text: "Always",
      widget: 'radio'
    }
  ],
  mappings: [
    {
      qid: 'rw-share-q1',
      fid: ['rw-share-f2', 'rw-share-f3', 'rw-share-f4', 'rw-share-f5', 'rw-share-f6']
    },
    {
      qid: 'rw-share-q2',
      fid: ['rw-share-f1']
    },
    {
      qid: 'rw-share-q3',
      fid: ['rw-share-f7', 'rw-share-f8']
    },
    {
      qid: 'rw-share-q4',
      fid: ['rw-share-f7', 'rw-share-f8']
    },
    {
      qid: 'rw-share-q5',
      fid: ['rw-share-f9', 'rw-share-f10', 'rw-share-f11', 'rw-share-f12', 'rw-share-f13', 'rw-share-f14']
    },
    {
      qid: 'rw-share-q6',
      fid: ['rw-share-f15', 'rw-share-f16', 'rw-share-f17', 'rw-share-f18', 'rw-share-f19', 'rw-share-f20', 'rw-share-f21']
    },
    {
      qid: 'rw-share-q7',
      fid: ['rw-share-f15', 'rw-share-f16', 'rw-share-f17', 'rw-share-f18', 'rw-share-f19', 'rw-share-f20', 'rw-share-f21']
    },
    {
      qid: 'rw-share-q8',
      fid: ['rw-share-f7', 'rw-share-f8']
    },
    {
      qid: 'rw-share-q9',
      fid: ['rw-share-f22', 'rw-share-f23', 'rw-share-f24', 'rw-share-f25', 'rw-share-f26', 'rw-share-f27']
    },
    {
      qid: 'rw-share-q10',
      fid: ['rw-share-f1']
    },
    {
      qid: 'rw-share-q11',
      fid: ['rw-share-f28', 'rw-share-f29', 'rw-share-f30', 'rw-share-f31', 'rw-share-f32']
    },
    {
      qid: 'rw-share-q12',
      fid: ['rw-share-f28', 'rw-share-f29', 'rw-share-f30', 'rw-share-f31', 'rw-share-f32']
    },
    {
      qid: 'rw-share-q13',
      fid: ['rw-share-f1']
    }
  ]
};

createSurvey(data);
