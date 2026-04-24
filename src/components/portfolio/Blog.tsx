import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import { blogPosts } from '../../data/portfolio';

export const Blog: React.FC = () => {
  return (
    <div className="bento-item" style={{ marginTop: '60px', marginBottom: '80px', padding: '48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <div className="section-label">Thinking Out Loud</div>
          <h2 className="section-heading-mix">
            RECENT <span>Posts</span>
          </h2>
        </div>
        <a href="https://www.duyle.dev/blog" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', opacity: 0.4, color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
          All Writing <ArrowUpRight size={14} />
        </a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {blogPosts.map(post => (
          <a key={post.title} href={post.href} target="_blank" rel="noreferrer" className="blog-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={15} style={{ opacity: 0.4, flexShrink: 0 }} />
              <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{post.title}</span>
            </div>
            <span style={{ fontSize: '0.78rem', opacity: 0.45, flexShrink: 0 }}>{post.date}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
