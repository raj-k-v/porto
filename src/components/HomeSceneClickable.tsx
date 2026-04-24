import React, { useRef } from 'react';
import gsap from 'gsap';

interface HomeSceneClickableProps {
  onClick: () => void;
}

export default function HomeSceneClickable({ onClick }: HomeSceneClickableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const [showFeedback, setShowFeedback] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Spread effect
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.transform = 'translate(-50%, -50%) scale(0)';
    overlay.style.width = '100vmax';
    overlay.style.height = '100vmax';
    overlay.style.background = '#0a0a0a'; // Dark greyish spread
    overlay.style.borderRadius = '50%';
    overlay.style.zIndex = '99999';
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);

    const tl = gsap.timeline({
      onComplete: () => {
        onClick(); // Go back to landing
        
        // Condense effect (happens as landing mounts)
        setTimeout(() => {
          gsap.to(overlay, {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => overlay.remove()
          });
        }, 150);
      }
    });

    tl.to(overlay, {
      scale: 1.5,
      duration: 0.8,
      ease: "power4.in"
    });

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.6
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: '30px',
        right: '30px',
        zIndex: 1000,
        cursor: 'pointer',
        padding: '10px',
        transition: 'all 0.4s cubic-bezier(0.2, 1, 0.3, 1)',
        opacity: 0.6
      }}
      className="home-scene-clickable"
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'scale(1.1)';
        setShowFeedback(true);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.6';
        e.currentTarget.style.transform = 'scale(1)';
        setShowFeedback(false);
      }}
    >
      <svg 
        ref={iconRef}
        width="48" 
        height="32" 
        viewBox="0 0 48 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }}
      >
        <path 
          d="M2 30L14 8L22 22L30 14L46 30H2Z" 
          fill="rgba(255,255,255,0.15)" 
          stroke="rgba(255,255,255,0.4)" 
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path 
          d="M8 30L18 12L28 26" 
          stroke="rgba(255,255,255,0.2)" 
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* "This takes you back" Feedback */}
      <div 
        style={{
          position: 'absolute',
          right: '110%',
          top: '50%',
          transform: `translateY(-50%) ${showFeedback ? 'translateX(0)' : 'translateX(10px)'}`,
          opacity: showFeedback ? 0.6 : 0,
          color: 'white',
          fontSize: '0.55rem',
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.4em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          transition: 'all 0.6s cubic-bezier(0.2, 1, 0.3, 1)',
          fontWeight: 500
        }}
      >
        this takes you back..
      </div>
      
      <style>{`
        .home-scene-clickable:hover svg path {
          stroke: rgba(255,255,255,0.8);
          fill: rgba(255,255,255,0.2);
          transition: all 0.4s ease;
        }
      `}</style>
    </div>
  );
}
