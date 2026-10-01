import React, { useState } from 'react';
import {
  Brain,
  User,
  Copy,
  Check,
  FileCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const ChatMessage = ({ message }) => {
  const isAI = message.sender === 'ai';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex gap-3 sm:gap-4 my-4 ${
        isAI ? 'justify-start' : 'justify-end'
      }`}
    >
      {/* AI Avatar */}
      {isAI && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-brand-500/20">
          <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm transition-all ${
          isAI
            ? 'bg-white border border-slate-200/90 text-slate-800 shadow-xs'
            : 'bg-brand-600 text-white shadow-xs rounded-br-xs'
        }`}
      >
        {/* Message Header (Sender name & timestamp) */}
        <div className="flex items-center justify-between gap-4 mb-1.5">
          <span
            className={`text-[11px] font-semibold tracking-wide ${
              isAI ? 'text-brand-600 flex items-center gap-1' : 'text-brand-100'
            }`}
          >
            {isAI ? (
              <>
                <Sparkles className="w-3 h-3" />
                DocuMind AI
              </>
            ) : (
              'You'
            )}
          </span>
          <span
            className={`text-[10px] ${
              isAI ? 'text-slate-400' : 'text-brand-200'
            }`}
          >
            {message.timestamp}
          </span>
        </div>

        {/* Message Text */}
        <div
          className={`leading-relaxed whitespace-pre-line text-xs sm:text-sm ${
            isAI ? 'text-slate-800' : 'text-white'
          }`}
        >
          {message.text}
        </div>

        {/* AI Citation & Source Badge */}
        {isAI && message.source && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-50/80 border border-brand-200/70 text-brand-800 text-[11px] font-medium">
              <FileCheck className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>Source: {message.source}</span>
            </div>

            <div className="flex items-center gap-2">
              {message.confidence && (
                <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {message.confidence} match
                </span>
              )}
              <button
                type="button"
                onClick={handleCopy}
                title="Copy response"
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm">
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
