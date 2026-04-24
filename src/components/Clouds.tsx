
export default function Clouds() {
  return (
    <div className="clouds-container">
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="cloudy" x="-100%" y="-100%" width="300%" height="300%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.05" numOctaves="2" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" />
        </filter>
      </svg>

      <div className="clouds-orbit">
        <style>{`
          .clouds-container .cloud {
            background: radial-gradient(ellipse at center, var(--accent-color) 0%, transparent 90%);
            opacity: 0.08;
            mix-blend-mode: screen;
            border: 1px solid rgba(255, 255, 255, 0.03);
            box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.05);
            border-radius: 50%;
            filter: blur(80px); /* Lighter than SVG feTurbulence */
            will-change: transform;
          }
        `}</style>
        {/* Several realistic cloud layers */}
        <div className="cloud c1" />
        <div className="cloud c2" />
        <div className="cloud c3" />
        <div className="cloud c4" />
        <div className="cloud c5" style={{ top: '100px', left: '-200px', animationDelay: '-10s' }} />
        <div className="cloud c6" style={{ top: '-100px', left: '200px', animationDelay: '-15s' }} />
      </div>
    </div>
  );
}
