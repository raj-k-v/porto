import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import MountainIcon from '../components/MountainIcon';

// New separated components
import { Hero } from '../components/portfolio/Hero';
import { TechStack } from '../components/portfolio/TechStack';
import { Projects } from '../components/portfolio/Projects';
import { ResumeSection } from '../components/portfolio/ResumeSection';
import { Connect } from '../components/portfolio/Connect';
import { Footer } from '../components/portfolio/Footer';
import Clouds from '../components/Clouds';
import HomeSceneClickable from '../components/HomeSceneClickable';

const themeStops = [
  { pos: 0, color: '#cba6f7' },
  { pos: 0.25, color: '#eb638b' },
  { pos: 0.5, color: '#94e2d5' },
  { pos: 0.75, color: '#fab387' },
  { pos: 1, color: '#f5e0dc' }
];

const interpolateColor = (p: number) => {
  const p1 = themeStops.find((s, i) => s.pos <= p && themeStops[i + 1]?.pos > p) || themeStops[themeStops.length - 2];
  const p2 = themeStops[themeStops.indexOf(p1) + 1];
  const factor = (p - p1.pos) / (p2.pos - p1.pos);

  const c1 = p1.color.match(/\w\w/g)!.map(x => parseInt(x, 16));
  const c2 = p2.color.match(/\w\w/g)!.map(x => parseInt(x, 16));

  const result = c1.map((v, i) => Math.round(v + (c2[i] - v) * factor));
  return `rgb(${result.join(',')})`;
};

export default function Home({ onReturn }: { onReturn: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const [accentPercent, setAccentPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const accentColor = interpolateColor(accentPercent / 100);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const percent = Math.max(0, Math.min(100, (y / rect.height) * 100));
      setAccentPercent(percent);
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Professional GSAP-based Smooth Scrolling (Momentum Scroll)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetY = container.scrollTop;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      e.preventDefault();

      // Calculate new target with momentum factor
      targetY += e.deltaY * 1.2;
      targetY = Math.max(0, Math.min(targetY, container.scrollHeight - container.clientHeight));

      // Use GSAP for the smoothing
      gsap.to(container, {
        scrollTop: targetY,
        duration: 1.2,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => {
          // Sync clouds with current scroll for parallax
          if (cloudRef.current) {
            cloudRef.current.style.transform = `translateY(${container.scrollTop * -0.3}px)`;
          }
        }
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [clickedRect, setClickedRect] = useState<DOMRect | null>(null);
  const [openedScrollTop, setOpenedScrollTop] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial entry animation for the very top content
    if (contentRef.current) {
      tl.fromTo(contentRef.current,
        { opacity: 0, scale: 1.1, filter: 'blur(20px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }
      );
    }

    // Reveal animations for sections as they scroll into view
    const sections = ['.bento-item', '.proj-card', '.blog-row', '.section-label', '.connect-section'];

    sections.forEach((selector) => {
      gsap.utils.toArray(selector).forEach((el: any) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, scale: 0.95, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              scroller: containerRef.current,
              toggleActions: "play none none none"
            }
          }
        );
      });
    });
  }, []);

  useEffect(() => {
    if (selectedProject && clickedRect && modalRef.current) {
      const modal = modalRef.current;
      const overlay = modalContainerRef.current;

      gsap.set(overlay, { background: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', opacity: 1 });
      gsap.set(modal, {
        x: clickedRect.left - (window.innerWidth - clickedRect.width) / 2,
        y: clickedRect.top - (window.innerHeight - clickedRect.height) / 2,
        width: clickedRect.width,
        height: clickedRect.height,
        borderRadius: '32px',
        rotation: -1,
        scale: 0.98,
        opacity: 1,
      });

      const tl = gsap.timeline({ defaults: { ease: 'expo.inOut', duration: 0.9 } });
      tl.to(overlay, { background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)', duration: 0.6 }, 0);
      tl.to(modal, {
        x: 0,
        y: 0,
        width: '85%',
        height: '75vh',
        borderRadius: '28px',
        rotation: 0,
        scale: 1,
        clearProps: 'transform',
      }, 0);
    }
  }, [selectedProject, clickedRect]);

  const closeModal = () => {
    if (!modalRef.current || !clickedRect || isClosing) return;
    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedProject(null);
        setClickedRect(null);
        setIsClosing(false);
      }
    });

    tl.to(modalContainerRef.current, { background: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', duration: 0.5 }, 0);

    // Auto-scroll back to original place if scrolled away
    if (containerRef.current && Math.abs(containerRef.current.scrollTop - openedScrollTop) > 10) {
      tl.to(containerRef.current, {
        scrollTop: openedScrollTop,
        duration: 0.8,
        ease: 'expo.inOut'
      }, 0);
    }

    if (modalContentRef.current) {
      tl.to(modalContentRef.current, { opacity: 0, duration: 0.2 }, 0);
    }
    tl.to(modalRef.current, {
      x: clickedRect.left - (window.innerWidth - clickedRect.width) / 2,
      y: clickedRect.top - (window.innerHeight - clickedRect.height) / 2,
      width: clickedRect.width,
      height: clickedRect.height,
      borderRadius: '32px',
      rotation: -1,
      scale: 0.98,
      duration: 0.8,
      ease: 'expo.inOut'
    }, 0);
  };

  const handleEasterEggMove = (e: React.MouseEvent) => {
    if (tooltipRef.current) {
      gsap.killTweensOf(tooltipRef.current);
      if (tooltipRef.current.style.display === 'none') {
        tooltipRef.current.style.display = 'block';
      }
      gsap.to(tooltipRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power3.out',
        opacity: 1
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectedProject && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (selectedProject) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [selectedProject, clickedRect, isClosing]);

  const handleEasterEggLeave = () => {
    if (tooltipRef.current) {
      gsap.to(tooltipRef.current, {
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
        onComplete: () => {
          if (tooltipRef.current && tooltipRef.current.style.opacity === '0') {
            tooltipRef.current.style.display = 'none';
          }
        }
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="portfolio-home"
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        background: 'transparent',
        userSelect: 'none',
        '--accent-color': accentColor,
        '--accent-pastel': `color-mix(in srgb, ${accentColor}, white 80%)`,
        '--accent-gradient': `linear-gradient(135deg, #fff 0%, ${accentColor} 100%)`
      } as any}
    >
      <style>{`
        .portfolio-home::-webkit-scrollbar { display: none; }

        .theme-slider-container {
          position: fixed;
          left: 40px;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 240px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 99px;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 6px;
        }

        .theme-slider-track {
          width: 100%;
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(to bottom, #cba6f7, #eb638b, #94e2d5, #fab387, #f5e0dc);
          opacity: 0.3;
          transition: opacity 0.3s;
        }
        .theme-slider-container:hover .theme-slider-track {
          opacity: 0.6;
        }

        .theme-slider-handle {
          position: absolute;
          left: 0;
          width: 100%;
          height: 4px;
          background: #fff;
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(255,255,255,1);
          transition: top 0.4s cubic-bezier(0.2, 1, 0.3, 1);
          pointer-events: none;
          z-index: 2;
        }

        .theme-slider-container::after {
          content: 'slidee..';
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(20px);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          opacity: 0;
          transition: all 0.3s;
          pointer-events: none;
          white-space: nowrap;
        }

        .theme-slider-container:hover::after {
          opacity: 0.4;
          transform: translateY(-50%) translateX(30px);
        }

        .available-badge {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 99px;
          color: var(--accent-color);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s;
        }
        .available-badge:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-color);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
        }
        .available-dot {
          width: 6px;
          height: 6px;
          background: var(--accent-color);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-color);
          animation: available-pulse 2s infinite ease-in-out;
        }

        @keyframes available-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }

        .dotted-grid {
          position: fixed;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
          pointer-events: none;
          z-index: -1;
          opacity: 0.8;
        }

        .minimal-name {
          font-family: var(--font-serif);
          font-size: clamp(3.5rem, 12vw, 9rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          text-transform: none;
          line-height: 0.85;
          margin: 0;
          color: var(--text-primary);
        }

        .section-heading-mix {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          line-height: 1;
          color: rgba(255,255,255,0.4);
        }
        .section-heading-mix span {
          display: block;
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3rem, 8vw, 5rem);
          text-transform: none;
          letter-spacing: -0.02em;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 0.1em;
          line-height: 1.1;
        }

        .project-title-large {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 400;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 24px;
          color: var(--text-primary);
        }

        .j-easter-egg {
          position: relative;
          cursor: help;
        }

        .proj-card {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          padding: 48px;
          overflow: hidden;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.8s cubic-bezier(0.2, 1, 0.3, 1), 
                      background-color 0.8s cubic-bezier(0.2, 1, 0.3, 1),
                      border-color 0.8s cubic-bezier(0.2, 1, 0.3, 1),
                      box-shadow 0.8s cubic-bezier(0.2, 1, 0.3, 1);
          cursor: pointer;
          will-change: transform;
        }

        .proj-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(0,0,0,0.4) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .proj-card:hover::before {
          opacity: 1;
        }

        .proj-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-12px) scale(1.01);
          box-shadow: 0 40px 100px rgba(0,0,0,0.5),
                      0 0 0 1px rgba(255,255,255,0.05);
        }

        .proj-preview-container {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.6s cubic-bezier(0.2, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .proj-preview-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%);
          z-index: 1;
        }

        .proj-card:hover .proj-preview-container {
          opacity: 1;
        }

        .proj-preview-iframe {
          width: 1600px;
          height: 1000px;
          border: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0.3);
          transform-origin: center center;
          opacity: 1;
          filter: grayscale(0.2) contrast(1.1) brightness(0.7);
          transition: transform 1.2s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .proj-card:hover .proj-preview-iframe {
          transform: translate(-50%, -50%) scale(0.35);
        }

        .proj-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.25);
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }

        .proj-card:hover .proj-content {
          opacity: 0.9;
        }

        .proj-cursor-label {
          position: absolute;
          left: 0;
          top: 0;
          transform: translate3d(var(--mx-px, 50%), var(--my-px, 50%), 0);
          pointer-events: none;
          z-index: 100;
          opacity: 0;
          transition: opacity 0.4s ease, 
                      transform 0.1s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform;
        }

        .proj-cursor-inner {
          transform: translate(-50%, -50%) scale(0.5);
          background: #fff;
          color: #000;
          padding: 10px 20px;
          border-radius: 99px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.35);
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          white-space: nowrap;
        }

        .proj-card:hover .proj-cursor-label {
          opacity: 1;
        }

        .proj-card:hover .proj-cursor-inner {
          transform: translate(-50%, -50%) scale(1);
          animation: cursor-pulse 2s infinite ease-in-out;
        }

        @keyframes cursor-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 20px 45px rgba(0,0,0,0.5); }
        }

        .proj-tag {
          display: inline-flex;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-color);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          white-space: nowrap;
          opacity: 0.6;
        }
        .proj-actions {
          display: flex;
          gap: 10px;
          margin-top: 24px;
          opacity: 1;
          transform: translateY(0);
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
        }
        .proj-action-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
          color: #fff; font-size: 0.78rem; font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .proj-action-btn:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.28); }
        .proj-action-btn.primary {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--accent-color);
          color: var(--accent-color);
          opacity: 0.8;
        }
        .proj-action-btn.primary:hover { 
          background: var(--accent-color);
          color: #000;
          opacity: 1;
        }

        @keyframes modal-enter {
          from { transform: scale(0.95) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>

      {/* FIXED UI ELEMENTS */}
      <div
        ref={sliderRef}
        className="theme-slider-container"
        onMouseDown={(e) => {
          setIsDragging(true);
          const rect = e.currentTarget.getBoundingClientRect();
          const y = e.clientY - rect.top;
          const percent = Math.max(0, Math.min(100, (y / rect.height) * 100));
          setAccentPercent(percent);
        }}
      >
        <div className="theme-slider-track" />
        <div className="theme-slider-track-overlay" />
        <div
          className="theme-slider-handle"
          style={{
            top: `${accentPercent}%`,
            transition: isDragging ? 'none' : 'top 0.4s cubic-bezier(0.2, 1, 0.3, 1)'
          }}
        />
      </div>

      <div className="dotted-grid" />

      <div
        ref={cloudRef}
        style={{
          position: 'fixed',
          left: '30%',
          top: '-20%',
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
          willChange: 'transform'
        }}
      >
        <Clouds />
      </div>

      <MountainIcon onClick={onReturn} />
      <HomeSceneClickable onClick={onReturn} />

      {/* SCROLLABLE CONTENT WRAPPER */}
      <div
        ref={contentRef}
        style={{
          width: '100%',
          padding: '40px 10% 40px calc(10% + 80px)',
          willChange: 'transform, filter'
        }}
      >
        <Hero handleEasterEggMove={handleEasterEggMove} handleEasterEggLeave={handleEasterEggLeave} />
        <TechStack />
        <Projects
          selectedProjectName={selectedProject?.name}
          onProjectClick={(p: any, rect?: DOMRect) => {
            if (containerRef.current) setOpenedScrollTop(containerRef.current.scrollTop);
            setClickedRect(rect || null);
            setSelectedProject(p);
          }}
        />
        <Connect />
        <ResumeSection />
        <Footer />
      </div>

      {/* OVERLAYS */}
      <div
        ref={tooltipRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          background: 'var(--accent-color)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: '#111',
          padding: '6px 14px',
          borderRadius: '12px',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          zIndex: 10000,
          pointerEvents: 'none',
          display: 'none',
          opacity: 0,
          transform: 'translate(-50%, -150%)'
        } as any}
      >
        yaa imperfection
      </div>

      {selectedProject && (
        <div
          ref={modalContainerRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 20000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            pointerEvents: 'none',
            background: 'none'
          }}
        >
          <div
            ref={modalRef}
            style={{
              width: '85%',
              height: '75vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 60px 120px rgba(0,0,0,0.8)',
              position: 'relative',
              pointerEvents: 'auto',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)'
            }}
          >
            <div style={{
              padding: '16px 20px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div onClick={closeModal} style={{ width: '12px', height: '12px', background: '#ff5f57', borderRadius: '50%', cursor: 'pointer' }} />
                <div style={{ width: '12px', height: '12px', background: '#febc2e', borderRadius: '50%' }} />
                <div style={{ width: '12px', height: '12px', background: '#28c840', borderRadius: '50%' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'white', fontWeight: 600, fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.8 }}>{selectedProject.name}</span>
                <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></div>
              </div>
              <a
                href={selectedProject.visit}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '0.65rem',
                  color: 'white',
                  textDecoration: 'none',
                  opacity: 0.4,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.4'}
              >
                LIVE ↗
              </a>
            </div>

            <div
              ref={modalContentRef}
              style={{ flex: 1, background: '#fff', position: 'relative', overflow: 'hidden' }}
            >
              <iframe
                src={selectedProject.visit}
                style={{
                  width: 'calc(100% + 18px)',
                  height: '100%',
                  border: 'none',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
                title={selectedProject.name}
              />
              <style>{`
                iframe::-webkit-scrollbar { display: none; }
              `}</style>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
