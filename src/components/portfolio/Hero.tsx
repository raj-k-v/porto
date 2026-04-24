import React from 'react';

interface HeroProps {
  handleEasterEggMove: (e: React.MouseEvent) => void;
  handleEasterEggLeave: () => void;
}

export const Hero: React.FC<HeroProps> = ({ handleEasterEggMove, handleEasterEggLeave }) => {
  return (
    <header style={{ 
      marginBottom: '100px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start',
      gap: '60px',
      flexWrap: 'wrap',
      paddingTop: '0px'
    }}>
      <div style={{ flex: '1 1 400px' }}>
        <a
          href="mailto:raj@example.com"
          className="available-badge"
          style={{ 
            marginBottom: '40px', 
            display: 'inline-flex'
          }}
        >
          <span className="available-dot" />
          Available for work · Reach out
        </a>

        <h1 className="minimal-name">
          <span style={{ fontStyle: 'italic' }}>Ra<span className="j-easter-egg" onMouseMove={handleEasterEggMove} onMouseLeave={handleEasterEggLeave}>j</span></span> V<span style={{ color: 'var(--accent-color)', marginLeft: '2px' }}>.</span>
        </h1>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '0.2em', opacity: 0.4, marginTop: '15px', textTransform: 'uppercase', fontWeight: 600 }}>
          Fullstack <span className="j-easter-egg" onMouseMove={handleEasterEggMove} onMouseLeave={handleEasterEggLeave}>Engineer</span> <span className="j-easter-egg" onMouseMove={handleEasterEggMove} onMouseLeave={handleEasterEggLeave}>&</span> UI Architect
        </div>
        <p style={{ 
          fontSize: '0.9rem', 
          opacity: 0.5, 
          marginTop: '40px', 
          fontWeight: 500,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.05em',
          maxWidth: '440px',
          lineHeight: 1.6,
          textTransform: 'uppercase'
        }}>
          I build things because I can’t tolerate inefficient systems.
        </p>
      </div>

      <div style={{ flex: '1 1 400px', maxWidth: '500px', paddingTop: '82px' }}>
        <div className="section-label">Engineering Focus</div>
        <p style={{ 
          fontSize: '1.3rem', 
          lineHeight: 1.5, 
          opacity: 0.8, 
          fontWeight: 400,
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          letterSpacing: '-0.01em',
          color: 'var(--text-primary)'
        }}>
          If something wastes time, creates friction, or scales poorly — I fix it with systems, not patches. I care about writing code that survives beyond demos.
        </p>
        <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {['Systems Arch', 'Applied AI', 'Motion Design'].map(s => (
            <span key={s} className="skill-tag" style={{ 
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.05em'
            }}>{s}</span>
          ))}
        </div>
      </div>
    </header>
  );
};
