# Chatbot Setup Guide

## Overview
Your chatbot now uses **Groq API** with Meta's Llama 3.3 70B model - completely free! 🎉

## Files Created

### Backend Files
- **server.ts** - Express.js server with Groq API integration
- **src/api/chat/route.ts** - Chat API route handler

### Frontend Files
- **src/lib/chatbot-data.ts** - Chat data types and prompts
- **src/lib/markdown.ts** - Markdown parsing utilities
- **src/lib/utils.ts** - Helper functions including `fetchChatResponse()`
- **src/components/Chatbot.tsx** - Updated to use real API calls

### Configuration Files
- **.env.local** - Environment variables (your Groq API key)
- **.env.example** - Example environment file
- **vite.config.ts** - Updated with proxy configuration for `/api` routes

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Groq API Key ✅
Your Groq API key is already in `.env.local`:
```
GROQ_API_KEY=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
```

**Ready to use!** The key is already configured.

### 3. Run the Application

**Option A: Run both dev server and chat API together (Recommended)**
```bash
npm run dev:all
```
This will start:
- Vite dev server on http://localhost:5173
- Chat API server on http://localhost:3001

**Option B: Run separately**
Terminal 1 - Start Vite dev server:
```bash
npm run dev
```

Terminal 2 - Start chat API server:
```bash
npm run server
```

### 4. Test the Chatbot
1. Open http://localhost:5173 in your browser
2. Click the chatbot icon in the bottom-right corner
3. Type a message and the Groq API will respond with Llama 3.3 70B

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React/Vite Frontend                      │
│  (Chatbot.tsx sends requests via fetchChatResponse)         │
└─────────────────────┬───────────────────────────────────────┘
                      │ /api/chat POST
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Express.js Backend (server.ts)                 │
│  - Receives user message + conversation history             │
│  - Calls Groq API                                           │
│  - Returns AI response                                      │
└─────────────────────┬───────────────────────────────────────┘
                      │ API Call
                      ▼
           ┌──────────────────────┐
           │  Groq API            │
           │  Meta Llama 3.3 70B  │
           │  (Free!)             │
           └──────────────────────┘
```

## Features

✅ Multi-turn conversations (context is maintained)
✅ Real-time AI responses via Groq API
✅ Free tier available - no credit card needed
✅ Error handling and user-friendly messages
✅ Proxy setup for seamless frontend-backend communication
✅ Environment variable configuration

## Troubleshooting

### API Key Not Working
- Verify your API key in `.env.local` is not empty
- Get a new key from https://console.groq.com/keys
- Restart the server after updating the key

### Connection Error
- Ensure chat API server is running on port 3001
- Check that both ports (5173 and 3001) are available
- Verify the proxy configuration in `vite.config.ts`

### Conversation History Not Working
- Clear browser cache/cookies
- Check browser console for errors
- Verify the backend is receiving conversation history correctly

## API Endpoint

**POST /api/chat**
```json
{
  "message": "User's message here",
  "conversationHistory": [
    { "role": "user", "content": "Previous user message" },
    { "role": "assistant", "content": "Previous AI response" }
  ]
}
```

**Response:**
```json
{
  "response": "AI's response text",
  "success": true
}
```

## Groq API Details

- **Model**: `llama-3.3-70b-versatile`
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 1000 per response
- **Free Tier**: Generous rate limits
- **Website**: https://groq.com
