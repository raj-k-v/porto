import { useState, useRef } from 'react';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Chatbot from './components/Chatbot';
import WebGLScene from './components/WebGLScene';
import { gsap } from 'gsap';

function App() {
  const [view, setView] = useState<'landing' | 'home'>('landing');
  const [accentColor, setAccentColor] = useState('#ffffff');
  const [showBgImage, setShowBgImage] = useState(true);
  const [isInverted, setIsInverted] = useState(false);

  const bgRef = useRef<HTMLDivElement>(null);

  const handlePortalClick = () => {
    setView('home');

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        filter: 'blur(0px) brightness(1)',
        duration: 1.5,
        ease: "power2.out"
      });
    }
  };

  const handleReturnToLanding = () => {
    // Set initial blur for return
    if (bgRef.current) {
      gsap.set(bgRef.current, { filter: 'blur(15px) brightness(1.05)' });
    }

    setTimeout(() => {
      setView('landing');

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          filter: 'blur(0px) brightness(1)',
          duration: 1.5,
          ease: "power2.out"
        });
      }
    }, 300);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#000',
      filter: view === 'landing' && isInverted ? 'invert(1) hue-rotate(180deg) contrast(1.2)' : 'none',
      transition: 'filter 0.8s cubic-bezier(0.2, 1, 0.3, 1)'
    }}>
      {/* Background Layer (Handles Filters & Scenery) */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(0px) brightness(1)',
          zIndex: 0,
          opacity: showBgImage ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
      />

      {/* WebGL Persistent Background (Always On) */}
      <WebGLScene
        accentColor={view === 'landing' ? '#ffffff' : accentColor}
        showParticles={!showBgImage}
        showGrid={!showBgImage}
      />

      {/* Dynamic Bottom Vignette (Renders as black when inverted) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '45vh',
          background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: (view === 'landing' && isInverted) ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.2, 1, 0.3, 1)'
        }}
      />

      {/* Content Layer (Stays Crisp) */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        {view === 'landing' ? (
          <Landing
            onPortalClick={handlePortalClick}
            accentColor={accentColor}
            showBgImage={showBgImage}
            setShowBgImage={setShowBgImage}
            isInverted={isInverted}
            setIsInverted={setIsInverted}
          />
        ) : (
          <Home
            onReturn={handleReturnToLanding}
            onColorChange={setAccentColor}
            showBgImage={showBgImage}
            setShowBgImage={setShowBgImage}
          />
        )}
      </div>

      {/* UI Elements */}
      <Chatbot />

      {/* SVG Filters for Chromatic Aberration & Liquid Distortion */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="sexyTransition">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="red" />
          <feOffset in="red" dx="5" dy="0" result="redOffset" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
          <feOffset in="blue" dx="-5" dy="0" result="blueOffset" />
          <feBlend in="redOffset" in2="blueOffset" mode="screen" />

          <feDisplacementMap in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" id="displacementMap" />
        </filter>
      </svg>
    </div>
  );
}

export default App;
