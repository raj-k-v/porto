import { useEffect, useRef } from 'react';
import Beacon from '../components/Beacon';
import Clouds from '../components/Clouds';
import { gsap } from 'gsap';

interface LandingProps {
  onPortalClick: () => void;
}

export default function Landing({ onPortalClick }: LandingProps) {
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
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <Beacon left="49%" bottom="53%" onClick={onPortalClick} />
      <Clouds />
    </div>
  );
}
