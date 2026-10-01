import React, { createContext, useContext, useState } from 'react';
import {
  MOCK_DOCUMENTS,
  MOCK_STATISTICS,
  MOCK_CHAT_SESSIONS,
  MOCK_GENERIC_ANSWERS,
  MOCK_USER,
} from '../data/mockData';

const DocumentContext = createContext(null);

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [chatSessions, setChatSessions] = useState(MOCK_CHAT_SESSIONS);
  const [stats, setStats] = useState(MOCK_STATISTICS);
  const [user, setUser] = useState(MOCK_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Authentication mock handlers
  const login = (email, password) => {
    setIsAuthenticated(true);
    setUser({
      name: email.split('@')[0].replace('.', ' ') || 'Demo User',
      email: email || 'demo@documind.ai',
      role: 'Project Lead & Researcher',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80',
    });
    return true;
  };

  const register = (name, email, password) => {
    setIsAuthenticated(true);
    setUser({
      name: name || 'Arun Kumar',
      email: email,
      role: 'Document Analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80',
    });
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Add newly uploaded mock document
  const addDocument = (newDoc) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalDocuments: prev.totalDocuments + 1,
      processedDocuments: prev.processedDocuments + 1,
    }));
  };

  // Delete a document
  const deleteDocument = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    setStats((prev) => ({
      ...prev,
      totalDocuments: Math.max(0, prev.totalDocuments - 1),
    }));
  };

  // Send an AI question and get a simulated response
  const sendChatMessage = (docId, questionText) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: questionText,
      timestamp: timeStr,
    };

    // Append user message immediately
    setChatSessions((prev) => ({
      ...prev,
      [docId]: [...(prev[docId] || []), userMsg],
    }));

    // Increment questions asked count
    setStats((prev) => ({ ...prev, questionsAsked: prev.questionsAsked + 1 }));

    // Find document reference
    const doc = documents.find((d) => d.id === docId);
    const docName = doc ? doc.name : 'Document';

    // Formulate realistic AI response
    let answerText = `Based on our AI entity analysis of ${docName}, the document validates the requested inquiry.`;
    let sourceCitation = `${docName} — Page 1`;

    const lowerQ = questionText.toLowerCase();

    // Check specific preset questions
    if (lowerQ.includes('total') || lowerQ.includes('amount') || lowerQ.includes('cost') || lowerQ.includes('price')) {
      if (doc?.extractedInfo?.totalAmount) {
        answerText = `The total invoice amount is ${doc.extractedInfo.totalAmount}.`;
        sourceCitation = `${docName} — Page 1`;
      } else {
        answerText = `The identified financial total is ₹35,000 including applicable taxes.`;
        sourceCitation = `${docName} — Page 1`;
      }
    } else if (lowerQ.includes('customer') || lowerQ.includes('buyer') || lowerQ.includes('client') || lowerQ.includes('who')) {
      const cust = doc?.extractedInfo?.customer || doc?.extractedInfo?.recipientName || 'Arun Kumar';
      answerText = `The verified party recorded on this document is ${cust}.`;
      sourceCitation = `${docName} — Header Section`;
    } else if (lowerQ.includes('date') || lowerQ.includes('when')) {
      const dateVal = doc?.extractedInfo?.date || doc?.extractedInfo?.issueDate || '15-06-2026';
      answerText = `The document records a primary date of ${dateVal}.`;
      sourceCitation = `${docName} — Header Section`;
    } else {
      // Find matching generic rule or default summary
      const match = MOCK_GENERIC_ANSWERS.find((item) =>
        item.keywords.some((k) => lowerQ.includes(k))
      );
      if (match) {
        answerText = match.answer(docName);
        sourceCitation = match.source(docName);
      } else {
        answerText = `According to ${docName}, the system verified the extracted content: "${doc?.summary || 'Standard structured record'}". All confidence parameters are within normal variance.`;
        sourceCitation = `${docName} — Section 1`;
      }
    }

    const aiMsg = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: answerText,
      source: sourceCitation,
      confidence: '98%',
      timestamp: timeStr,
    };

    // Return a promise to simulate realistic AI generation delay (600ms)
    return new Promise((resolve) => {
      setTimeout(() => {
        setChatSessions((prev) => ({
          ...prev,
          [docId]: [...(prev[docId] || []), aiMsg],
        }));
        resolve(aiMsg);
      }, 700);
    });
  };

  const getChatForDoc = (docId) => {
    return chatSessions[docId] || [];
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        stats,
        user,
        isAuthenticated,
        login,
        register,
        logout,
        addDocument,
        deleteDocument,
        sendChatMessage,
        getChatForDoc,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};
