
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Cpu,
  ArrowLeft,
} from 'lucide-react';

import { useDocuments } from '../context/DocumentContext';
import UploadZone from '../components/upload/UploadZone';
import UploadProgress from '../components/upload/UploadProgress';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const UploadDocument = () => {
  const { addDocument } = useDocuments();
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadState, setUploadState] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFilesSelected = (newFiles) => {
    setSelectedFiles((previousFiles) => [
      ...previousFiles,
      ...newFiles,
    ]);

    setErrorMessage('');
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((previousFiles) =>
      previousFiles.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setUploadState('idle');
    setProgress(0);
    setErrorMessage('');
  };

  const handleStartUpload = async () => {
    if (selectedFiles.length === 0 || uploadState === 'uploading' ||
        uploadState === 'processing') {
      return;
    }

    setUploadState('uploading');
    setProgress(0);
    setErrorMessage('');

    let successfulUploads = 0;
    const totalFiles = selectedFiles.length;

    try {
      for (let index = 0; index < totalFiles; index += 1) {
        const file = selectedFiles[index];

        setUploadState('uploading');

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: formData,
        });

        let result;

        try {
          result = await response.json();
        } catch {
          throw new Error(
            `The server returned an invalid response for ${file.name}.`
          );
        }

        if (!response.ok) {
          const detail =
            typeof result.detail === 'string'
              ? result.detail
              : `HTTP ${response.status}`;

          throw new Error(`Failed to upload ${file.name}: ${detail}`);
        }

        if (result.id == null) {
          throw new Error(
            `The server did not return a database ID for ${file.name}.`
          );
        }

        setUploadState('processing');

        const extension = file.name.split('.').pop().toUpperCase();
        const type = ['JPG', 'JPEG', 'PNG'].includes(extension)
          ? 'JPG'
          : extension;

        const formattedSize =
          file.size >= 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${Math.max(1, Math.round(file.size / 1024))} KB`;

        const newDocument = {
          // Frontend ID is separate from the backend database ID.
          id: `doc-${Date.now()}-${index}`,
          backendId: Number(result.id),
          name: result.filename || file.name,
          type,
          size: formattedSize,
          uploadedAt: new Date().toLocaleString(),
          status: 'Processed',
          pageCount: type === 'PDF' ? 2 : 1,
          confidenceScore: 'Processed by backend',
          extractedInfo: {
            documentType: `${type} Document`,
            fileName: result.filename || file.name,
            fileSize: formattedSize,
            status: 'Backend processed and indexed',
            date: new Date().toLocaleDateString('en-GB'),
            entitiesFound: 'See extracted document content',
            summary: `Processed by the DocuMind backend: ${file.name}`,
          },
          summary: `Backend-processed document: ${file.name}`,
          rawText: result.extracted_text || '',
        };

        // Add to the frontend only after backend upload succeeds.
        addDocument(newDocument);

        successfulUploads += 1;
        setProgress(
          Math.round((successfulUploads / totalFiles) * 100)
        );
      }

      setUploadState('completed');
      setSelectedFiles([]);
    } catch (error) {
      console.error('DocuMind upload failed:', error);

      setErrorMessage(
        error.message ||
          'Document upload failed. Check that the backend is running.'
      );

      // Already successful uploads remain in the document list.
      setUploadState(
        successfulUploads > 0 ? 'completed' : 'idle'
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate('/documents')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Documents
          </button>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Upload Documents
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Upload PDFs, images, and text files for backend document
            processing, indexing, and AI search.
          </p>
        </div>
      </div>

      {/* Upload errors */}
      {errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      {/* Upload success */}
      {uploadState === 'completed' && !errorMessage && (
        <div
          role="status"
          className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
        >
          Upload completed. Your document was sent to the backend and
          indexed successfully.
        </div>
      )}

      {/* File selection */}
      <UploadZone onFilesSelected={handleFilesSelected} />

      {/* Upload progress */}
      <UploadProgress
        files={selectedFiles}
        uploadState={uploadState}
        progress={progress}
        onRemoveFile={handleRemoveFile}
        onStartUpload={handleStartUpload}
        onReset={handleReset}
        onViewDocuments={() => navigate('/documents')}
      />

      {/* Feature cards */}
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
              Processes supported PDFs, images, and text files through
              the backend document processor.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-800">
              Document Indexing
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Extracted content and embeddings are saved by the backend
              when processing succeeds.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-800">
              Document-Specific AI
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Each successful upload stores its backend ID for use
              when asking questions about that document.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
