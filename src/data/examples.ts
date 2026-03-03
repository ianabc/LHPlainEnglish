export type RedundancyExample = {
  id: number;
  sentence: string;
  redundantWord: string;
  explanation: string;
};

export const EXAMPLES: RedundancyExample[] = [
  {
    id: 1,
    sentence: "The basic fundamental principle is easy to understand.",
    redundantWord: "basic",
    explanation:
      "Both 'basic' and 'fundamental' express the same idea, so you only need one of them."
  },
  {
    id: 2,
    sentence: "She returned back to the office after lunch.",
    redundantWord: "back",
    explanation:
      "To 'return' already means to go back, so 'back' is redundant here."
  },
  {
    id: 3,
    sentence: "In my own personal opinion, this is unnecessary.",
    redundantWord: "own",
    explanation:
      "An opinion is already personal, so 'own' does not add any new meaning."
  }
  // Add more examples here following the same shape.
];

