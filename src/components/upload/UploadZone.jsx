import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Image, FileCode, AlertCircle } from 'lucide-react';

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.txt'];
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'text/plain',
];

export const UploadZone = ({ onFilesSelected }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const validateFiles = (fileList) => {
    const validFiles = [];
    let hasInvalid = false;

    Array.from(fileList).forEach((file) => {
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      const isAllowed =
        ALLOWED_EXTENSIONS.includes(ext) || ALLOWED_MIME_TYPES.includes(file.type);

      if (isAllowed) {
        validFiles.push(file);
      } else {
        hasInvalid = true;
      }
    });

    if (hasInvalid) {
      setErrorMessage(
        'Some files were skipped. Only PDF, JPG, PNG, and TXT files are supported.'
      );
    } else {
      setErrorMessage('');
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateFiles(e.target.files);
    }
    // reset input value so re-selecting same file triggers change
    e.target.value = '';
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 md:p-12 text-center transition-all ${
          isDragOver
            ? 'border-brand-500 bg-brand-50/50 scale-[1.005]'
            : 'border-slate-300 hover:border-brand-400 bg-white hover:bg-slate-50/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.txt"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4 shadow-sm border border-brand-100 group-hover:scale-105 transition-transform">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-slate-800">
          Drag and drop your documents here
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          Support for files up to 25MB each. Click to browse from your computer.
        </p>

        {/* Supported Format Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <FileText className="w-3.5 h-3.5" /> PDF
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
            <Image className="w-3.5 h-3.5" /> JPG / PNG
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
            <FileCode className="w-3.5 h-3.5" /> TXT
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-3 flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
