import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Trash2, Cpu, Sparkles, ShieldCheck, Zap, Activity, Box } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { SuggestedActions } from './components/SuggestedActions';
import { generateResponse } from './services/geminiService';
import { KNOWLEDGE_BASE } from './constants';
import { Message } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "System initialized. I am **Rialo Bot**, powered by Subzero Labs.\n\nReady to analyze the protocol, architecture, or ecosystem parameters. What is your query?",
      timestamp: Date.now()
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 800);
  }, []);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessageId = Date.now().toString();

    const newUserMsg: Message = {
      id: userMessageId,
      role: 'user',
      text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateResponse({
      prompt: text,
      knowledgeBase: KNOWLEDGE_BASE
    });

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);

    setTimeout(() => inputRef.current?.focus(), 120);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans text-rialo-black bg-[#EFECE2] flex items-center justify-center">

      {/* ---- BACKGROUND LAYERS ---- */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#EFECE2] via-[#E5E1D4] to-[#DCD8CB] bg-[length:200%_200%] animate-gradient-move" />

      {/* Cube Left */}
      <div className="absolute top-[15%] left-[10%] opacity-20 pointer-events-none scale-[0.65] md:scale-100 animate-float-slow">
        <Box size={120} strokeWidth={0.5} className="text-rialo-black animate-spin-slow" />
      </div>

      {/* Cube Right */}
      <div className="absolute bottom-[20%] right-[5%] opacity-10 pointer-events-none scale-[0.6] md:scale-100 animate-float-delayed">
        <Box size={200} strokeWidth={0.5} className="text-rialo-black animate-reverse-spin-slow" />
      </div>

      {/* Blur Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-white mix-blend-soft-light blur-[70px] opacity-60 animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-[#111] mix-blend-overlay blur-[90px] opacity-5 pointer-events-none" />

      <div className="bg-grain" />

      {/* ---- MAIN CARD ---- */}
      <div className="
        relative z-10 flex flex-col 
        min-h-[100vh] md:min-h-[92vh]
        w-full md:max-w-5xl
        bg-rialo-cream/80 backdrop-blur-2xl
        md:border md:border-white/40 shadow-3d-card md:rounded-3xl
        overflow-hidden transition-all duration-700 animate-cinematic-fade-in
      ">

        {/* ---- HEADER ---- */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-rialo-black/5 bg-white/40 backdrop-blur-md sticky top-0 z-20">
          
          <div className="flex items-center gap-4 group cursor-default">
            <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-rialo-black to-gray-500 shadow-inner">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-rialo-cream">
                <img 
                  src="https://pbs.twimg.com/profile_images/1950265537784926208/qbjSWMDP_400x400.jpg"
                  alt="Rialo Logo"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="font-bold text-xl tracking-tight leading-none flex items-center gap-2">
                Rialo Bot
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-rialo-black text-rialo-cream shadow-sm">BETA</span>
              </h1>

              <div className="flex items-center gap-3 mt-1.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-rialo-black/60">Subzero Labs</span>

                <div className="flex gap-1.5 opacity-40">
                  <ShieldCheck size={10} strokeWidth={2.5} />
                  <Zap size={10} strokeWidth={2.5} />
                  <Activity size={10} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setMessages([messages[0]])}
            className="p-3 text-rialo-black/40 hover:text-red-500 rounded-xl hover:bg-red-500/5 transition-all group"
            title="Reset Session"
          >
            <Trash2 size={18} className="group-hover:rotate-12 transition-transform" />
          </button>
        </header>

        {/* ---- CHAT AREA ---- */}
        <main className="flex-1 min-h-0 overflow-y-auto scroll-smooth no-scrollbar relative">
          <div className="min-h-full flex flex-col px-4 md:px-8 pb-2">
            <div className="mt-auto max-w-4xl mx-auto w-full flex flex-col">

              {messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {isLoading && (
                <div className="flex justify-start mb-6 w-full animate-cinematic-fade-up">
                  <div className="flex items-center gap-4 pl-1">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="absolute inset-0 border-2 border-rialo-black/20 rounded-full animate-ping" />
                      <Cpu size={14} className="text-rialo-black relative z-10" />
                    </div>

                    <div className="text-[10px] font-mono text-rialo-black/40 uppercase tracking-widest flex items-center gap-2">
                      <span className="animate-pulse">Processing Block Data</span>
                      <span className="w-1 h-1 bg-rialo-black/40 rounded-full animate-bounce" />
                      <span className="w-1 h-1 bg-rialo-black/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-1 h-1 bg-rialo-black/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} className="h-1" />
            </div>
          </div>
        </main>

        {/* ---- INPUT AREA ---- */}
        <footer className="p-4 md:p-6 relative z-20 bg-[#EFECE2]/70 backdrop-blur-xl">
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#EFECE2] to-transparent pointer-events-none" />

          <div className="relative max-w-4xl mx-auto">

            {!isLoading && messages.length < 3 && (
              <SuggestedActions onSelect={(q) => handleSend(q)} />
            )}

            <div className="relative group mt-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rialo-black/10 to-rialo-black/5 rounded-2xl blur opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all" />

              <div className="relative bg-[#EFECE2]/90 backdrop-blur-xl rounded-2xl border-2 border-white/50 shadow-inner-depth transition-all group-focus-within:border-rialo-black/20 group-focus-within:bg-white">

                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter command or query..."
                  className="w-full pl-6 pr-16 py-5 bg-transparent border-none focus:ring-0 outline-none resize-none min-h-[64px] text-rialo-black text-lg"
                  rows={1}
                />

                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className={`
                    absolute right-3 bottom-3 p-3 rounded-xl transition-all
                    ${(isLoading || !input.trim())
                      ? 'text-rialo-black/20 cursor-not-allowed scale-90'
                      : 'bg-rialo-black text-rialo-cream shadow-3d-btn hover:shadow-3d-btn-hover active:shadow-3d-btn-active active:translate-y-[4px] hover:translate-y-[-2px]'
                    }
                  `}
                >
                  {isLoading ? <Sparkles size={20} className="animate-spin" /> : <ArrowUpRight size={22} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 px-2 opacity-40 hover:opacity-100 transition-opacity">
              <div className="font-mono text-[9px] tracking-widest flex items-center gap-1 text-rialo-black">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                SYSTEM ONLINE
              </div>

              <div className="font-mono text-[9px] tracking-widest text-rialo-black">
                SUBZERO LABS // V1.0.2
              </div>
            </div>

          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
