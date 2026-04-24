import React, { useRef } from 'react';
import gsap from 'gsap';

interface PortalProps {
  size?: number;
  onClick?: () => void;
}

export default function Portal({ size = 120, onClick }: PortalProps) {
  const portalRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

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
      onClick={handlePortalClick}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 5
      }}
    >
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
          style={{
            position: 'absolute',
            inset: '10%', // Larger black core
            background: '#000',
            borderRadius: 'inherit',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 15px rgba(255,255,255,0.1)',
            zIndex: 10,
            border: '1px solid rgba(255,255,255,0.1)'
          }} 
        />
      </div>

      <style>{`
        .portal-container:hover .portal-blob {
          animation: 
            blob-morph 1.5s ease-in-out infinite, 
            blob-liquid-pulse 1.2s ease-in-out infinite,
            energy-liquid 1.2s ease-in-out infinite;
          filter: brightness(1.4) contrast(1.1);
          cursor: pointer;
        }

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

        @keyframes blob-liquid-pulse {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.35); }
        }

        @keyframes energy-swell {
          0%, 100% { filter: brightness(1) contrast(1); box-shadow: 0 0 40px rgba(255, 255, 255, 0.2); }
          50% { filter: brightness(1.5) contrast(1.2); box-shadow: 0 0 80px rgba(255, 255, 255, 0.5); }
        }

        @keyframes energy-liquid {
          0%, 100% { filter: brightness(1.2) contrast(1.1); box-shadow: 0 0 60px rgba(255, 255, 255, 0.4); }
          50% { filter: brightness(2) contrast(1.3); box-shadow: 0 0 130px rgba(255, 255, 255, 0.8); }
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
