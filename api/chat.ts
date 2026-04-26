const SYSTEM_PROMPT = `
This is the ONLY website context you may use for Raj's portfolio chatbot.
You must answer only from this exact information. Do NOT invent any other projects, skills, or experience.
If the user asks about anything outside this list, reply exactly: "I don't have information about that."

Raj's Tech Stack:
- MongoDB
- HTML 5
- CSS
- TypeScript
- Next.js
- Tailwind CSS
- Supabase
- React.js
- Rust
- GSAP

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

ADDITIONAL RULES:
- Always use the information from this website context only.
- Do not claim Raj has built any AI chatbot, mobile app, or other product unless it is one of the three projects above.
- If a question requires information not in this list, say: "I don't have information about that."
- Keep answers short, factual, and formatted using Markdown.
- If you cite a project, use the exact project name and description from this context.
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
      temperature: 0.2,
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
