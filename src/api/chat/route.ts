import type { Request, Response } from 'express';
import { CHATBOT_CONTEXT } from '../../lib/chatbot-context.ts';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const SYSTEM_PROMPT = CHATBOT_CONTEXT;

interface DeepSeekRequest {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature: number;
  max_tokens: number;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function POST(req: Request, res: Response) {
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
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...(conversationHistory || []),
      { role: 'user' as const, content: message },
    ];

    const payload: DeepSeekRequest = {
      model: 'llama-3.3-70b-versatile',
      messages: messages,
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

    const data: DeepSeekResponse = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

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
