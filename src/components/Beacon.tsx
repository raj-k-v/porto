import { useRef, useCallback } from 'react';
import Portal from './Portal';

interface BeaconProps {
  left: string;
  bottom: string;
  onClick?: () => void;
}

export default function Beacon({ left, bottom, onClick }: BeaconProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/hover.wav');
      audioRef.current.preload = 'auto';
    }

    // Reset and play with a fresh promise handle
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.volume = 0.5;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was prevented — this is normal if the user hasn't clicked the page yet
        console.log("Audio playback prevented by browser policy.");
      });
    }
  }, []);

  return (
    <div
      className="beacon-wrap"
      style={{ left, bottom }}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
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

      {/* The Portal Component */}
      <div 
        style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', zIndex: 5 }}
      >
        <Portal size={90} onClick={onClick} />
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
    </div>
  );
}
