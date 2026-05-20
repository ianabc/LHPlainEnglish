export type VerbGameQuestion = {
  id: number;
  sentence: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const VERBGAME_EXAMPLES: VerbGameQuestion[] = [
  {
    id: 0,
    sentence: "The blood test results provided an indication that medication was needed.",
    options: ["medication", "indication", "provided"],
    correctAnswer: "indication",
    explanation: "The blood test results indicated that medication was needed."
  },
  {
    id: 1,
    sentence: "Naturopaths displayed a tendency to prescribe antibiotics for longer periods.",
    options: ["displayed", "prescribe", "tendency"],
    correctAnswer: "tendency",
    explanation: "Naturopaths tended to prescribe antibiotics for longer periods."
  },
  {
    id: 2,
    sentence: "The researchers and community groups took the decision to work on the grant together",
    options: ["decision", "work", "took"],
    correctAnswer: "decision",
    explanation: "The researchers and community groups decided to work on the grant together."
  },
  {
    id: 3,
    sentence: "It is important to practice hand washing while you are sick.",
    options: ["practice", "washing", "important"],
    correctAnswer: "washing",
    explanation: "It is important to wash your hands while you are sick."
  },
  {
    id: 4,
    sentence: "The government made the announcement about the new health centre at the press conference.",
    options: ["conference", "made", "announcement"],
    correctAnswer: "announcement",
    explanation: "The government announced the new health centre at the press conference."
  },
  {
    id: 5,
    sentence: "Our intention is to gather information on which health websites parents visit.",
    options: ["gather", "health", "intention"],
    correctAnswer: "intention",
    explanation: "We intend to gather information on which health websites parents visit."
  },
  {
    id: 6,
    sentence: "The pharmacy placed a limit on the number of covid tests a customer could take.",
    options: ["placed", "number", "limit"],
    correctAnswer: "limit",
    explanation: "The pharmacy limited the number of covid tests a customer could take."
  },
  {
    id: 7,
    sentence: "The committee members were in agreement about the updated curriculum.",
    options: ["agreement", "curriculum", "committee"],
    correctAnswer: "agreement",
    explanation: "The committee members agreed about the updated curriculum."
  },
];
