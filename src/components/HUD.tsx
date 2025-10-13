interface HUDProps {
  weaponName: string;
  score: number;
  wave: number;
}

export const HUD = ({ weaponName, score, wave }: HUDProps) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        fontSize: '14px',
        opacity: 0.9,
      }}
    >
      <span className="pill">Move: WASD / Arrows</span>
      <span className="pill">Attack: Space</span>
      <span className="pill">Weapon: {weaponName}</span>
      <span className="pill">Score: {score}</span>
      <span className="pill">Wave: {wave}</span>
    </div>
  );
};
