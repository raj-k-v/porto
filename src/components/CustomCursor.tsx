import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === 'pointer' || 
                        target.closest('button') || 
                        target.closest('a');
      
      isHovering = !!isPointer;
      
      // Update position with current scale
      cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 3}px) scale(${isHovering ? 1.5 : 1})`;
    };

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  // A path with explicit cubic bezier curves for smooth rounded corners
  const roundedPath = "M10.8 28.8c-1.3 0-2.4-1.1-2.4-2.4V5.6c0-1.8 2.1-2.8 3.4-1.5l14.4 14.4c1.2 1.2 0.4 3.2-1.3 3.2h-7.6l-3.6 5.4c-.9 1.1-2 1.6-2.9 1.6z";
  const size = 24;
  const maskUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 32 32'%3E%3Cpath d='${roundedPath}' fill='white' /%3E%3C/svg%3E")`;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
      }}
    >
      {/* Liquid Glass Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          maskImage: maskUrl,
          WebkitMaskImage: maskUrl,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          boxShadow: 'inset 0 0 5px rgba(255, 255, 255, 0.5)',
        }}
      />
      
      {/* Border and Depth Layer */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        style={{
          position: 'absolute',
          inset: 0,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
        }}
      >
        <path
          d={roundedPath}
          fill="rgba(255, 255, 255, 0.05)"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
