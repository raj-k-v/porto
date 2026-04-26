import React from 'react';
import { techStack } from '../../data/portfolio';
import type { TechItem } from '../../data/portfolio';
import { 
  Database, 
  Code2, 
  Layout, 
  Wind, 
  Zap, 
  FileCode2, 
  Blocks,
  Cpu,
  Layers,
  Globe
} from 'lucide-react';

// Map icon IDs to Lucide components
const IconMap: Record<string, React.ReactNode> = {
  mongo: <Database size={18} />,
  html: <Layout size={18} />,
  css: <Layers size={18} />,
  ts: <FileCode2 size={18} />,
  next: <Globe size={18} />,
  tailwind: <Wind size={18} />,
  supabase: <Blocks size={18} />,
  react: <Code2 size={18} />,
  rust: <Cpu size={18} />,
  gsap: <Zap size={18} />,
};

export const TechStack: React.FC = () => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div className="section-label">Technical Arsenal</div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '1px', 
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        willChange: 'transform'
      }}>
        {techStack.map((tech: TechItem) => (
          <div 
            key={tech.name} 
            style={{ 
              padding: '24px 32px', 
              background: 'rgba(0,0,0,0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'default',
              minWidth: 0 // Prevent flex-basis overflow
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.paddingLeft = '38px';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
              e.currentTarget.style.paddingLeft = '32px';
            }}
          >
            <div style={{ 
              opacity: 0.6, 
              display: 'flex', 
              alignItems: 'center',
              color: 'var(--text-primary)',
              flexShrink: 0
            }}>
              {IconMap[tech.iconId] || <Code2 size={18} />}
            </div>
            <span style={{ 
              fontSize: '0.82rem', 
              fontWeight: 500, 
              letterSpacing: '0.05em', 
              opacity: 0.8,
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}>
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
