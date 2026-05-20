import { useState } from "react";
import { LandingScreen } from "./LandingScreen";
import { RedundancyGame } from "./RedundancyGame";
import { VerbGame } from "./VerbGame";

type Screen = "home" | "redundancy" | "nominalization";

export function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const subtitle =
    screen === "redundancy"
      ? "Spot the redundant word to make each sentence cleaner and sharper."
      : screen === "nominalization"
      ? "Find the verb hiding as a noun and choose it from the options."
      : "Choose a game to start playing.";

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Lynsey's Plain Language Word Games</h1>
        <p className="subtitle">{subtitle}</p>
      </header>

      <main>
        {screen === "home" && (
          <LandingScreen onSelect={(game) => setScreen(game)} />
        )}
        {screen === "redundancy" && (
          <RedundancyGame onHome={() => setScreen("home")} />
        )}
        {screen === "nominalization" && (
          <VerbGame onHome={() => setScreen("home")} />
        )}

        {screen !== "home" && (
          <section className="footer-note">
            <p>
              You can add more examples to{" "}
              <code>
                <a href="https://github.com/ianabc/LHPlainEnglish/blob/main/src/data/examples.ts">
                  src/data/examples.ts
                </a>
              </code>{" "}
              to grow the game.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
