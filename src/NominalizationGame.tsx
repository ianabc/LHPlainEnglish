import { useState } from "react";
import { VERBGAME_EXAMPLES, VerbGameQuestion } from "./data/VerbGameExamples";
import { getRoundSize, pickRandomIndices, scoreMessage } from "./utils";

type QuestionState = {
  selectedOptionIndex: number | null;
  isCorrect: boolean | null;
  firstAttemptCorrect: boolean | null;
};

function makeQuestionStates(count: number): QuestionState[] {
  return Array.from({ length: count }, () => ({
    selectedOptionIndex: null,
    isCorrect: null,
    firstAttemptCorrect: null,
  }));
}

type Props = { onHome: () => void };

export function NominalizationGame({ onHome }: Props) {
  const total = VERBGAME_EXAMPLES.length;
  const roundSize = getRoundSize(total);

  const [questionSet, setQuestionSet] = useState<number[]>(() =>
    pickRandomIndices(total, roundSize)
  );
  const [position, setPosition] = useState(0);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>(() =>
    makeQuestionStates(roundSize)
  );
  const [gameOver, setGameOver] = useState(false);

  if (total === 0) {
    return (
      <section className="game-card">
        <p className="hint">
          Add at least one entry in <code>src/data/VerbGameExamples.ts</code>.
        </p>
      </section>
    );
  }

  const currentQuestion: VerbGameQuestion =
    VERBGAME_EXAMPLES[questionSet[position]];
  const { selectedOptionIndex, isCorrect } = questionStates[position];

  const correctOptionIndex = currentQuestion.options.indexOf(currentQuestion.correctAnswer);

  function handleOptionClick(index: number) {
    const clickedIsCorrect = index === correctOptionIndex;
    setQuestionStates((prev) => {
      const next = [...prev];
      const q = { ...next[position] };
      if (q.firstAttemptCorrect === null) {
        q.firstAttemptCorrect = clickedIsCorrect;
      }
      q.selectedOptionIndex = index;
      q.isCorrect = clickedIsCorrect;
      next[position] = q;
      return next;
    });
  }

  function goToNext() {
    if (position === roundSize - 1) {
      setGameOver(true);
    } else {
      setPosition((prev) => prev + 1);
    }
  }

  function goToPrevious() {
    if (position > 0) setPosition((prev) => prev - 1);
  }

  function startNewRound() {
    setQuestionSet(pickRandomIndices(total, roundSize));
    setPosition(0);
    setQuestionStates(makeQuestionStates(roundSize));
    setGameOver(false);
  }

  if (gameOver) {
    const score = questionStates.filter((q) => q.firstAttemptCorrect === true).length;
    return (
      <section className="game-card" style={{ textAlign: "center", padding: "40px 24px" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: "1.6rem" }}>
          {scoreMessage(score, roundSize)}
        </h2>
        <p style={{ color: "var(--text-muted)", margin: "0 0 32px", fontSize: "1.1rem" }}>
          You got <strong style={{ color: "var(--text-main)" }}>{score} of {roundSize}</strong> right on the first try.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" className="nav-button ghost" onClick={onHome}>
            ◀ Home
          </button>
          <button type="button" className="nav-button primary" onClick={startNewRound}>
            Play again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="game-card">
      <div className="game-meta">
        <span className="pill">Question {position + 1} of {roundSize}</span>
        <button type="button" className="nav-button ghost quit-button" onClick={onHome}>
          Quit ✕
        </button>
      </div>

      <p className="prompt">Which word is a verb hiding as a noun?</p>

      <p className="sentence-text">{currentQuestion.sentence}</p>

      <div className="choice-list">
        {currentQuestion.options.map((option, index) => {
          const isSelected = index === selectedOptionIndex;
          const isTheCorrectOption = index === correctOptionIndex;

          let stateClass = "";
          if (isSelected && isCorrect === true) stateClass = "word-correct";
          else if (isSelected && isCorrect === false) stateClass = "word-wrong";

          const isRevealCorrect =
            isCorrect === true && isTheCorrectOption && selectedOptionIndex !== null;

          return (
            <button
              key={`${option}-${index}`}
              type="button"
              className={`choice-chip ${stateClass} ${isRevealCorrect ? "word-highlight" : ""}`}
              onClick={() => handleOptionClick(index)}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="feedback">
        {isCorrect === null && <p className="hint"></p>}

        {isCorrect === true && (
          <div className="feedback-panel success">
            <h2>Nice catch!</h2>
            <p>
              <strong>&ldquo;{currentQuestion.correctAnswer}&rdquo;</strong> is a verb
              hiding as a noun. {currentQuestion.explanation}
            </p>
          </div>
        )}

        {isCorrect === false && selectedOptionIndex !== null && (
          <div className="feedback-panel error">
            <h2>Not quite.</h2>
            <p>Think about which word could be replaced by an action verb.</p>
          </div>
        )}
      </div>

      <div className="controls">
        <button
          type="button"
          className="nav-button ghost"
          onClick={goToPrevious}
          disabled={position === 0}
        >
          ◀ Previous
        </button>
        <button type="button" className="nav-button primary" onClick={goToNext}>
          {position === roundSize - 1
            ? isCorrect ? "Finish ▶" : "Skip & finish ▶"
            : isCorrect ? "Next question ▶" : "Skip ▶"}
        </button>
      </div>
    </section>
  );
}
