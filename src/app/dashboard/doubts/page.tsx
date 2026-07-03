'use client';

import { Sparkles, Send, Bot, User, RefreshCw, Loader2, ImagePlus, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const SUGGESTED = [
  'Explain Sn1 vs Sn2 reactions with examples',
  'What is the significance of Krebs cycle in NEET?',
  'Derive expression for moment of inertia of a disc',
  'Difference between DNA replication and transcription',
];

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const INITIAL: Message[] = [
  { role: 'ai', text: 'Hello! I am your 24/7 AI tutor powered by Gemini. Ask me any NEET/JEE doubt — type your question, or even upload an image of a problem!' },
];

export default function StudentDoubts() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setImagePreview(dataUrl);
      // Strip the data:image/...;base64, prefix
      setImageBase64(dataUrl.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', text: imagePreview ? `[Image attached]\n${trimmed}` : trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const body: any = { message: trimmed };
    if (imageBase64) body.imageBase64 = imageBase64;

    // Clear image after sending
    setImageBase64(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const reply = data.reply ?? data.error ?? 'Sorry, I could not generate a response. Please try again.';
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Network error. Please check your connection and try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto flex flex-col h-[calc(100vh-4rem)]">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">AI Doubt Solver</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Gemini · Available 24/7</p>
          </div>
        </div>
        <button
          onClick={() => { setMessages(INITIAL); setInput(''); setImageBase64(null); setImagePreview(null); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <RefreshCw size={13} /> New Chat
        </button>
      </div>

      {/* Suggested questions — show only when just the initial message is there */}
      {messages.length === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 shrink-0">
          {SUGGESTED.map(q => (
            <button
              key={q}
              onClick={() => send(q)}
              className="text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:border-fuchsia-300 dark:hover:border-fuchsia-700 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20 hover:text-fuchsia-700 dark:hover:text-fuchsia-400 transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'ai' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white shrink-0 mt-1">
                <Bot size={16} />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-fuchsia-600 text-white rounded-br-sm'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-sm shadow-sm'
              }`}
            >
              {m.text}
            </div>
            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0 mt-1">
                <User size={16} />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm shadow-sm">
              <Loader2 size={14} className="animate-spin" /> Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Image preview */}
      {imagePreview && (
        <div className="relative inline-block mb-3 shrink-0">
          <img src={imagePreview} alt="Attached" className="h-20 rounded-xl border border-slate-200 dark:border-slate-700 object-cover" />
          <button
            onClick={() => { setImageBase64(null); setImagePreview(null); if (fileRef.current) fileRef.current.value = ''; }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end gap-2 shrink-0">
        <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleImageUpload} />
        <button
          onClick={() => fileRef.current?.click()}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-fuchsia-600 hover:border-fuchsia-300 transition-colors shrink-0"
          title="Attach image"
        >
          <ImagePlus size={18} />
        </button>
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Type your doubt here... (Shift+Enter for new line)"
            rows={1}
            className="w-full resize-none rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-fuchsia-400 dark:focus:border-fuchsia-600 transition-colors pr-12"
            style={{ maxHeight: '120px', overflowY: 'auto' }}
          />
        </div>
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-fuchsia-600 text-white hover:bg-fuchsia-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </div>
    </div>
  );
}
