import { useEffect, useRef } from 'react';
import Beacon from '../components/Beacon';
import Clouds from '../components/Clouds';
import BackgroundToggle from '../components/BackgroundToggle';
import { gsap } from 'gsap';

interface LandingProps {
  onPortalClick: () => void;
  accentColor: string;
  showBgImage: boolean;
  setShowBgImage: (v: boolean) => void;
  isInverted: boolean;
  setIsInverted: (v: boolean) => void;
}

export default function Landing({ 
  onPortalClick, 
  accentColor, 
  showBgImage, 
  setShowBgImage,
  isInverted,
  setIsInverted
}: LandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { scale: 1.1, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'expo.out' }
      );
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="page-landing" 
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <Beacon left="49%" bottom="53%" onClick={onPortalClick} />
      <Clouds />
      
      <BackgroundToggle 
        showBgImage={showBgImage} 
        setShowBgImage={setShowBgImage} 
        accentColor={accentColor} 
        isFixed={true}
      />

      <style>{`
        .invert-toggle-btn {
          position: absolute;
          left: 30px;
          top: 50%;
          transform: translateY(-50%);
          height: 50px;
          padding: 0 15px;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 0px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.02);
          color: white;
          overflow: hidden;
        }

        .invert-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.1);
          transform: translateY(-50%) scale(1.1);
        }

        .invert-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      <button
        className="invert-toggle-btn"
        onClick={() => setIsInverted(!isInverted)}
      >
        <div 
          className="invert-icon-wrapper" 
          style={{ transform: isInverted ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v20" />
            <path d="M12 2a10 10 0 0 1 0 20Z" fill={isInverted ? "none" : "currentColor"} />
          </svg>
        </div>
      </button>
    </div>
  );
}
