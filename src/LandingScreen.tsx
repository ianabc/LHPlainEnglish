type Screen = "redundancy" | "verbs";

type Props = { onSelect: (game: Screen) => void };

export function LandingScreen({ onSelect }: Props) {
  return (
    <div className="game-select-grid">
      <div className="game-select-card">
        <h2 className="game-select-title">Spot the redundant word</h2>
        <p className="game-select-desc">
          Find the word that adds nothing to a sentence.
        </p>
        <button
          type="button"
          className="nav-button primary"
          onClick={() => onSelect("redundancy")}
        >
          Play
        </button>
      </div>

      <div className="game-select-card">
        <h2 className="game-select-title">Spot the hidden verb</h2>
        <p className="game-select-desc">
          Find the verb that is hiding as a noun.
        </p>
        <button
          type="button"
          className="nav-button primary"
          onClick={() => onSelect("verbs")}
        >
          Play
        </button>
      </div>
    </div>
  );
}
