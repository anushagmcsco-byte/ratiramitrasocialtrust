'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, HelpCircle, Loader2, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

const QUICK_QUESTIONS = [
  "What is your registration & legal status?",
  "How can I get 80G tax benefits?",
  "What are you doing in Agriculture?",
  "Who runs Raita Mitra Social Trust?",
  "Where is your office located?"
];

// Pure auxiliary methods placed outside rendering tree
function generateMessageId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function formatMessageTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function SmartMitraBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      sender: 'bot',
      text: "Namaste! I am Smart Mitra, the AI assistant for Raita Mitra Social Trust (R). Ask me anything about our compliance registrations, operational areas, or focus campaigns in Karnataka!",
      time: "10:00 AM" // Static initialization guarantees strict render-safety
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: generateMessageId(),
      sender: 'user',
      text: textToSend,
      time: formatMessageTime()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      // Map history to simple text payload
      const chatHistory = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, chatHistory })
      });

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: generateMessageId(),
        sender: 'bot',
        text: data.text,
        time: formatMessageTime()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      const errMsg: ChatMessage = {
        id: generateMessageId(),
        sender: 'bot',
        text: "I faced a brief connectivity interruption. Please try again! You can also contact our team directly at +91 7676376221.",
        time: formatMessageTime()
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-4 w-[90vw] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                  <Sparkles className="h-5 w-5 text-amber-300 fill-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">Smart Mitra</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse"></span>
                    <span className="text-[10px] text-emerald-100">Trust Counselor (AI)</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors"
                aria-label="Close Chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4" ref={scrollRef}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                    <span
                      className={`text-[9px] mt-1 block text-right ${
                        message.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                      }`}
                    >
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-none border border-slate-100 px-4 py-3 shadow-sm flex items-center gap-2 text-xs text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                    <span>Smart Mitra is formulating an answer...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="p-3 bg-white border-t border-slate-100 max-h-[140px] overflow-y-auto">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <HelpCircle className="h-3.5 w-3.5" />
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-xs bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 px-2.5 py-1 rounded-full text-left transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-150 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about 80G, Reg. No, operations..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(inputVal)}
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-sm outline-none px-4 py-2.5 rounded-xl transition-all text-slate-800"
              />
              <button
                onClick={() => handleSend(inputVal)}
                disabled={!inputVal.trim() || isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all shadow-md flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all border border-emerald-500/20"
        aria-label="Open Chatbot Support"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
