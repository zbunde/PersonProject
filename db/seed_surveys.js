var Survey = require('../models/survey');

var surveys = [
  {
    name: "Depression",
    description: "Please indicate how OFTEN you have experienced the following in the PAST WEEK.",
    version: 1,
    estimated_time_to_complete: 30,
    status: "in_design"
  },
  {
    name: "Perceived Stress Survey",
    description: "The questions in this scale ask you about your feelings and thoughts during THE LAST MONTH. In each case, please indicate your response representing HOW OFTEN you felt or thought a certain way.",
    version: 1,
    estimated_time_to_complete: 30,
    status: "in_design"
  },
  {
    name: "Mindfulness Attention Awareness",
    description: "Below is a collection of statements about your everyday experience. Using the scale below, please indicate how frequently or infrequently you currently have each experience. Please answer according to what really reflects your experience rather than what you think your experience should be. Please treat each item separately from every other item.",
    version: 1,
    estimated_time_to_complete: 30,
    status: "in_design"
  },
  {
    name: "Berkeley Expressivity Questionnaire",
    description: "For each statement below, please indicate your agreement or disagreement.",
    version: 1,
    estimated_time_to_complete: 30,
    status: "in_design"
  },
  {
    name: "Narcissism",
    description: "",
    version: 1,
    estimated_time_to_complete: 30,
    status: "in_design"
  },
  {
    name: "Satisfaction With Life",
    description: "Please indicate how much you agree or disagree with each statement.",
    version: 1,
    estimated_time_to_complete: 10,
    status: "in_design"
  },
  {
    name: "BAS Reward Responsiveness",
    description: "Please indicate the extent to which you agree or disagree with each statement.",
    version: 1,
    estimated_time_to_complete: 10,
    status: "in_design"
  },
  {
    name: "Body Consciousness Scale",
    description: "Please rate the following statements as they relate to your personal experience as accurately as possible on the provided scale.",
    version: 1,
    estimated_time_to_complete: 10,
    status: "in_design"
  },
  {
    name: "MOS Social Support",
    description: "Next are some questions about the support that is available to you.",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Need to Belong",
    description: "Please indicate the degree to which you agree or disagree with each statement.",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Social Desirability",
    description: "Listed below are a number of statements concerning personal attitudes and traits.  Read each item and decide whether the statement is true or fale as it pertains to you personally.",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Inclusion of Other in Self",
    description: "Think of your best friend. Please indicate the picture (see below) that best describes your current relationship with your best friend.",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Interpersonal Reactivity Index",
    description: "The following statements ask about your thoughts and feelings in a variety of situations. Read each statement carefully. Answer as honestly as you can.",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Autism Spectrum Quotient",
    description: "Read each of the following statements very carefully and state how strongly you agree or disagree with it.",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Prosocial Behaviors",
    description: "ProStranger Today, did you do anything to help a STRANGER, including:",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Interpersonal Reactivity Quotient",
    description: "Please indicate the extent to which you agree with each statement.",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Social Interaction Anxiety",
    description: "For each item, indicate the degree to which you feel the statement is characteristic or true for you.",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Rejection Sensitivity",
    description: "Please use the scale below to indicate the extent to which you agree or disagree with each of the following statements. Write the number in the space provided, using the following rating scale:",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Loneliness",
    description: "The following statements describe how people sometimes feel. For each statement, please indicate how often you feel the way described.",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Real World Sharing",
    description: "",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
    name: "Demographics",
    description: "",
    version: 1,
    estimated_time_to_complete: 20,
    status: "in_design"
  },
  {
      name: "Determining Causality",
      description: "In this part of the survey you will read a few scenarios. Then, based on each question, you will select a reason for the outcome of the scenario.",
      version: 1,
      estimated_time_to_complete: 20,
      status: "in_design"
    }
]
;

Promise.all(surveys.map(function (survey) {
  return new Survey(survey).save();
})).then(function() {
  console.log("Surveys seeded");
  process.exit();
}, function() {
  console.log("ERROR: Surveys did not seed");
  process.exit(1);
});
