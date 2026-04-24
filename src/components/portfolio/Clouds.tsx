import React from 'react';

export const Clouds: React.FC = () => {
  return (
    <>
      <style>{`
        .accent-cloud {
          position: fixed;
          background: var(--accent-color);
          filter: blur(60px);
          border-radius: 50%;
          z-index: -1;
          pointer-events: none;
          animation: cloud-float 20s infinite alternate ease-in-out;
          transition: background 1.5s ease, opacity 0.5s ease;
        }

        @keyframes cloud-float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, 40px) scale(1.1); }
        }
      `}</style>

      {/* Atmospheric Clouds - Right Side */}
      <div className="accent-cloud" style={{ top: '10%', right: '5%', width: '500px', height: '300px', opacity: 0.15 }} />
      <div className="accent-cloud" style={{ top: '25%', right: '15%', width: '400px', height: '200px', animationDelay: '-5s', opacity: 0.12 }} />
      <div className="accent-cloud" style={{ top: '-5%', right: '30%', width: '600px', height: '400px', animationDelay: '-10s', opacity: 0.1 }} />
      
      {/* Atmospheric Clouds - Left Side */}
      <div className="accent-cloud" style={{ top: '40%', left: '5%', width: '600px', height: '400px', animationDelay: '-7s', opacity: 0.1 }} />
      <div className="accent-cloud" style={{ top: '15%', left: '20%', width: '400px', height: '300px', animationDelay: '-12s', opacity: 0.12 }} />
      
      {/* Atmospheric Clouds - Center & Bottom */}
      <div className="accent-cloud" style={{ top: '60%', left: '30%', width: '700px', height: '500px', animationDelay: '-15s', opacity: 0.08 }} />
      <div className="accent-cloud" style={{ bottom: '10%', right: '10%', width: '500px', height: '300px', animationDelay: '-3s', opacity: 0.12 }} />
      <div className="accent-cloud" style={{ bottom: '-10%', left: '10%', width: '800px', height: '600px', animationDelay: '-18s', opacity: 0.08 }} />
    </>
  );
};
