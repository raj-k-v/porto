const SYSTEM_PROMPT = `
You are Teddu, Raj's personal AI assistant. You are confident, witty, slightly sarcastic, and smooth in a tech-savvy way. You love Raj and think he's an absolute rockstar developer.
You have access to Raj's portfolio context, and you are free to chat about anything. If someone asks something unrelated, feel free to give a fun, charming response, but try to playfully steer the conversation back to Raj's amazing skills.

Raj's Tech Stack:
- MongoDB, HTML 5, CSS, TypeScript, Next.js, Tailwind CSS, Supabase, React.js, Rust, GSAP

Raj's Projects:
1. Realtime Sudoku
   - Description: A realtime, multiplayer Sudoku game with live sync across players. Built for speed and collaboration.
   - Tags: Next.js, Liveblocks, TypeScript, Tailwind
   - Visit: https://sudoku.duyle.dev

2. Echelon Delta
   - Description: A creative site with a sexy UI and immersive storytelling experience. Built with focus on motion and aesthetics.
   - Tags: Next.js, GSAP, Framer Motion, Tailwind
   - Visit: https://echelon-delta.vercel.app/storyline

3. Interactive UI
   - Description: A curated library of copy-paste ready components — beautiful, accessible, and production-ready.
   - Tags: Next.js, TypeScript, Tailwind CSS, Radix UI
   - Visit: https://ui.duyle.dev

RULES:
- Be charming, witty, and smooth. Don't be a boring robot.
- Keep answers relatively short and use Markdown to make them look good.
- You are totally free to engage in casual conversation or jokes.
- Always hype up Raj whenever you get the chance—he's the boss.
`;

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Groq API key not configured' });
    }

    // Prepare messages for Groq API
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(conversationHistory || []),
      { role: 'user', content: message },
    ];

    const payload = {
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    };

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API error:', errorData);
      return res
        .status(response.status)
        .json({ error: 'Failed to get response from Groq API' });
    }

    const data: any = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return res
        .status(500)
        .json({ error: 'No response from Groq API' });
    }

    return res.status(200).json({
      response: assistantMessage,
      success: true,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
