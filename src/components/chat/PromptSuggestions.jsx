import React from 'react';
import { Sparkles } from 'lucide-react';

export const PromptSuggestions = ({ onSelectPrompt, docType }) => {
  const normalizedType = String(docType || '').toLowerCase();

  const isInvoice =
    normalizedType.includes('invoice') ||
    normalizedType.includes('bill');

  const defaultPrompts = isInvoice
    ? [
        'What is the total invoice amount?',
        'Who is the customer and vendor?',
        'What are the invoice date and due date?',
        'Summarize the line items and taxes.',
      ]
    : [
        'Summarize this document.',
        'What are the main topics covered?',
        'List the important facts and figures.',
        'What conclusions or recommendations are mentioned?',
      ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3 px-1">
      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 shrink-0">
        <Sparkles className="w-3 h-3 text-brand-500" />
        Suggested questions:
      </span>

      {defaultPrompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelectPrompt(prompt)}
          className="text-xs bg-white hover:bg-brand-50 hover:text-brand-700 text-slate-600 px-3 py-1 rounded-full border border-slate-200 transition-all shadow-2xs hover:border-brand-300"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default PromptSuggestions;
