import React, { useCallback, useState, useEffect } from 'react';
import Portal from './Portal';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

function ScrambledTextRing({ isHovered }: { isHovered: boolean }) {
  const [displayText, setDisplayText] = useState(
    "Raj Verma's Portfolio • Raj Verma's Portfolio • Raj Verma's Portfolio • Raj Verma's Portfolio • Raj Verma's Portfolio • ".split('')
  );

  const targetText = isHovered 
    ? "Click To Experience •   Click To Experience •   Click To Experience •   Click To Experience •   Click To Experience •   " 
    : "Raj Verma's Portfolio • Raj Verma's Portfolio • Raj Verma's Portfolio • Raj Verma's Portfolio • Raj Verma's Portfolio • ";

  useEffect(() => {
    let frame = 0;
    const maxFrames = 8; // Faster burst (approx 130ms)
    let animId: number;
    const target = targetText;

    const tick = () => {
      frame++;
      const progress = frame / maxFrames;

      setDisplayText(() => {
        const next = new Array(target.length);
        for (let i = 0; i < target.length; i++) {
          if (frame >= maxFrames) {
            next[i] = target[i];
          } else {
            // Smoothly increase the chance of resolving the correct character as frames progress
            if (Math.random() < progress) {
              next[i] = target[i];
            } else {
              next[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          }
        }
        return next;
      });

      if (frame < maxFrames) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [targetText]);

  return (
    <div className="orbit-text-ring">
      {displayText.map((char, i, arr) => (
        <span 
          key={i} 
          className={`orbit-char ${isHovered ? 'glitch-fx' : ''}`} 
          style={{ 
            "--index": i,
            "--total": arr.length,
          } as React.CSSProperties}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

interface BeaconProps {
  left: string;
  bottom: string;
  onClick?: () => void;
}

export default function Beacon({ left, bottom, onClick }: BeaconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      className="beacon-wrap"
      style={{ left, bottom }}
    >
      {/* Dense Cloud Cluster EXACTLY on the mountain peak */}
      <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
        <div 
          className="cloud" 
          style={{ 
            position: 'absolute',
            bottom: '-100px', // Center it vertically on the peak
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse at center, rgba(200, 200, 200, 0.4) 0%, transparent 75%)',
            filter: 'blur(50px)',
            opacity: 0.9,
            zIndex: 1
          }} 
        />
        <div 
          className="cloud" 
          style={{ 
            position: 'absolute',
            bottom: '-60px',
            left: '30%',
            transform: 'translateX(-50%)',
            width: '450px',
            height: '220px',
            background: 'radial-gradient(ellipse at center, rgba(220, 220, 220, 0.3) 0%, transparent 75%)',
            filter: 'blur(40px)',
            opacity: 0.7,
            zIndex: 2
          }} 
        />
        <div 
          className="cloud" 
          style={{ 
            position: 'absolute',
            bottom: '-80px',
            left: '70%',
            transform: 'translateX(-50%)',
            width: '500px',
            height: '250px',
            background: 'radial-gradient(ellipse at center, rgba(180, 180, 180, 0.3) 0%, transparent 75%)',
            filter: 'blur(55px)',
            opacity: 0.6,
            zIndex: 0
          }} 
        />
      </div>

      {/* Dense Dark Clouds around the peak */}
      <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
        <div className="cloud" style={{ position: 'absolute', bottom: '-40px', left: '-200px', width: '400px', height: '200px', background: 'radial-gradient(ellipse at center, rgba(20, 20, 20, 0.7) 0%, transparent 80%)', filter: 'blur(40px)', zIndex: 0 }} />
        <div className="cloud" style={{ position: 'absolute', bottom: '-20px', left: '200px', width: '450px', height: '220px', background: 'radial-gradient(ellipse at center, rgba(30, 30, 30, 0.6) 0%, transparent 80%)', filter: 'blur(45px)', zIndex: 0 }} />
      </div>

      {/* The Portal Component and Orbit Ring */}
      <div 
        style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', zIndex: 5, transformStyle: 'preserve-3d' }}
      >
        <div className="portal-cross-flare" />
        
        <Portal 
          size={90} 
          onClick={onClick} 
          onHoverChange={(hovering) => {
            if (hovering) handleMouseEnter();
            else handleMouseLeave();
          }}
        />

        <ScrambledTextRing isHovered={isHovered} />
      </div>

      <div className="beacon-bubbles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`bubble b${i + 1}`} />
        ))}
      </div>

      {/* 3D Energy Spiral */}
      <div className="energy-spiral">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="spiral-particle" 
            style={{ 
              "--index": i,
              "--total": 12,
              "animationDelay": `-${i * 0.2}s`
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="beacon-particles" />

      <style>{`
        .portal-cross-flare {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          z-index: -1;
          pointer-events: none;
        }
        .portal-cross-flare::before, .portal-cross-flare::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.15) 40%, transparent 70%);
          mix-blend-mode: screen;
          filter: blur(2px);
        }
        .portal-cross-flare::before {
          width: 600px;
          height: 2px;
        }
        .portal-cross-flare::after {
          width: 2px;
          height: 600px;
        }

        .orbit-text-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          transform: rotateX(75deg);
          animation: ring-spin 40s linear infinite;
          pointer-events: none;
          z-index: 10;
        }

        .orbit-char {
          position: absolute;
          left: 50%;
          top: 50%;
          color: rgba(255, 255, 255, 0.95);
          font-family: var(--font-serif);
          font-size: 14px;
          font-style: italic;
          font-weight: 400;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4);
          transform: translate(-50%, -50%) rotateZ(calc(var(--index) * -360deg / var(--total))) translateY(-160px) rotateX(90deg) rotateZ(180deg);
          transform-origin: center;
          will-change: transform;
          backface-visibility: visible;
        }

        .orbit-char.glitch-fx {
          animation: text-glitch-color 0.2s linear infinite;
        }

        @keyframes text-glitch-color {
          0% { color: #fff; opacity: 1; text-shadow: -3px 0 rgba(255,255,255,0.8), 3px 0 rgba(100,100,100,0.5); }
          25% { color: #ddd; opacity: 0.6; text-shadow: 2px 0 rgba(200,200,200,0.9), -2px 0 rgba(255,255,255,0.4); }
          50% { color: #fff; opacity: 1; text-shadow: -1px 0 rgba(150,150,150,0.8), 1px 0 rgba(255,255,255,0.7); }
          75% { color: #ccc; opacity: 0.4; text-shadow: 4px 0 rgba(255,255,255,0.6), -4px 0 rgba(50,50,50,0.8); }
          100% { color: #fff; opacity: 1; text-shadow: -3px 0 rgba(255,255,255,0.8), 3px 0 rgba(100,100,100,0.5); }
        }

        @keyframes ring-spin {
          0% { transform: rotateX(75deg) rotateZ(0deg); }
          100% { transform: rotateX(75deg) rotateZ(-360deg); }
        }
      `}</style>
    </div>
  );
}
