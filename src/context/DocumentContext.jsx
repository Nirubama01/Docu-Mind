
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

import {
  MOCK_STATISTICS,
  MOCK_CHAT_SESSIONS,
  MOCK_USER,
} from '../data/mockData';

const DocumentContext = createContext(null);

const API_BASE_URL = 'http://127.0.0.1:8000';

const formatDocument = (item) => {
  const filename = item.filename || 'Untitled document';
  const extension = filename.includes('.')
    ? filename.split('.').pop().toUpperCase()
    : 'FILE';

  const type = ['JPG', 'JPEG', 'PNG'].includes(extension)
    ? 'JPG'
    : extension;

  const content = item.content || '';
  const backendId = Number(item.id);

  return {
    // Keep frontend and backend IDs separate.
    id: `doc-backend-${item.id}`,
    backendId,
    name: filename,
    type,
    size: 'Saved document',
    uploadedAt: '',
    status: 'Processed',
    pageCount: type === 'PDF' ? 2 : 1,
    confidenceScore: 'Previously processed',
    extractedInfo: {
      documentType: `${type} Document`,
      fileName: filename,
      fileSize: 'Saved document',
      status: 'Stored in backend',
      date: '',
      entitiesFound: 'See extracted document content',
      summary: content.slice(0, 200),
    },
    summary: content.slice(0, 300),
    rawText: content,
  };
};

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(true);
  const [documentsError, setDocumentsError] = useState('');

  const [chatSessions, setChatSessions] = useState(
    MOCK_CHAT_SESSIONS
  );
  const [stats, setStats] = useState(MOCK_STATISTICS);
  const [user, setUser] = useState(MOCK_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Load persisted documents whenever the application starts.
  useEffect(() => {
    let cancelled = false;

    const loadDocuments = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/documents/`,
          {
            params: {
              skip: 0,
              limit: 100,
            },
            timeout: 15000,
          }
        );

        const rows = Array.isArray(response.data)
          ? response.data
          : response.data?.items ??
            response.data?.documents ??
            [];

        const savedDocuments = rows.map(formatDocument);

        if (!cancelled) {
          setDocuments(savedDocuments);

          setStats((previous) => ({
            ...previous,
            totalDocuments: savedDocuments.length,
            processedDocuments: savedDocuments.filter(
              (document) => document.status === 'Processed'
            ).length,
          }));

          setDocumentsError('');
        }
      } catch (error) {
        console.error(
          'Failed to load saved documents:',
          error
        );

        if (!cancelled) {
          setDocumentsError(
            'Unable to load saved documents from the backend.'
          );
        }
      } finally {
        if (!cancelled) {
          setDocumentsLoading(false);
        }
      }
    };

    loadDocuments();

    return () => {
      cancelled = true;
    };
  }, []);

  // Mock authentication.
  const login = (email, password) => {
    setIsAuthenticated(true);

    setUser({
      name: email.split('@')[0].replace('.', ' ') || 'Demo User',
      email: email || 'demo@documind.ai',
      role: 'Project Lead & Researcher',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80',
    });

    return true;
  };

  const register = (name, email, password) => {
    setIsAuthenticated(true);

    setUser({
      name: name || 'Arun Kumar',
      email,
      role: 'Document Analyst',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80',
    });

    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Add a document after its backend upload succeeds.
  const addDocument = (newDoc) => {
    setDocuments((previous) => {
      // Avoid duplicate entries for the same backend record.
      if (
        newDoc.backendId != null &&
        previous.some(
          (document) =>
            Number(document.backendId) === Number(newDoc.backendId)
        )
      ) {
        return previous.map((document) =>
          Number(document.backendId) === Number(newDoc.backendId)
            ? { ...document, ...newDoc }
            : document
        );
      }

      return [newDoc, ...previous];
    });

    setStats((previous) => ({
      ...previous,
      totalDocuments: previous.totalDocuments + 1,
      processedDocuments: previous.processedDocuments + 1,
    }));
  };

  // Remove a document from frontend state.
  // This does not delete the database record.
  // Delete from the backend first, then update frontend state.
  const deleteDocument = async (id) => {
    const document = documents.find(
      (item) =>
        String(item.id) === String(id) ||
        String(item.backendId) === String(id)
    );

    if (!document) {
      throw new Error("Document was not found in the current list.");
    }

    const backendId = Number(
      document.backendId ??
        String(document.id).replace("doc-backend-", "")
    );

    if (!Number.isInteger(backendId) || backendId <= 0) {
      throw new Error("Invalid backend document ID.");
    }

    await axios.delete(
      `${API_BASE_URL}/documents/${backendId}`,
      { timeout: 30000 }
    );

    setDocuments((previous) =>
      previous.filter(
        (item) =>
          Number(
            item.backendId ??
              String(item.id).replace("doc-backend-", "")
          ) !== backendId
      )
    );

    setStats((previous) => ({
      ...previous,
      totalDocuments: Math.max(0, previous.totalDocuments - 1),
      processedDocuments: Math.max(
        0,
        previous.processedDocuments -
          (document.status === "Processed" ? 1 : 0)
      ),
    }));

    setChatSessions((previous) => {
      const next = { ...previous };
      delete next[document.id];
      delete next[backendId];
      return next;
    });

    return true;
  };
  // Send the user's question to the RAG backend.
  const sendChatMessage = async (docId, questionText) => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: questionText,
      timestamp: timeStr,
    };

    setChatSessions((previous) => ({
      ...previous,
      [docId]: [...(previous[docId] || []), userMsg],
    }));

    setStats((previous) => ({
      ...previous,
      questionsAsked: previous.questionsAsked + 1,
    }));

    try {
      const document = documents.find(
        (item) =>
          item.id === docId ||
          String(item.backendId) === String(docId)
      );

      const rawBackendId =
        document?.backendId ??
        document?.backend_id ??
        (typeof docId === 'number' ? docId : null);

      const backendDocumentId =
        rawBackendId !== null &&
        rawBackendId !== undefined &&
        String(rawBackendId).trim() !== '' &&
        Number.isInteger(Number(rawBackendId)) &&
        Number(rawBackendId) > 0
          ? Number(rawBackendId)
          : null;

      const payload = {
        question: questionText,
      };

      if (backendDocumentId !== null) {
        payload.document_id = backendDocumentId;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/v1/rag/query`,
        payload,
        {
          timeout: 120000,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response.data;
      const sources = Array.isArray(result.sources)
        ? result.sources
        : [];

      const sourceText = sources.length
        ? sources
            .map((source) => {
              const filename = source.filename || 'Document';

              return source.document_id != null
                ? `${filename} (ID ${source.document_id})`
                : filename;
            })
            .join(', ')
        : 'No source documents returned';

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.answer || 'The backend returned no answer.',
        source: sourceText,
        confidence: null,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setChatSessions((previous) => ({
        ...previous,
        [docId]: [...(previous[docId] || []), aiMsg],
      }));

      return aiMsg;
    } catch (error) {
      const detail =
        error.response?.data?.detail ||
        error.message ||
        'Unknown backend error';

      const errorMsg = {
        id: `ai-error-${Date.now()}`,
        sender: 'ai',
        text: `Unable to get an answer from the RAG backend: ${detail}`,
        source: 'Backend request failed',
        confidence: null,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setChatSessions((previous) => ({
        ...previous,
        [docId]: [...(previous[docId] || []), errorMsg],
      }));

      return errorMsg;
    }
  };

  const getChatForDoc = (docId) =>
    chatSessions[docId] || [];

  return (
    <DocumentContext.Provider
      value={{
        documents,
        documentsLoading,
        documentsError,
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
    throw new Error(
      'useDocuments must be used within a DocumentProvider'
    );
  }

  return context;
};
