import React, { useRef } from 'react';
import gsap from 'gsap';

interface PortalProps {
  size?: number;
  onClick?: () => void;
  onHoverChange?: (hovering: boolean) => void;
}

export default function Portal({ size = 120, onClick, onHoverChange }: PortalProps) {
  const portalRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const hoverWrapperRef = useRef<HTMLDivElement>(null);
  const pulseTween = useRef<gsap.core.Tween | null>(null);

  React.useEffect(() => {
    if (hoverWrapperRef.current) {
      pulseTween.current = gsap.to(hoverWrapperRef.current, {
        scale: 1.35,
        filter: 'brightness(1.5) drop-shadow(0 0 30px rgba(255,255,255,0.6))',
        duration: 0.9,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        paused: true
      });
    }
    return () => { pulseTween.current?.kill(); };
  }, []);

  const handleMouseEnter = () => {
    if (onHoverChange) onHoverChange(true);
    gsap.killTweensOf(hoverWrapperRef.current);
    gsap.to(hoverWrapperRef.current, {
      scale: 1.15,
      filter: 'brightness(1.2) drop-shadow(0 0 15px rgba(255,255,255,0.3))',
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => pulseTween.current?.play()
    });
  };

  const handleMouseLeave = () => {
    if (onHoverChange) onHoverChange(false);
    pulseTween.current?.pause();
    gsap.killTweensOf(hoverWrapperRef.current);
    gsap.to(hoverWrapperRef.current, {
      scale: 1,
      filter: 'brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))',
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
      overwrite: true
    });
  };

  const handlePortalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onClick) return;

    if (portalRef.current && innerRef.current) {
      const portal = portalRef.current;
      const inner = innerRef.current;
      const container = portal.parentElement;
      
      // Capture initial position and center point for expansion origin
      const rect = portal.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const tl = gsap.timeline({
        onComplete: () => {
          onClick();
          // Reset after transition
          setTimeout(() => {
            gsap.set([portal, inner], { clearProps: 'all' });
            if (container) container.style.zIndex = '5';
          }, 1500);
        }
      });

      // 1. Initial "Surge": Portal brightens and pulsates
      tl.to(portal, {
        filter: 'brightness(3) contrast(1.5)',
        scale: 1.4,
        duration: 0.4,
        ease: "power2.out"
      });

      // 2. The "Blast": The black core erupts within the blob
      tl.to(inner, {
        inset: '-20%',
        duration: 0.3,
        ease: "power2.in"
      }, "-=0.2");

      // 3. THE GLOBAL SINGULARITY ERUPTION
      // We create a fresh, clean overlay to avoid any CSS conflicts with the portal blob
      const overlay = document.createElement('div');
      Object.assign(overlay.style, {
        position: 'fixed',
        top: `${centerY}px`,
        left: `${centerX}px`,
        width: '2px',
        height: '2px',
        background: '#000',
        borderRadius: '50%',
        zIndex: '999999',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      });
      document.body.appendChild(overlay);

      tl.to(overlay, {
        width: '300vmax',
        height: '300vmax',
        duration: 1.0,
        ease: "expo.in",
        onStart: () => {
          // Hide singularity lines right as overlay covers them
          const lines = portal.querySelectorAll('.portal-line-v, .portal-line-h');
          lines.forEach(l => (l as HTMLElement).style.opacity = '0');
        }
      }, "-=0.1");

      // Seamlessly hide the portal as the overlay consumes it
      tl.to(portal, {
        opacity: 0,
        duration: 0.2
      }, "-=0.9");

      // Final reveal: fade out the overlay after page change
      tl.to(overlay, {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        onComplete: () => overlay.remove()
      });
    } else {
      onClick();
    }
  };

  return (
    <div 
      className="portal-container"
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        zIndex: 5,
        pointerEvents: 'none' // Disable clicks on outer area
      }}
    >
      {/* Hover Pulse Wrapper */}
      <div ref={hoverWrapperRef} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Portal Energy Blob */}
        <div 
        ref={portalRef}
        className="portal-blob"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, #fff 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.2) 60%, transparent 80%)',
          boxShadow: '0 0 50px rgba(255, 255, 255, 0.4)',
          mixBlendMode: 'screen'
        }}
      >
        {/* Vertical Singularity Line */}
        <div className="portal-line-v" style={{
          position: 'absolute',
          top: '-100%',
          bottom: '-100%',
          left: '50%',
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, #fff 20%, #fff 80%, transparent)',
          transform: 'translateX(-50%)',
          boxShadow: '0 0 20px #fff, 0 0 40px rgba(255,255,255,0.5)',
          opacity: 0.8,
          zIndex: 1
        }} />

        {/* Horizontal Singularity Line */}
        <div className="portal-line-h" style={{
          position: 'absolute',
          left: '-100%',
          right: '-100%',
          top: '50%',
          height: '2px',
          background: 'linear-gradient(to right, transparent, #fff 20%, #fff 80%, transparent)',
          transform: 'translateY(-50%)',
          boxShadow: '0 0 20px #fff, 0 0 40px rgba(255,255,255,0.5)',
          opacity: 0.8,
          zIndex: 1
        }} />

        <div 
          ref={innerRef}
          className="blob-inner" 
          onClick={handlePortalClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'absolute',
            inset: '10%', // Larger black core
            background: '#000',
            borderRadius: 'inherit',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 15px rgba(255,255,255,0.1)',
            zIndex: 10,
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            pointerEvents: 'auto' // Re-enable interaction ONLY for the core
          }} 
        />
      </div>
      </div>

      <style>{`
        .portal-blob {
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          background: radial-gradient(circle at center, #fff 0%, #ddd 20%, #999 50%, transparent 80%);
          animation: 
            blob-morph 4s ease-in-out infinite, 
            blob-sway 6s ease-in-out infinite,
            energy-swell 6s ease-in-out infinite;
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 50px rgba(255, 255, 255, 0.2);
          mix-blend-mode: screen;
          will-change: transform, border-radius, filter;
        }

        .blob-inner {
          animation: blob-morph 4s ease-in-out infinite reverse;
          will-change: border-radius;
        }

        @keyframes blob-morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          33% { border-radius: 40% 60% 50% 50% / 50% 40% 60% 40%; }
          66% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }

        @keyframes blob-sway {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(-3px, 4px) rotate(1deg) scale(1.02); }
          50% { transform: translate(4px, -2px) rotate(-1deg) scale(0.98); }
          75% { transform: translate(-2px, -3px) rotate(0.5deg) scale(1.01); }
        }

        @keyframes energy-swell {
          0%, 100% { filter: brightness(1) contrast(1); box-shadow: 0 0 40px rgba(255, 255, 255, 0.2); }
          50% { filter: brightness(1.5) contrast(1.2); box-shadow: 0 0 80px rgba(255, 255, 255, 0.5); }
        }

        .portal-line-v, .portal-line-h {
          animation: line-pulse 3s ease-in-out infinite;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .portal-container:hover .portal-line-v, 
        .portal-container:hover .portal-line-h {
          opacity: 1;
          filter: brightness(1.8);
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.6);
        }

        @keyframes line-pulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, 0) scaleX(1); }
          50% { opacity: 0.3; transform: translate(-50%, 0) scaleX(1.15); }
        }
        
        .portal-line-h {
          animation: line-pulse-h 3s ease-in-out infinite;
        }
        
        @keyframes line-pulse-h {
          0%, 100% { opacity: 0.8; transform: translate(0, -50%) scaleY(1); }
          50% { opacity: 0.3; transform: translate(0, -50%) scaleY(1.15); }
        }
      `}</style>
    </div>
  );
}
