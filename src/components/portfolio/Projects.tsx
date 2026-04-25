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

  return (
    <div
      ref={cardRef}
      className="proj-card"
      style={{
        opacity: selectedProjectName === p.name ? 0 : 1,
        pointerEvents: selectedProjectName ? 'none' : 'auto'
      }}
      onClick={() => onProjectClick(p, cardRef.current?.getBoundingClientRect())}
      onMouseMove={e => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mx-px', `${x}px`);
        cardRef.current.style.setProperty('--my-px', `${y}px`);
        const xp = (x / rect.width * 100).toFixed(1);
        const yp = (y / rect.height * 100).toFixed(1);
        cardRef.current.style.setProperty('--mx', `${xp}%`);
        cardRef.current.style.setProperty('--my', `${yp}%`);
      }}
    >
      {/* Cursor Follower Label */}
      <div className="proj-cursor-label">
        <div className="proj-cursor-inner">PREVIEW</div>
      </div>

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
