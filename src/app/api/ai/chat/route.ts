import { NextResponse } from 'next/server';
import { getAuthPayload } from '@/lib/auth';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  // Auth guard
  const payload = getAuthPayload(req);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { message, imageBase64 } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      safetySettings: [
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT' as any,
          threshold: 'BLOCK_NONE' as any
        }
      ]
    });

    const promptParts: any[] = [
      'You are a highly intelligent, encouraging tutor for a NEET/JEE coaching institute in India. Help the student with their academic doubt. Explain step-by-step in a clear, structured way. Use simple language. Format your answer with headings if needed.',
      message,
    ];

    if (imageBase64) {
      promptParts.push({
        inlineData: {
          data: imageBase64,
          mimeType: 'image/jpeg',
        },
      });
    }

    const result = await model.generateContent(promptParts);
    const responseText = result.response.text();

    return NextResponse.json({ success: true, reply: responseText });
  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate response from AI' }, { status: 500 });
  }
}
