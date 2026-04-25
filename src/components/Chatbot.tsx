import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { gsap } from 'gsap';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm Teddu, Raj's AI assistant. Ask me anything about his projects, skills, or experience!", sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const responses: Record<string, string> = {
    'skill': "Raj specializes in React, Next.js, and immersive UI/UX design with GSAP.",
    'project': "Raj has built high-fidelity portfolios, SaaS dashboards, and interactive web experiences.",
    'experience': "With a focus on advanced frontend development, Raj crafts performant and visually stunning digital products.",
    'default': "I can tell you more about Raj's technical stack, specific projects, or professional experience!"
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = responses.default;
      for (const key in responses) {
        if (lowerInput.includes(key)) {
          response = responses[key];
          break;
        }
      }
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      setIsTyping(false);
    }, 1200);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (isOpen) {
      // Morph: Expand from circle to rectangle IN PLACE
      gsap.to(containerRef.current, {
        width: '360px',
        height: '480px',
        borderRadius: '28px',
        bottom: '32px',
        right: '32px',
        duration: 0.8,
        ease: 'power4.inOut',
        force3D: true
      });
    } else {
      // Un-morph: Shrink back to circle
      gsap.to(containerRef.current, {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        bottom: '32px',
        right: '32px',
        duration: 0.8,
        ease: 'power4.inOut',
        force3D: true
      });

      // Cleanup robot-triggered greeting when closing
      // Revert the first message back to the regular greeting if it was the apology
      setMessages(prev => {
        if (prev.length > 0 && prev[0].text.startsWith("Don't mind him!")) {
          const newMessages = [...prev];
          newMessages[0] = { text: "Hi! I'm Teddu, Raj's AI assistant. Ask me anything about his projects, skills, or experience!", sender: 'bot' };
          return newMessages;
        }
        return prev;
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOpenEvent = (e: any) => {
      setIsOpen(true);
      // If triggered by the robot, reset messages to show the special apology greeting
      if (e.detail?.fromRobot) {
        setTimeout(() => {
          setMessages([
            { text: "Don't mind him! I'm Teddu, Raj's AI assistant. Ask me anything about his projects, skills, or experience!", sender: 'bot' }
          ]);
        }, 100);
      }
    };
    window.addEventListener('openChatbot', handleOpenEvent);
    return () => window.removeEventListener('openChatbot', handleOpenEvent);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div
      ref={containerRef}
      className="chatbot-container"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '56px',
        height: '56px',
        zIndex: 3000,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(15, 15, 15, 0.9)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3), inset 0 0 0 3px rgba(15,15,15,0.4), inset 0 0 0 4px rgba(255,255,255,0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: isOpen ? 'default' : 'pointer',
        transformOrigin: 'bottom right'
      }}
      onClick={() => { if (!isOpen) setIsOpen(true); }}
    >
      {/* Closed State Icon */}
      {!isOpen && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <Bot size={24} color="white" />
        </div>
      )}

      {/* Open State Content */}
      {isOpen && (
        <div
          ref={chatContentRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '360px',
            position: 'relative',
            zIndex: 10
          }}
        >
          {/* Mac Header */}
          <div style={{
            position: 'relative',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                className="mac-dot-red"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                style={{
                  width: '12px',
                  height: '12px',
                  background: '#ff5f57',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
              />
              <div style={{ width: '12px', height: '12px', background: '#febc2e', borderRadius: '50%' }} />
              <div style={{ width: '12px', height: '12px', background: '#28c840', borderRadius: '50%' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'white', fontWeight: 600, fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.8 }}>Teddu</span>
              <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                {msg.sender === 'bot' && (
                  <div style={{
                    width: '28px',
                    height: '28px',
                    flexShrink: 0,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <Bot size={14} color="white" />
                  </div>
                )}
                <div style={{
                  background: msg.sender === 'user' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                  padding: '12px 18px',
                  borderRadius: '16px',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  fontFamily: 'var(--font-sans)',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', flexShrink: 0, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Bot size={14} color="white" />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 16px', borderRadius: '18px', display: 'flex', gap: '4px' }}>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.15)' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '12px 40px 12px 16px',
                  color: 'white',
                  fontSize: '0.82rem',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)',
                }}
              />
              <button
                onClick={handleSend}
                className="chat-send-button"
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          <style>{`
            .chat-send-button:hover {
              color: white !important;
              filter: drop-shadow(0 0 5px rgba(255,255,255,0.5));
              transform: scale(1.1);
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
