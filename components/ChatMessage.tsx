import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { Terminal, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-8 animate-cinematic-fade-up ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
        
        {/* Avatar */}
        <div className={`
          w-8 h-8 flex items-center justify-center shrink-0 rounded-lg shadow-sm border transition-all duration-500
          ${isUser 
            ? 'bg-gradient-to-br from-rialo-black to-rialo-charcoal border-rialo-black text-rialo-cream' 
            : 'bg-[#E5E1D4] border-transparent text-rialo-black'
          }
        `}>
          {isUser ? <User size={14} /> : <Terminal size={14} />}
        </div>

        {/* Bubble */}
        <div className={`
          relative p-5 text-sm md:text-[15px] leading-7 tracking-wide shadow-sm transition-all duration-300 hover:shadow-md
          ${isUser 
            ? 'bg-gradient-to-br from-rialo-black to-[#1a1a1a] text-[#EFECE2] rounded-2xl rounded-tr-sm' 
            : 'bg-white/60 backdrop-blur-md border border-white/40 text-rialo-black rounded-2xl rounded-tl-sm'
          }
        `}>
          {/* Text Content */}
          <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : 'prose-neutral'}`}>
             <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
          
          {/* Timestamp or Tiny decoration */}
          <div className={`absolute bottom-2 ${isUser ? 'left-2' : 'right-2'} opacity-0 hover:opacity-20 transition-opacity duration-300`}>
             <div className="w-1 h-1 rounded-full bg-current" />
          </div>
        </div>
      </div>
    </div>
  );
};