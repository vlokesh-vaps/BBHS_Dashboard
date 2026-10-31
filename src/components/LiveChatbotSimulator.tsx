'use strict';
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Sparkles,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { bbhsChatbotData, bbhsSchoolProfile } from '../data/bbhsData';
import { ChatMessage } from '../types/dashboard';

export default function LiveChatbotSimulator() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Hello! I am Baldwin AI, the official Admissions & Heritage Assistant for Baldwin Boys' High School Bangalore (Estd. 1880). How can I assist you with admissions for 2026-27, academics, boarding, or sports?`,
      timestamp: 'Just now',
      quickReplies: [
        'Admissions 2026-27 Procedure',
        'Tuition Fees & Scholarships',
        'Boarding & Hostel Facilities',
        'ISC Class 11 Streams',
        'School Houses & Sports',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findBestResponse = (query: string) => {
    const q = query.toLowerCase();
    const kb = bbhsChatbotData.knowledgeBaseSnippets;

    // Check for matching snippet
    for (const item of kb) {
      const match = item.keywords.some((kw) => q.includes(kw));
      if (match) {
        return {
          text: item.answer,
          quickReplies: item.quickReplies,
          category: item.category,
        };
      }
    }

    // Default intelligent fallback
    return {
      text: `Thank you for asking about "${query}". Baldwin Boys' High School provides premier CISCE education from Kindergarten through ICSE and ISC (Class XII) with boarding options. Would you like me to connect you with our Admissions Desk (admissions@baldwinboyshighschool.edu.in / +91 80 2221 1981)?`,
      quickReplies: [
        'Schedule Campus Visit',
        'Speak with Admissions Counselor',
        'Download School Prospectus',
      ],
      category: 'General',
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const matched = findBestResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: matched.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: matched.quickReplies,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'msg-1',
        sender: 'bot',
        text: `Chat reset. I am Baldwin AI, ready to answer questions about Baldwin Boys' High School admissions, academics, and heritage.`,
        timestamp: 'Just now',
        quickReplies: [
          'Admissions 2026-27 Procedure',
          'Tuition Fees & Scholarships',
          'Boarding & Hostel Facilities',
          'ISC Class 11 Streams',
        ],
      },
    ]);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[580px] overflow-hidden">
      {/* Simulator Header */}
      <div className="bg-[#0B192C] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-white p-0.5 shadow-sm ring-2 ring-amber-400 shrink-0 flex items-center justify-center">
              <img
                src="/baldwin_crest.png"
                alt="Baldwin AI Crest"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0B192C] absolute -bottom-0.5 -right-0.5"></span>
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Baldwin AI &bull; Admissions Assistant
              </h4>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-1.5 py-0.2 rounded border border-amber-500/30">
                Estd. 1880
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Legacy of Excellence, Forward in Vision &bull; Bangalore
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-xs flex items-center space-x-1"
          title="Reset Chat Session"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${msg.sender === 'user'
                  ? 'bg-[#0B192C] text-white rounded-br-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <div
                className={`mt-1 text-[10px] text-right ${msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'
                  }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {/* Quick reply chips */}
            {msg.sender === 'bot' && msg.quickReplies && (
              <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                {msg.quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(reply)}
                    className="text-[11px] font-medium bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 hover:border-amber-300 px-2.5 py-1 rounded-full transition-all shadow-2xs"
                  >
                    {reply} &rarr;
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-1.5 bg-white border border-slate-200 px-3 py-2 rounded-full w-20 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
            <span
              className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></span>
            <span
              className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
              style={{ animationDelay: '0.4s' }}
            ></span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder="Ask Baldwin AI (e.g., 'What are the admission fees for Grade 1?')..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-slate-50"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2 bg-[#0B192C] hover:bg-[#1E3E62] text-amber-300 disabled:opacity-40 rounded-lg transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

