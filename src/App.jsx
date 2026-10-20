import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DocumentProvider } from './context/DocumentContext';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import DocumentDetails from './pages/DocumentDetails';
import UploadDocument from './pages/UploadDocument';
import AskAI from './pages/AskAI';
import CompareDocuments from './pages/CompareDocuments';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

export const App = () => {
  return (
    <DocumentProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* App Shell with Sidebar & Navbar */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/documents/:id" element={<DocumentDetails />} />
            <Route path="/upload" element={<UploadDocument />} />
            <Route path="/ask-ai" element={<AskAI />} />
            {/* Temporarily disabled for the demo; preserve for future restoration.
            <Route path="/compare" element={<CompareDocuments />} />
            */}
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </DocumentProvider>
  );
};

export default App;
