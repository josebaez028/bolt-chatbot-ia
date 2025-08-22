import React from 'react';
import { Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fadeInUp`}>
      <div className={`flex space-x-3 max-w-[85%] ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.isBot 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
            : 'bg-gradient-to-r from-slate-600 to-slate-700'
        }`}>
          {message.isBot ? (
            <Bot className="w-4 h-4 text-white" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message Bubble */}
        <div className={`relative px-4 py-3 rounded-2xl ${
          message.isBot
            ? 'bg-slate-800 text-slate-100 rounded-tl-sm'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-sm'
        } shadow-lg`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
          
          {/* Triangle pointer */}
          <div className={`absolute top-2 w-2 h-2 rotate-45 ${
            message.isBot
              ? 'bg-slate-800 -left-1'
              : 'bg-blue-600 -right-1'
          }`} />
          
          {/* Timestamp */}
          <p className={`text-xs mt-2 ${
            message.isBot ? 'text-slate-400' : 'text-blue-100'
          }`}>
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};