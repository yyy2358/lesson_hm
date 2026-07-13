import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

