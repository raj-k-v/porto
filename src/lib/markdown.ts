export function parseMarkdown(text: string): string {
  // First, escape HTML characters
  let result = escapeHtml(text);

  // Code blocks: ```code``` -> <pre><code>code</code></pre>
  result = result.replace(/```(.*?)```/gs, '<pre style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; margin: 8px 0; overflow-x: auto;"><code style="font-family: monospace; font-size: 0.75rem;">$1</code></pre>');

  // Bold text: **text** -> <strong>text</strong>
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600; color: #fbbf24;">$1</strong>');

  // Italic text: *text* -> <em>text</em>
  result = result.replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>');

  // Inline code: `text` -> <code>text</code>
  result = result.replace(/`(.*?)`/g, '<code style="background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.8rem;">$1</code>');

  // Numbered lists: 1. item -> <li>item</li>
  result = result.replace(/^\d+\.\s+(.+)$/gm, '<li style="margin-left: 20px; margin-bottom: 4px;">$1</li>');

  // Bullet points: - item or * item -> <li>item</li>
  result = result.replace(/^[\-\*]\s+(.+)$/gm, '<li style="margin-left: 20px; margin-bottom: 4px;">• $1</li>');

  // Headings: ### text -> <h3>text</h3>
  result = result.replace(/^###\s+(.+)$/gm, '<div style="font-weight: 600; margin-top: 12px; margin-bottom: 8px; font-size: 0.95rem;">$1</div>');
  
  // Headings: ## text -> <h2>text</h2>
  result = result.replace(/^##\s+(.+)$/gm, '<div style="font-weight: 700; margin-top: 14px; margin-bottom: 10px; font-size: 1rem;">$1</div>');
  
  // Headings: # text -> <h1>text</h1>
  result = result.replace(/^#\s+(.+)$/gm, '<div style="font-weight: 700; margin-top: 16px; margin-bottom: 12px; font-size: 1.1rem;">$1</div>');

  // Line breaks - convert double newlines to paragraph breaks
  result = result.replace(/\n\n/g, '</p><p style="margin-top: 12px;">');
  
  // Single line breaks
  result = result.replace(/\n/g, '<br/>');

  return result;
}

export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export function sanitizeText(text: string): string {
  return escapeHtml(text);
}
