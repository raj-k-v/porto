import React from 'react';

export const ResumeSection: React.FC = () => {
  return (
    <div className="bento-item resume-section-card liquid-glass" style={{
      marginTop: '60px',
      marginBottom: '80px',
      padding: '60px 80px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '300px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '4.5rem',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          margin: 0,
          color: 'var(--text-primary)',
          textTransform: 'uppercase'
        }}>
          Raj <span style={{ opacity: 0.8 }}>V.</span>
        </h2>

        <a
          href="/resume.pdf"
          target="_blank"
          className="resume-button"
        >
          RESUME
        </a>
      </div>

      <div style={{
        marginTop: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        opacity: 0.4,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }}>
        <div>
          <div style={{ marginBottom: '8px', opacity: 0.6 }}>Current Location</div>
          <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Bhubaneswar, IN / UTC+5:30</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          © 2026 / RAJ V. / ALL SYSTEMS NOMINAL
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '8px', opacity: 0.6 }}>Availability</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', color: 'var(--text-primary)', fontWeight: 600 }}>
            Q3 2025 <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></span>
          </div>
        </div>
      </div>

      <style>{`
        .resume-section-card:hover {
          transform: translateY(-4px) !important;
        }
        .resume-button {
          background: var(--accent-pastel);
          color: #000;
          padding: 16px 40px;
          border-radius: 99px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.2, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .resume-button:hover {
          transform: scale(1.05);
          background: var(--accent-color);
          color: #000;
        }
      `}</style>
    </div>
  );
};
