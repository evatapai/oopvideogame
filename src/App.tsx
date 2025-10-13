import { useState } from "react";
import { Game } from "./components/Game";
import { HUD } from "./components/HUD";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [weaponName, setWeaponName] = useState("Wand");

  return (
    <div id="wrap">
      <header>
        <h1>OOP Game Showcase — Video Arena</h1>
        <HUD weaponName={weaponName} score={score} wave={wave} />
      </header>
      <Game
        onScoreChange={setScore}
        onWaveChange={setWave}
        onWeaponChange={setWeaponName}
      />
    </div>
  );
}

export default App;
