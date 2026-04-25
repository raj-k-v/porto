import React from 'react';

export const Clouds: React.FC = () => {
  return (
    <>
      <style>{`
        .accent-cloud {
          position: fixed;
          z-index: -1;
          pointer-events: none;
          animation: cloud-float 20s infinite alternate ease-in-out;
          transition: opacity 0.5s ease;
          transform: translateZ(0);
          will-change: transform;
        }

        .accent-cloud::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--accent-color);
          filter: blur(60px);
          border-radius: 50%;
          transition: background 1.5s ease;
          transform: translateZ(0);
        }

        @keyframes cloud-float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, 40px) scale(1.1); }
        }
      `}</style>

      {/* Atmospheric Clouds - Reduced count for performance */}
      <div className="accent-cloud" style={{ top: '10%', right: '5%', width: '500px', height: '300px', opacity: 0.15 }} />
      <div className="accent-cloud" style={{ top: '-5%', right: '30%', width: '600px', height: '400px', animationDelay: '-10s', opacity: 0.1 }} />
      <div className="accent-cloud" style={{ top: '40%', left: '5%', width: '600px', height: '400px', animationDelay: '-7s', opacity: 0.1 }} />
      <div className="accent-cloud" style={{ bottom: '10%', right: '10%', width: '500px', height: '300px', animationDelay: '-3s', opacity: 0.12 }} />
    </>
  );
};
