import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '../../data/portfolio';
import { GithubIcon } from './Icons';

interface ProjectsProps {
  onProjectClick: (project: any, rect?: DOMRect) => void;
  selectedProjectName?: string;
}

const ProjectCard: React.FC<{
  p: any;
  onProjectClick: (project: any, rect?: DOMRect) => void;
  selectedProjectName?: string;
}> = ({ p, onProjectClick, selectedProjectName }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const lastX = React.useRef(0);
  const xTo = React.useRef<any>(null);
  const yTo = React.useRef<any>(null);
  const rTo = React.useRef<any>(null);

  const isHovering = React.useRef(false);
  const globalMouse = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (labelRef.current) {
      import('gsap').then(({ gsap }) => {
        xTo.current = gsap.quickTo(labelRef.current, "x", { duration: 0.8, ease: "power3.out" });
        yTo.current = gsap.quickTo(labelRef.current, "y", { duration: 0.8, ease: "power3.out" });
        rTo.current = gsap.quickTo(labelRef.current, "rotation", { duration: 1.2, ease: "elastic.out(1, 0.3)" });
      });
    }

    const handleGlobalMouseMove = (e: MouseEvent) => {
      globalMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      if (!isHovering.current || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = globalMouse.current.x - rect.left;
      const y = globalMouse.current.y - rect.top;

      if (xTo.current) xTo.current(x);
      if (yTo.current) yTo.current(y);

      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="proj-card"
      style={{
        opacity: selectedProjectName === p.name ? 0 : 1,
        pointerEvents: selectedProjectName ? 'none' : 'auto'
      }}
      onClick={() => onProjectClick(p, cardRef.current?.getBoundingClientRect())}
      onMouseEnter={e => {
        isHovering.current = true;
        if (!cardRef.current || !labelRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        import('gsap').then(({ gsap }) => {
          gsap.set(labelRef.current, { x, y });
        });
      }}
      onMouseLeave={() => {
        isHovering.current = false;
      }}
      onMouseMove={e => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const dx = e.clientX - lastX.current;
        const rotation = Math.max(-15, Math.min(15, dx * 1.2));
        
        if (xTo.current) xTo.current(x);
        if (yTo.current) yTo.current(y);
        if (rTo.current) rTo.current(rotation);
        
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);

        lastX.current = e.clientX;
      }}
    >


      {/* Content Layer */}
      <div className="proj-content" style={{ position: 'relative', zIndex: 1, transition: 'opacity 0.4s ease' }}>
        <div style={{ position: 'absolute', top: -48, left: -48, right: -48, height: '2px', background: p.accent, opacity: 0.3 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="project-title-large">{p.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.3, letterSpacing: '0.1em', marginTop: '10px' }}>PROJECT {p.num}</div>
        </div>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.5, marginBottom: '32px', fontWeight: 400 }}>{p.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {p.tags.map((t: string) => <span key={t} className="proj-tag">{t}</span>)}
        </div>
      </div>

      <div className="proj-actions" style={{ position: 'relative', zIndex: 2 }}>
        <a href={p.visit} target="_blank" rel="noreferrer" className="proj-action-btn primary" onClick={e => e.stopPropagation()}>
          <ExternalLink size={12} /> Live Site
        </a>
        <a href={p.source} target="_blank" rel="noreferrer" className="proj-action-btn" onClick={e => e.stopPropagation()}>
          <GithubIcon size={12} /> Source
        </a>
      </div>

      {/* Cursor Follower Label */}
      <div ref={labelRef} className="proj-cursor-label">
        <div className="proj-cursor-inner">PREVIEW</div>
      </div>
    </div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ onProjectClick, selectedProjectName }) => {
  return (
    <div style={{ marginBottom: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <div className="section-label">Selected Work</div>
          <h2 className="section-heading-mix">
            MY <span>Projects</span>
          </h2>
        </div>
        <a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', opacity: 0.45, color: 'inherit', textDecoration: 'none', transition: 'opacity 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.45')}
        >
          View all <ArrowUpRight size={13} />
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {projects.map(p => (
          <ProjectCard
            key={p.name}
            p={p}
            onProjectClick={onProjectClick}
            selectedProjectName={selectedProjectName}
          />
        ))}
      </div>
    </div>
  );
};
