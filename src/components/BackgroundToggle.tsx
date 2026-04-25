import React from 'react';

interface BackgroundToggleProps {
  showBgImage: boolean;
  setShowBgImage: (v: boolean) => void;
  accentColor: string;
  isFixed?: boolean;
}

const BackgroundToggle: React.FC<BackgroundToggleProps> = ({ 
  showBgImage, 
  setShowBgImage, 
  accentColor,
  isFixed = false
}) => {
  return (
    <div 
      onClick={() => setShowBgImage(!showBgImage)}
      style={{
        position: isFixed ? 'fixed' : 'absolute',
        top: '50%',
        right: '40px',
        transform: 'translateY(-50%)',
        zIndex: 100,
        width: '36px',
        height: '72px',
        borderRadius: '99px',
        cursor: 'pointer',
        background: showBgImage 
          ? `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}dd 100%)` 
          : 'linear-gradient(180deg, #111 0%, #222 100%)',
        border: `1px solid ${showBgImage ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5px',
        boxShadow: showBgImage 
          ? `0 0 30px ${accentColor}66, inset 0 2px 10px rgba(0,0,0,0.4)` 
          : '0 10px 40px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.05)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        e.currentTarget.style.filter = 'brightness(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
    >
      {/* Internal Track Detail */}
      <div style={{
        position: 'absolute',
        top: '12px',
        bottom: '12px',
        width: '2px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '1px',
        pointerEvents: 'none'
      }} />

      <div 
        style={{
          width: '26px',
          height: '26px',
          background: '#fff',
          borderRadius: '50%',
          boxShadow: showBgImage
            ? '0 5px 15px rgba(0,0,0,0.4), 0 0 20px #fff'
            : '0 5px 15px rgba(0,0,0,0.6)',
          transform: showBgImage ? 'translateY(0px)' : 'translateY(36px)',
          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Shine highlight on handle */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '40%',
          height: '40%',
          background: 'linear-gradient(135deg, #fff 0%, transparent 100%)',
          borderRadius: '50%',
          opacity: 0.8
        }} />

        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: showBgImage ? accentColor : '#333',
          transition: 'background 0.4s ease',
          boxShadow: showBgImage ? `0 0 8px ${accentColor}` : 'none',
          zIndex: 2
        }} />
      </div>
    </div>
  );
};

export default BackgroundToggle;
