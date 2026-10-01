import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle2, ShieldCheck, Cpu, ArrowLeft } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import UploadZone from '../components/upload/UploadZone';
import UploadProgress from '../components/upload/UploadProgress';
import Button from '../components/common/Button';

export const UploadDocument = () => {
  const { addDocument } = useDocuments();
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadState, setUploadState] = useState('idle'); // 'idle' | 'uploading' | 'processing' | 'completed'
  const [progress, setProgress] = useState(0);

  const handleFilesSelected = (newFiles) => {
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setUploadState('idle');
    setProgress(0);
  };

  const handleStartUpload = () => {
    if (selectedFiles.length === 0) return;

    setUploadState('uploading');
    setProgress(15);

    // Simulated progress pipeline
    setTimeout(() => {
      setProgress(40);
    }, 600);

    setTimeout(() => {
      setUploadState('processing');
      setProgress(75);
    }, 1300);

    setTimeout(() => {
      setProgress(100);
      setUploadState('completed');

      // Add each file to global mock documents state
      selectedFiles.forEach((file, index) => {
        const ext = file.name.split('.').pop().toUpperCase();
        const type = ['JPG', 'JPEG', 'PNG'].includes(ext) ? 'JPG' : ext;
        const formattedSize =
          file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${(file.size / 1024).toFixed(0)} KB`;

        const newDoc = {
          id: `doc-${Date.now()}-${index}`,
          name: file.name,
          type: type,
          size: formattedSize,
          uploadedAt: 'Just now',
          status: 'Processed',
          pageCount: type === 'PDF' ? 2 : 1,
          confidenceScore: '98.0%',
          extractedInfo: {
            documentType: `${type} Document`,
            fileName: file.name,
            fileSize: formattedSize,
            status: 'Verified & Indexed',
            date: new Date().toLocaleDateString('en-GB'),
            entitiesFound: '8 standard fields',
            summary: `Automated OCR extraction completed for ${file.name}. Text vectorized for Q&A.`,
          },
          summary: `Extracted content for ${file.name}. Ready for queries and document comparison.`,
          rawText: `[DOCUMENT CONTENT FOR ${file.name}]\nProcessed successfully at ${new Date().toLocaleTimeString()}.\nKey metadata and entities indexed.`,
        };

        addDocument(newDoc);
      });
    }, 2200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate('/documents')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Documents
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Upload Documents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Ingest PDFs, images, and text files for automated OCR, entity extraction, and AI search.
          </p>
        </div>
      </div>

      {/* Main Upload Zone */}
      <UploadZone onFilesSelected={handleFilesSelected} />

      {/* Upload Progress & Selected Files Manager */}
      <UploadProgress
        files={selectedFiles}
        uploadState={uploadState}
        progress={progress}
        onRemoveFile={handleRemoveFile}
        onStartUpload={handleStartUpload}
        onReset={handleReset}
        onViewDocuments={() => navigate('/documents')}
      />

      {/* Feature Guidance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-3">
          <div className="p-2 bg-brand-50 text-brand-600 rounded-lg shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-800">
              Multi-Format Parser
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Supports scanned PDF invoices, ID cards, certificates, and raw txt files.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-800">
              Confidence Scoring
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Each extracted entity receives an OCR confidence score to highlight ambiguities.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-800">
              Academic Safe Mode
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Currently running in frontend simulated mode without transmitting real server data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
