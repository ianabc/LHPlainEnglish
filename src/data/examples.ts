export type RedundancyExample = {
  id: number;
  sentence: string;
  redundantWord: string;
  explanation: string;
};

export const EXAMPLES: RedundancyExample[] = [
  {
    "id": 0,
    "sentence": "Our seats were in such close proximity to the stage we could have touched the band",
    "redundantWord": "close",
    "explaination": "Proximity means nearness or closeness so the word close is redundant"
  },
  {
    "id": 1,
    "sentence": "He is diametrically opposed to vaccinating his child",
    "redundantWord": "diametrically",
    "explaination": "opposition means counter to, diametrically is unnecessary"
  },
  {
    "id": 2,
    "sentence": "The outbreak of measles was quite the unexpected surprise",
    "redundantWord": "unexpected",
    "explaination": "a surprise is unexpected by nature so the qualifier is not needed"
  },
  {
    "id": 3,
    "sentence": "The photograph captured the buildings characteristic features",
    "redundantWord": "characteristic",
    "explaination": "features are traits or characteristics so a modifier is not needed"
  },
  {
    "id": 4,
    "sentence": "Symptoms not previously listed above are not associated with this disease",
    "redundantWord": "previously",
    "explaination": "listed above refers to the previous content to previously is not needed"
  },
  {
    "id": 5,
    "sentence": "The weather forecast said it might possibly snow at the weekend",
    "redundantWord": "possibly",
    "explaination": "might indicates a possibility or probability already so possibility is redundant"
  },
  {
    "id": 6,
    "sentence": "The time period allotted for data collection was insufficient",
    "redundantWord": "period",
    "explaination": "time is a measured period so the word period is not needed"
  },
  {
    "id": 7,
    "sentence": "Dairy, protein, grains, fruits and vegetables are the five classified food groups",
    "redundantWord": "classified",
    "explaination": "a group is a number of things classed together so classification is unnecessary"
  },
  {
    "id": 8,
    "sentence": "People once thought that rock and roll was a passing fad",
    "redundantWord": "passing",
    "explaination": "fads are temporary so passing is redundant"
  },
  {
    "id": 9,
    "sentence": "The young doctor made her feel like an ancient fossil",
    "redundantWord": "ancient",
    "explaination": "fossil means old or antiquated so ancient is not needed"
  },
  {
    "id": 10,
    "sentence": "The nurse's past experience had shown him how to distract young children at their appointment",
    "redundantWord": "past",
    "explaination": "experience is the personal participation or observation of events that have already taken place, past is not needed"
  },
  {
    "id": 11,
    "sentence": "The comms team put together a press release on the new discovery",
    "redundantWord": "new",
    "explaination": "discovery is the process of experiencing something new, so new is redundant"
  },
  {
    "id": 12,
    "sentence": "We tried to build the ikea furniture but realized we were missing several component parts",
    "redundantWord": "component",
    "explaination": "part is a section or piece, so component is not needed"
  },
  {
    "id": 13,
    "sentence": "Vaccine rates regressed back to 2015 levels",
    "redundantWord": "back",
    "explaination": "regress means to go backwards, so back is unnecessary"
  },
  {
    "id": 14,
    "sentence": "He had to enter the data over again when the computer crashed",
    "redundantWord": "over",
    "explaination": "again means once more, over is redundant"
  },
  {
    "id": 15,
    "sentence": "The reviewers reached a general consensus on which grants to fund",
    "redundantWord": "general",
    "explaination": "consensus is a general agreement by a group, general is not needed"
  },
  {
    "id": 16,
    "sentence": "Use a soft measuring tape to measure round the patient's waist",
    "redundantWord": "round",
    "explaination": "waist indicates that the tape measure needs to encircle the body so around is unnecessary"
  },
  {
    "id": 17,
    "sentence": "The virus can leave you extremely tired and very thirsty",
    "redundantWord": "very",
    "explaination": "the modifier \"very\" does not add anything to the sentence, the meaning is the same when it is omitted"
  }
];

