import express, { Express, Request, Response } from 'express';
import ViteExpress from 'vite-express';
import { createGroq } from '@ai-sdk/groq';
import { SYSTEM_PROMPT } from './ai-system.js';
import rateLimit from 'express-rate-limit';
import { streamText } from 'ai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'All on board capitan' });
});

app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    if (!req.body?.messages) {
      res.status(400).json({ error: 'Messages are required' });
      return;
    }

    const { messages, model = 'llama3-70b-8192' } = req.body;
    const lastUserMessage = messages.findLast(
      (msg: { role: string; content: string }) => msg.role === 'user'
    );
    const prompt = lastUserMessage ? lastUserMessage.content : '';

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const result = await streamText({
      model: groq(model),
      system: SYSTEM_PROMPT,
      prompt
    });

    res.setHeader('Content-Type', 'text/plain');

    for await (const chunk of result.toDataStream()) {
      res.write(chunk);
    }
    res.end();
  } catch (error: unknown) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'An error occurred while processing your request',
      details:
        process.env.NODE_ENV === 'development'
          ? error instanceof Error
            ? error.message
            : String(error)
          : undefined
    });
  }
});

ViteExpress.listen(app, PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
