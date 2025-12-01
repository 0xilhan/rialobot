import React from 'react';
import { SUGGESTED_QUESTIONS } from '../constants';
import { 
  ArrowRight, 
  Cpu, 
  Users, 
  Coins, 
  Scale, 
  HelpCircle 
} from 'lucide-react';

interface SuggestedActionsProps {
  onSelect: (question: string) => void;
}

// Map icons to questions for better UX
const getIconForQuestion = (question: string) => {
  if (question.includes("tech")) return <Cpu size={14} />;
  if (question.includes("founders")) return <Users size={14} />;
  if (question.includes("token")) return <Coins size={14} />;
  if (question.includes("Comparison")) return <Scale size={14} />;
  return <HelpCircle size={14} />;
};

export const SuggestedActions: React.FC<SuggestedActionsProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center gap-3 animate-cinematic-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
        <div className="h-[1px] w-8 bg-rialo-black/20"></div>
        <span className="text-[10px] font-mono font-bold text-rialo-black/40 uppercase tracking-[0.2em]">
          Quick Access
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {SUGGESTED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(q)}
            style={{ animationDelay: `${0.3 + (idx * 0.1)}s` }}
            className="
              group relative animate-cinematic-fade-up opacity-0 fill-mode-forwards
              flex items-center gap-3 px-5 py-3 
              bg-white hover:bg-rialo-cream-dark
              border border-rialo-black border-b-4 hover:border-b-[6px] active:border-b-0 active:translate-y-1
              text-rialo-black text-xs md:text-sm font-bold tracking-tight
              rounded-xl transition-all duration-150 ease-out
            "
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">
              {getIconForQuestion(q)}
            </span>
            {q}
            <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        ))}
      </div>
    </div>
  );
};