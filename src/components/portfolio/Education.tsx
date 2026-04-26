import React from 'react';

export const Education: React.FC = () => {
  return (
    <div style={{ marginBottom: '100px' }}>
      <div
        className="education-card"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '48px 60px',
          gap: '20px',
          borderRadius: '32px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          willChange: 'transform'
        }}
      >
        {/* Decorative Side Ruler */}
        <div style={{
          position: 'absolute',
          left: '12px',
          top: '40px',
          bottom: '40px',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '10px 0'
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ width: '4px', height: '1px', background: 'rgba(255,255,255,0.2)', marginLeft: '-1.5px' }} />
          ))}
        </div>

        {/* Left Label */}
        <div style={{
          width: '160px',
          flexShrink: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          opacity: 0.35,
          textTransform: 'uppercase',
          paddingLeft: '20px'
        }}>
          QUALIFICATION
        </div>

        {/* Center Content */}
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{
            fontSize: '2.4rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            marginBottom: '8px',
            color: '#fff',
            letterSpacing: '-0.03em'
          }}>
            Education
          </h3>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.6,
            marginBottom: '6px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 400
          }}>
            B.Tech CSE, KIIT (2024–2028)
          </p>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            opacity: 0.25,
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            ENROLLMENT ACTIVE
          </div>
        </div>

        {/* Vertical Divider - Hidden on small screens */}
        <div className="edu-divider" style={{
          height: '100px',
          width: '1px',
          background: 'rgba(255,255,255,0.08)',
        }} />

        {/* Stats Right */}
        <div style={{ display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'nowrap', flexShrink: 0 }}>
          {[
            { label: 'CGPA', val: '8.23' },
            { label: 'CLASS 12', val: '90%' },
            { label: 'CLASS 10', val: '93%' }
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center', minWidth: '80px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.12em',
                opacity: 0.3,
                marginBottom: '12px',
                textTransform: 'uppercase',
                fontWeight: 600
              }}>
                {stat.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.6rem',
                fontStyle: 'italic',
                opacity: 0.95,
                fontWeight: 400,
                letterSpacing: '-0.02em'
              }}>
                {stat.val}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) {
          .education-card { 
            flex-wrap: wrap !important;
            padding: 40px; 
            gap: 30px; 
          }
          .edu-divider { display: none; }
          .education-card > div:nth-child(2) { width: 100%; order: 1; margin-bottom: 20px; } /* Label */
          .education-card > div:nth-child(3) { width: 100%; order: 2; } /* Content */
          .education-card > div:last-child { width: 100%; order: 3; justify-content: flex-start; margin-top: 20px; } /* Stats */
        }
      `}</style>
    </div>
  );
};
