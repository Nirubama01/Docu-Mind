import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MessageSquareCode,
  Download,
  Calendar,
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Sparkles,
  GitCompare,
  FileCode,
  Image as ImageIcon,
} from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';

export const DocumentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { documents } = useDocuments();

  const [activeTab, setActiveTab] = useState('entities'); // 'entities' | 'rawText' | 'metadata'
  const [zoomLevel, setZoomLevel] = useState(100);

  // Find document by id (or fallback to first document if id is demo)
  const document = documents.find((d) => d.id === id) || documents[0];

  if (!document) {
    return (
      <EmptyState
        title="Document Not Found"
        description="The requested document does not exist or has been removed."
        actionLabel="Back to Documents"
        onAction={() => navigate('/documents')}
      />
    );
  }

  const extracted = document.extractedInfo || {};
  const isFailed = document.status === 'Failed';
  const isProcessing = document.status === 'Processing';

  return (
    <div className="space-y-6">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate('/documents')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Documents
          </button>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {document.name}
            </h1>
            <Badge type={document.type} />
            <Badge status={document.status} />
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span>Uploaded: {document.uploadedAt}</span>
            <span>&bull;</span>
            <span>Size: {document.size}</span>
            <span>&bull;</span>
            <span>Confidence: {document.confidenceScore || '98%'}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            icon={GitCompare}
            onClick={() => navigate(`/compare?docA=${document.id}`)}
          >
            Compare
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={MessageSquareCode}
            onClick={() => navigate(`/ask-ai?docId=${document.id}`)}
          >
            Ask Questions
          </Button>
        </div>
      </div>

      {/* Main Grid: Preview on Left, Extracted Intelligence on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Original Document Preview Placeholder (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card
            title="Document Preview"
            subtitle="Interactive visual rendering & bounding box inspection"
            action={
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-slate-600 text-xs">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(60, z - 10))}
                  title="Zoom Out"
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1 text-[11px] font-mono">{zoomLevel}%</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                  title="Zoom In"
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            }
            bodyClassName="p-4"
          >
            {/* Visual Document Placeholder */}
            <div className="relative w-full h-[520px] bg-slate-100/70 border border-slate-200 rounded-xl overflow-auto p-4 flex items-center justify-center">
              <div
                className="bg-white shadow-md border border-slate-200 rounded-lg p-8 w-full max-w-lg transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              >
                {/* Header mock of the physical document */}
                <div className="border-b-2 border-slate-800 pb-4 mb-4 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                      OFFICIAL RECORD
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                      {extracted.documentType || document.name}
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Doc ID: {document.id} &bull; Verified
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      {document.type}
                    </span>
                  </div>
                </div>

                {/* Simulated Content Body */}
                {isProcessing ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mx-auto" />
                    <p className="text-xs font-medium text-slate-600">
                      OCR Engine is currently processing this scan...
                    </p>
                  </div>
                ) : isFailed ? (
                  <div className="py-16 text-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                    <p className="text-xs font-semibold text-rose-700">
                      OCR Parsing Failed
                    </p>
                    <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                      {extracted.error || 'The image resolution is below readable OCR threshold.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 text-xs">
                    {/* Simulated Entity Highlights */}
                    <div className="p-3 bg-brand-50/50 rounded-lg border border-brand-100 flex items-center justify-between">
                      <span className="text-slate-600">Recipient / Customer:</span>
                      <strong className="text-slate-900 font-semibold">
                        {extracted.customer || extracted.recipientName || 'Arun Kumar'}
                      </strong>
                    </div>

                    {extracted.vendor && (
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                        <span className="text-slate-600">Vendor / Issuer:</span>
                        <strong className="text-slate-900 font-semibold">
                          {extracted.vendor}
                        </strong>
                      </div>
                    )}

                    {extracted.totalAmount && (
                      <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 flex items-center justify-between">
                        <span className="text-slate-600">Total Valuation:</span>
                        <strong className="text-emerald-700 font-bold text-sm">
                          {extracted.totalAmount}
                        </strong>
                      </div>
                    )}

                    {extracted.date && (
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                        <span className="text-slate-600">Recorded Date:</span>
                        <span className="text-slate-800 font-medium">
                          {extracted.date}
                        </span>
                      </div>
                    )}

                    {/* Watermark badge */}
                    <div className="mt-8 pt-4 border-t border-slate-200 text-center">
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                        DocuMind Optical Character Recognition Verified &bull; 98.5% Fidelity
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom preview controls */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                OCR confidence threshold passed
              </span>
              <span>Showing Page 1 of {document.pageCount || 1}</span>
            </div>
          </Card>
        </div>

        {/* Right Column: Extracted Information & Intelligence Tabs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card
            title="Extracted Intelligence"
            subtitle="Structured schema entities and AI semantic summary"
            bodyClassName="p-5"
          >
            {/* View switcher tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('entities')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'entities'
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                Key Entities
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rawText')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'rawText'
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                Raw OCR Text
              </button>
            </div>

            {/* Tab 1: Key Entities */}
            {activeTab === 'entities' && (
              <div className="space-y-4">
                {/* AI Executive Summary */}
                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-700 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Summary
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {document.summary || 'Summary unavailable.'}
                  </p>
                </div>

                {/* Key-Value Pair Extraction List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Detected Metadata
                  </h4>

                  <div className="border border-slate-200/80 rounded-xl divide-y divide-slate-100 overflow-hidden text-xs">
                    {Object.entries(extracted).map(([key, value]) => {
                      if (key === 'lineItems' || typeof value === 'object') return null;
                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between p-3 bg-white hover:bg-slate-50/50 transition-colors"
                        >
                          <span className="capitalize text-slate-500 font-medium">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className="font-semibold text-slate-900 text-right truncate max-w-[200px]">
                            {String(value)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Line Items if available (e.g. Invoice) */}
                {extracted.lineItems && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Line Items ({extracted.lineItems.length})
                    </h4>
                    <div className="border border-slate-200/80 rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[11px] text-slate-500 font-semibold">
                          <tr>
                            <th className="p-2.5">Item</th>
                            <th className="p-2.5 text-right">Qty</th>
                            <th className="p-2.5 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {extracted.lineItems.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-2.5 font-medium text-slate-800">
                                {item.description}
                              </td>
                              <td className="p-2.5 text-right text-slate-500">
                                {item.qty}
                              </td>
                              <td className="p-2.5 text-right font-semibold text-slate-900">
                                {item.amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Raw Text */}
            {activeTab === 'rawText' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Full text tokenized for vector retrieval and RAG question-answering:
                </p>
                <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs max-h-96 overflow-y-auto leading-relaxed border border-slate-800 whitespace-pre-wrap">
                  {document.rawText || 'No text extracted yet.'}
                </div>
              </div>
            )}

            {/* CTA to Ask AI */}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <Button
                variant="primary"
                size="md"
                icon={MessageSquareCode}
                onClick={() => navigate(`/ask-ai?docId=${document.id}`)}
                className="w-full"
              >
                Ask AI about this Document
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;
