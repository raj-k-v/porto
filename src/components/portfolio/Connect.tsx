import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';

export const Connect: React.FC = () => {
  const scrollToTop = () => {
    const container = document.querySelector('.portfolio-home');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="connect-section" style={{
      marginTop: '120px',
      marginBottom: '80px',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      paddingTop: '80px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '40px',
      flexWrap: 'wrap'
    }}>
      <div style={{ flex: '1', minWidth: '300px' }}>
        <div className="section-label">GET IN TOUCH</div>
        
        <div style={{ 
          fontFamily: 'var(--font-sans)', 
          fontWeight: 800, 
          fontSize: '1.2rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em', 
          color: 'rgba(255,255,255,0.3)',
          marginBottom: '8px'
        }}>
          LET'S
        </div>
        
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
          fontWeight: 400,
          background: 'var(--accent-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 32px 0',
          lineHeight: '1.1'
        }}>
          Connect
        </h2>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.6',
          color: 'rgba(255, 255, 255, 0.5)',
          maxWidth: '450px',
          margin: 0
        }}>
          I am eager to connect and build something impactful. Whether it's systems engineering or agentic AI — let's talk.
        </p>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100%',
        gap: '60px'
      }}>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link">
            <div className="icon-circle"><GithubIcon size={20} /></div>
            <span>GITHUB</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link">
            <div className="icon-circle"><LinkedinIcon size={20} /></div>
            <span>LINKEDIN</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">
            <div className="icon-circle"><InstagramIcon size={20} /></div>
            <span>INSTAGRAM</span>
          </a>
        </div>

        <button 
          onClick={scrollToTop}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.2em',
            transition: 'all 0.3s'
          }}
          className="back-to-top"
        >
          BACK TO TOP
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ArrowUp size={14} />
          </div>
        </button>
      </div>

      <style>{`
        .social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.4);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
        }
        
        .social-link:hover {
          color: #fff;
          transform: translateY(-2px);
        }

        .social-link .icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .social-link:hover .icon-circle {
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
        }

        .back-to-top:hover {
          color: #fff;
          opacity: 1;
        }
        
        .back-to-top:hover div {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 768px) {
          .connect-section {
            flex-direction: column;
            align-items: flex-start;
          }
          .connect-section > div:last-child {
            align-items: flex-start;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  );
};
