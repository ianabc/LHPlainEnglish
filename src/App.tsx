import { useMemo, useState } from "react";
import { EXAMPLES, RedundancyExample } from "./data/examples";

function normalizeWord(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9']/gi, "");
}

export function App() {
  const total = EXAMPLES.length;
  const [currentIndex, setCurrentIndex] = useState(() =>
    total > 0 ? Math.floor(Math.random() * total) : 0
  );
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (total === 0) {
    return (
      <div className="app-root">
        <header className="app-header">
          <h1>Lynsey's English Word Game</h1>
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

  const currentExample: RedundancyExample = EXAMPLES[currentIndex];

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
    setSelectedWordIndex(index);
    const clickedIsCorrect = index === correctIndex;
    setIsCorrect(clickedIsCorrect);
  }

  function goToNext() {
    setSelectedWordIndex(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => (prev + 1) % total);
  }

  function goToPrevious() {
    setSelectedWordIndex(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
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
              Sentence {currentIndex + 1} of {total}
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
                  redundant here.
                </p>
                <p>{currentExample.explanation}</p>
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
            <button type="button" className="nav-button ghost" onClick={goToPrevious}>
              ◀ Previous
            </button>
            <button
              type="button"
              className="nav-button primary"
              onClick={goToNext}
              disabled={total <= 1}
            >
              {isCorrect ? "Next sentence ▶" : "Skip ▶"}
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

