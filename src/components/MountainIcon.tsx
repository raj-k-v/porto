import React, { useEffect, useRef, Suspense, useState } from 'react';
import Spline from '@splinetool/react-spline';

const EGO_COMMENTS = [
  "My bento grid is cleaner than your future.",
  "I curated this tech stack. You're welcome.",
  "The code here is so optimized it's actually insulting.",
  "You're scrolling too fast. My high-fidelity clouds deserve better.",
  "I'm the only reason this site hasn't crashed from your browsing.",
  "Look, but don't touch. My shaders are delicate.",
  "I've calculated your scrolling patterns. Predictable."
];

const MEAN_COMMENTS = [
  "Ew. Fingerprints.",
  "Stop. You're getting oily pixels on me.",
  "Do you mind? I'm processing something actually important.",
  "Error 404: My patience for you not found.",
  "Go click on a button or something. Leave me alone.",
  "I'm reporting this harassment to the mainframe.",
  "Your cursor is remarkably clumsy."
];

function MountainIcon({ onClick }: { onClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<any>(null);
  const headRef = useRef<any>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  // Using any to avoid NodeJS.Timeout vs Browser Timeout issues in different environments
  const scrollTimer = useRef<any>(null);
  const messageTimer = useRef<any>(null);
  const tripleClickTimer = useRef<any>(null);

  const verticalOffset = useRef(0);
  const targetVerticalOffset = useRef(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const isPissed = useRef(false);
  const clickCount = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const updateLoop = () => {
      if (headRef.current) {
        const targetRY = mousePos.current.x * 1.2;
        const targetRX = -mousePos.current.y * 1.0;
        const targetRZ = mousePos.current.x * 0.4;

        headRef.current.rotation.y += (targetRY - headRef.current.rotation.y) * 0.15;
        headRef.current.rotation.x += (targetRX - headRef.current.rotation.x) * 0.15;
        headRef.current.rotation.z += (targetRZ - headRef.current.rotation.z) * 0.15;
      }

      verticalOffset.current += (targetVerticalOffset.current - verticalOffset.current) * 0.1;
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(${verticalOffset.current}px)`;
      }

      frameRef.current = requestAnimationFrame(updateLoop);
    };

    const handleScroll = () => {
      if (!isPissed.current) {
        targetVerticalOffset.current = 60;
        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => {
          targetVerticalOffset.current = 0;
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, true);
    frameRef.current = requestAnimationFrame(updateLoop);

    const startEgoCycle = () => {
      const delay = 5000 + Math.random() * 10000;
      messageTimer.current = setTimeout(() => {
        if (!isPissed.current && clickCount.current === 0) {
          const randomMsg = EGO_COMMENTS[Math.floor(Math.random() * EGO_COMMENTS.length)];
          setMessage(randomMsg);
          setTimeout(() => setMessage(""), 4500);
          startEgoCycle();
        } else if (!isPissed.current) {
          startEgoCycle();
        }
      }, delay);
    };
    startEgoCycle();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll, true);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      if (messageTimer.current) clearTimeout(messageTimer.current);
      if (tripleClickTimer.current) clearTimeout(tripleClickTimer.current);
    };
  }, []);

  function onLoad(spline: any) {
    splineRef.current = spline;
    try { if (spline.emitEvent) spline.emitEvent('stop'); } catch (e) { }
    headRef.current = spline.findObjectByName('Head') ||
      spline.findObjectByName('head') ||
      spline.findObjectByName('Robot') ||
      spline.findObjectByName('Group') ||
      spline.findObjectByName('Cube');
    setTimeout(() => setIsLoaded(true), 3000);
  }

  const handleRobotClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (tripleClickTimer.current) clearTimeout(tripleClickTimer.current);

    clickCount.current += 1;
    isPissed.current = true;
    targetVerticalOffset.current = 85;

    if (clickCount.current === 1) {
      const meanMsg = MEAN_COMMENTS[Math.floor(Math.random() * MEAN_COMMENTS.length)];
      setMessage(meanMsg);
    } else if (clickCount.current === 2) {
      setMessage("One more time and you'll have to answer to my big bro!");
    } else if (clickCount.current >= 3) {
      setMessage("Fine! Talk to him yourself.");
      window.dispatchEvent(new CustomEvent('openChatbot', { detail: { fromRobot: true } }));
      clickCount.current = 0;
    }

    // Reset logic
    tripleClickTimer.current = setTimeout(() => {
      isPissed.current = false;
      targetVerticalOffset.current = 0;
      setMessage("");
      clickCount.current = 0;
    }, 4000);
  };

  return (
    <div
      ref={containerRef}
      className={`mountain-return-btn ${isLoaded ? 'is-visible' : ''}`}
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        width: '120px',
        height: '120px',
        cursor: 'pointer',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        opacity: 0,
        willChange: 'transform, opacity',
      }}
    >
      {/* Speech Bubble */}
      <div className={`robot-speech-bubble ${message ? 'show' : ''}`}>
        <div className="bubble-content">{message}</div>
        <div className="bubble-arrow" />
      </div>

      <div
        onClick={handleRobotClick}
        style={{
          width: '380%',
          height: '380%',
          position: 'absolute',
          top: '-65%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
          filter: 'contrast(1.1) brightness(1.1)',
        }}
      >
        <Suspense fallback={null}>
          <Spline
            scene="https://prod.spline.design/In8lU4-cJeafWYjC/scene.splinecode"
            onLoad={onLoad}
          />
        </Suspense>
      </div>

      <style>{`
        .mountain-return-btn {
          transition: opacity 1.5s ease-out !important;
        }
        .mountain-return-btn.is-visible {
          opacity: 1 !important;
        }
        
        .robot-speech-bubble {
          position: absolute;
          bottom: 115%;
          left: 50%;
          transform: translateX(-50%) translateY(15px) scale(0.9);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), 
                      opacity 0.5s ease-out;
          width: 200px;
          z-index: 10000;
          will-change: transform, opacity;
        }

        .robot-speech-bubble.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        .bubble-content {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 12px 16px;
          border-radius: 20px;
          color: white;
          font-size: 0.75rem;
          font-weight: 500;
          line-height: 1.4;
          text-align: center;
          box-shadow: 0 15px 45px rgba(0,0,0,0.5);
          font-family: var(--font-mono);
          border-bottom-left-radius: 4px;
        }

        .bubble-arrow {
          position: absolute;
          top: 100%;
          left: 20px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid rgba(255, 255, 255, 0.2);
        }

        canvas {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}

export default React.memo(MountainIcon);
