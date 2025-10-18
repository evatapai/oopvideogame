interface ExperienceCircleProps {
  level: number;
  experience: number;
  experienceToNextLevel: number;
}

export const ExperienceCircle = ({ level, experience, experienceToNextLevel }: ExperienceCircleProps) => {
  const progress = experience / experienceToNextLevel;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div
      style={{
        position: 'relative',
        width: '120px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width="120"
        height="120"
        style={{
          transform: 'rotate(-90deg)',
          position: 'absolute',
        }}
      >
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="10"
        />
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="url(#xpGradient)"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.3s ease',
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#6fe0a6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4fc3f7', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>

      {/* Level text in center */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#fff',
            lineHeight: '1',
            marginBottom: '2px',
          }}
        >
          {level}
        </div>
        <div
          style={{
            fontSize: '10px',
            color: 'rgba(255, 255, 255, 0.7)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Level
        </div>
        <div
          style={{
            fontSize: '9px',
            color: 'rgba(255, 255, 255, 0.5)',
            marginTop: '2px',
          }}
        >
          {experience}/{experienceToNextLevel}
        </div>
      </div>
    </div>
  );
};
