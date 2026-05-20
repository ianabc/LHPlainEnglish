type Screen = "redundancy" | "nominalization";

type Props = { onSelect: (game: Screen) => void };

export function LandingScreen({ onSelect }: Props) {
  return (
    <div className="game-select-grid">
      <div className="game-select-card">
        <h2 className="game-select-title">Spot the redundant word</h2>
        <p className="game-select-desc">
          Click the word in each sentence that adds nothing — because the meaning is already
          carried by another word.
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
          Find the verb that has been turned into a noun — then choose it from the options
          shown.
        </p>
        <button
          type="button"
          className="nav-button primary"
          onClick={() => onSelect("nominalization")}
        >
          Play
        </button>
      </div>
    </div>
  );
}
