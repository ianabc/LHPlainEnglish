import { useMemo, useState } from "react";
import { EXAMPLES, RedundancyExample } from "./data/examples";

const DEFAULT_ROUND_SIZE = 7;

function getRoundSize(total: number): number {
  const param = new URLSearchParams(window.location.search).get("questions");
  const parsed = param !== null ? parseInt(param, 10) : DEFAULT_ROUND_SIZE;
  const n = Number.isFinite(parsed) ? parsed : DEFAULT_ROUND_SIZE;
  return Math.max(1, Math.min(n, total));
}

function normalizeWord(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9']/gi, "");
}

function pickRandomIndices(total: number, count: number): number[] {
  const indices = Array.from({ length: total }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

type QuestionState = {
  selectedWordIndex: number | null;
  isCorrect: boolean | null;
  firstAttemptCorrect: boolean | null;
};

function makeQuestionStates(count: number): QuestionState[] {
  return Array.from({ length: count }, () => ({
    selectedWordIndex: null,
    isCorrect: null,
    firstAttemptCorrect: null,
  }));
}

function scoreMessage(score: number, total: number): string {
  if (score === total) return "Perfect round!";
  if (score >= total * 0.8) return "Great work!";
  if (score >= total * 0.5) return "Not bad!";
  return "Keep practising!";
}

export function App() {
  const total = EXAMPLES.length;
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
      <div className="app-root">
        <header className="app-header">
          <h1>Lynsey's Plain Language Word Game</h1>
          <p className="subtitle">Add examples to start playing.</p>
        </header>
        <main>
          <section className="game-card">
            <p className="hint">
              Add at least one entry in <code>src/data/examples.ts</code>.
            </p>
          </section>
        </main>
      </div>
    );
  }

  const currentExample: RedundancyExample = EXAMPLES[questionSet[position]];
  const { selectedWordIndex, isCorrect } = questionStates[position];

  const words = useMemo(
    () => currentExample.sentence.split(" "),
    [currentExample.sentence]
  );

  const correctIndex = useMemo(
    () =>
      words.findIndex(
        (w) => normalizeWord(w) === normalizeWord(currentExample.redundantWord)
      ),
    [words, currentExample.redundantWord]
  );

  function handleWordClick(index: number) {
    const clickedIsCorrect = index === correctIndex;
    setQuestionStates((prev) => {
      const next = [...prev];
      const q = { ...next[position] };
      if (q.firstAttemptCorrect === null) {
        q.firstAttemptCorrect = clickedIsCorrect;
      }
      q.selectedWordIndex = index;
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
    if (position > 0) {
      setPosition((prev) => prev - 1);
    }
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
      <div className="app-root">
        <header className="app-header">
          <h1>Lynsey's Plain Language Word Game</h1>
          <p className="subtitle">
            Spot the redundant word to make each sentence cleaner and sharper.
          </p>
        </header>
        <main>
          <section className="game-card" style={{ textAlign: "center", padding: "40px 24px" }}>
            <h2 style={{ margin: "0 0 8px", fontSize: "1.6rem" }}>
              {scoreMessage(score, roundSize)}
            </h2>
            <p style={{ color: "var(--text-muted)", margin: "0 0 32px", fontSize: "1.1rem" }}>
              You got <strong style={{ color: "var(--text-main)" }}>{score} of {roundSize}</strong> right on the first try.
            </p>
            <button type="button" className="nav-button primary" onClick={startNewRound}>
              Play again
            </button>
          </section>

          <section className="footer-note">
            <p>
              You can add more examples to <code><a href="https://github.com/ianabc/LHPlainEnglish/blob/main/src/data/examples.ts">src/data/examples.ts</a></code> to grow the game.
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Lynsey's Plain Language Word Game</h1>
        <p className="subtitle">
          Spot the redundant word to make each sentence cleaner and sharper.
        </p>
      </header>

      <main>
        <section className="game-card">
          <div className="game-meta">
            <span className="pill">
              Question {position + 1} of {roundSize}
            </span>
          </div>

          <p className="prompt">Tap the word you think is redundant:</p>

          <div className="sentence">
            {words.map((word, index) => {
              const isSelected = index === selectedWordIndex;
              const isTheCorrectWord = index === correctIndex;

              let stateClass = "";
              if (isSelected && isCorrect === true) stateClass = "word-correct";
              else if (isSelected && isCorrect === false) stateClass = "word-wrong";

              const isRevealCorrect =
                isCorrect === true && isTheCorrectWord && selectedWordIndex !== null;

              return (
                <button
                  key={`${word}-${index}`}
                  type="button"
                  className={`word-chip ${stateClass} ${
                    isRevealCorrect ? "word-highlight" : ""
                  }`}
                  onClick={() => handleWordClick(index)}
                >
                  {word}
                </button>
              );
            })}
          </div>

          <div className="feedback">
            {isCorrect === null && (
              <p className="hint"></p>
            )}

            {isCorrect === true && (
              <div className="feedback-panel success">
                <h2>Nice catch!</h2>
                <p>
                  <strong>&ldquo;{currentExample.redundantWord}&rdquo;</strong> is
                  redundant here, {currentExample.explanation}.</p>
              </div>
            )}

            {isCorrect === false && selectedWordIndex !== null && (
              <div className="feedback-panel error">
                <h2>Not quite.</h2>
                <p>Try another word. Think about what can be removed without changing the meaning.</p>
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
            <button
              type="button"
              className="nav-button primary"
              onClick={goToNext}
            >
              {position === roundSize - 1
                ? isCorrect
                  ? "Finish ▶"
                  : "Skip & finish ▶"
                : isCorrect
                ? "Next question ▶"
                : "Skip ▶"}
            </button>
          </div>
        </section>

        <section className="footer-note">
          <p>
            You can add more examples to <code><a href="https://github.com/ianabc/LHPlainEnglish/blob/main/src/data/examples.ts">src/data/examples.ts</a></code> to grow the game.
          </p>
        </section>
      </main>
    </div>
  );
}
