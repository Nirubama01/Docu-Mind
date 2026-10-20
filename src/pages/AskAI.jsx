import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Brain,
  Send,
  Sparkles,
  FileText,
  RotateCcw,
  Bot,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import ChatMessage from '../components/chat/ChatMessage';
import PromptSuggestions from '../components/chat/PromptSuggestions';
import Button from '../components/common/Button';

export const AskAI = () => {
  const { documents, getChatForDoc, sendChatMessage } = useDocuments();
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected document ID
  const urlDocId = searchParams.get('docId');
  const [selectedDocId, setSelectedDocId] = useState(
    urlDocId || (documents[0]?.id ?? 'doc-001')
  );

  const [inputQuestion, setInputQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // Sync selected doc with URL
  useEffect(() => {
    if (urlDocId && urlDocId !== selectedDocId) {
      setSelectedDocId(urlDocId);
    }
  }, [urlDocId]);

  const handleDocChange = (newDocId) => {
    setSelectedDocId(newDocId);
    setSearchParams({ docId: newDocId });
  };

  const selectedDocument =
    documents.find((d) => d.id === selectedDocId) || documents[0];

  const messages = getChatForDoc(selectedDocId);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const question = (textToSend || inputQuestion).trim();
    if (!question || isTyping) return;

    setInputQuestion('');
    setIsTyping(true);

    try {
      await sendChatMessage(selectedDocId, question);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto">
      {/* Top Document Context Header */}
      <div className="bg-white rounded-t-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
              DocuMind AI Assistant
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                RAG Active
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              Ask questions across document text, OCR coordinates, and extracted fields.
            </p>
          </div>
        </div>

        {/* Selected Document Dropdown */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="doc-select"
            className="text-xs font-semibold text-slate-600 whitespace-nowrap"
          >
            Target Document:
          </label>
          <div className="relative">
            <select
              id="doc-select"
              value={selectedDocId}
              onChange={(e) => handleDocChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 text-xs font-medium bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer"
            >
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} ({doc.type})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {selectedDocument && (
            <Link
              to={`/documents/${selectedDocument.id}`}
              className="text-slate-400 hover:text-slate-700 p-1.5 hover:bg-slate-100 rounded-md transition-colors"
              title="Inspect Document"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 bg-slate-50/50 border-x border-slate-200/90 p-4 sm:p-6 overflow-y-auto space-y-4">
        {/* Welcome notice */}
        <div className="p-4 bg-white/80 rounded-xl border border-slate-200 text-center max-w-lg mx-auto">
          <p className="text-xs font-medium text-slate-700">
            Currently analyzing: <strong className="text-slate-900">{selectedDocument?.name || 'Document'}</strong>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Answers are generated using document retrieval and AI, with source documents cited where available.
          </p>
        </div>

        {/* Conversation list */}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 items-center text-xs text-slate-500">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-slate-500 ml-2">
                Retrieving relevant chunks from {selectedDocument?.name}...
              </span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Bottom Input Area */}
      <div className="bg-white rounded-b-2xl border border-slate-200/90 p-4 shadow-sm space-y-2">
        {/* Quick prompt suggestions */}
        <PromptSuggestions
          onSelectPrompt={(text) => handleSend(text)}
          docType={selectedDocument?.type}
        />

        {/* Text Input & Send Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask a question about ${selectedDocument?.name || 'this document'}... (Press Enter)`}
              disabled={isTyping}
              className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Send}
            isLoading={isTyping}
            onClick={() => handleSend()}
            disabled={!inputQuestion.trim() || isTyping}
            className="rounded-xl px-5 py-3 shrink-0"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AskAI;
