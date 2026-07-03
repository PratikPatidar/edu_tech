'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function AIDoubtSupport() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hi there! I am your EduMiracle AI Tutor. Upload an image of a question or type your doubt here!' }
  ]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the data:image/...;base64, prefix
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !image) return;

    const userMessage = input;
    setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage || '[Image Uploaded]' }]);
    setLoading(true);

    try {
      let imageBase64 = null;
      if (image) {
        imageBase64 = await convertToBase64(image);
      }

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, imageBase64 }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error answering that.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Network error. Please try again.' }]);
    } finally {
      setLoading(false);
      setImage(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>✨ AI Doubt Resolution</h1>
        <span style={{ color: 'var(--text-muted)' }}>Powered by Gemini 1.5</span>
      </div>

      <div className={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.aiMessage}`}>
            {/* Very basic markdown rendering placeholder */}
            {msg.content.split('\n').map((line, j) => (
              <p key={j} style={{ minHeight: '1rem' }}>{line}</p>
            ))}
          </div>
        ))}
        {loading && (
          <div className={`${styles.message} ${styles.aiMessage}`}>
            <i>Thinking...</i>
          </div>
        )}
      </div>

      <div className={styles.inputArea}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className={styles.fileInput}
        />
        <form onSubmit={handleSend} className={styles.form}>
          <input
            type="text"
            placeholder="Type your question here..."
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className={styles.button} disabled={loading || (!input.trim() && !image)}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
