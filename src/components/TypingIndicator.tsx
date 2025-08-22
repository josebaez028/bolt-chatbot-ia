import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start animate-fadeInUp">
      <div className="flex space-x-3 max-w-[85%]">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>

        {/* Typing bubble */}
        <div className="relative px-4 py-3 bg-slate-800 rounded-2xl rounded-tl-sm shadow-lg">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          
          {/* Triangle pointer */}
          <div className="absolute top-2 w-2 h-2 bg-slate-800 rotate-45 -left-1" />
        </div>
      </div>
    </div>
  );
};