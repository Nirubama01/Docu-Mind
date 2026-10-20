
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Files,
  FileCheck2,
  MessageSquareCode,
  Clock,
  Upload,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import StatCard from '../components/dashboard/StatCard';
import DocumentTable from '../components/documents/DocumentTable';
import Button from '../components/common/Button';

export const Dashboard = () => {
  const { documents, stats, user, deleteDocument } = useDocuments();
  const navigate = useNavigate();

  // Get most recent 5 documents
  const recentDocuments = documents.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-brand-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI Document Intelligence Platform
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Researcher'}!
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            DocuMind is ready for document extraction and natural language
            Q&amp;A. Explore recent documents or start a new extraction.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={Upload}
              onClick={() => navigate('/upload')}
            >
              Upload Document
            </Button>

            <Button
              variant="secondary"
              size="md"
              icon={MessageSquareCode}
              onClick={() => navigate('/ask-ai')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              Ask AI
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            System Overview &amp; Metrics
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Real-time sync
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Documents"
            value={stats.totalDocuments}
            subtitle="Uploaded across PDF, JPG, TXT"
            icon={Files}
            trend="+3 this week"
            trendType="positive"
            color="brand"
          />

          <StatCard
            title="Processed Documents"
            value={stats.processedDocuments}
            subtitle="Extracted with high confidence"
            icon={FileCheck2}
            trend={`${Math.round(
              (stats.processedDocuments / (stats.totalDocuments || 1)) * 100
            )}% completion`}
            trendType="positive"
            color="emerald"
          />

          <StatCard
            title="Questions Asked"
            value={stats.questionsAsked}
            subtitle="Natural language RAG queries"
            icon={MessageSquareCode}
            trend="+12 today"
            trendType="positive"
            color="purple"
          />

          <StatCard
            title="Avg Processing Time"
            value={stats.avgProcessingTime || '1.4s'}
            subtitle="Optical character & entity extraction"
            icon={Clock}
            trend="Sub-2s SLA"
            trendType="positive"
            color="amber"
          />
        </div>
      </div>

      {/* Recent Documents Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Documents
            </h2>
            <p className="text-xs text-slate-500">
              Latest documents uploaded and processed by DocuMind
            </p>
          </div>

          <Link
            to="/documents"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>View All Documents</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Reusable DocumentTable with recent files */}
        <DocumentTable
          documents={recentDocuments}
          onDelete={deleteDocument}
          emptyMessage="No documents uploaded yet. Click Upload Document to add your first file."
        />
      </div>

      {/* Quick Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>

          <h3 className="text-sm font-semibold text-slate-800">
            Automated OCR &amp; Layout Detection
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Detects key-value pairs, tables, and paragraphs from scans and
            digital PDFs.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <MessageSquareCode className="w-5 h-5" />
          </div>

          <h3 className="text-sm font-semibold text-slate-800">
            Citation-Backed Answers
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Every question answered by the AI cites the precise page number
            and document snippet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;