import { useState } from "react";
import { Game } from "./components/Game";
import { HUD } from "./components/HUD";
import { ExperienceCircle } from "./components/ExperienceCircle";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [weaponName, setWeaponName] = useState("Wand");
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(100);

  const handleExperienceChange = (newLevel: number, newExp: number, newExpToNext: number) => {
    setLevel(newLevel);
    setExperience(newExp);
    setExperienceToNextLevel(newExpToNext);
  };

  return (
    <div id="wrap">
      <header>
        <h1>OOP Game Showcase — Video Arena</h1>
        <HUD weaponName={weaponName} score={score} wave={wave} />
      </header>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <ExperienceCircle
          level={level}
          experience={experience}
          experienceToNextLevel={experienceToNextLevel}
        />
        <Game
          onScoreChange={setScore}
          onWaveChange={setWave}
          onWeaponChange={setWeaponName}
          onExperienceChange={handleExperienceChange}
        />
      </div>
    </div>
  );
}

export default App;
