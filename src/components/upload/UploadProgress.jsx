import React from 'react';
import {
  FileText,
  Image,
  FileCode,
  X,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Button from '../common/Button';

export const UploadProgress = ({
  files = [],
  uploadState, // 'idle' | 'uploading' | 'processing' | 'completed'
  progress = 0,
  onRemoveFile,
  onStartUpload,
  onReset,
  onViewDocuments,
}) => {
  if (files.length === 0) return null;

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <FileText className="w-5 h-5 text-red-500" />;
    if (['jpg', 'jpeg', 'png'].includes(ext))
      return <Image className="w-5 h-5 text-purple-500" />;
    if (ext === 'txt') return <FileCode className="w-5 h-5 text-sky-500" />;
    return <FileText className="w-5 h-5 text-slate-500" />;
  };

  const isWorking = uploadState === 'uploading' || uploadState === 'processing';
  const isDone = uploadState === 'completed';

  const getStatusLabel = () => {
    if (uploadState === 'uploading') return `Uploading documents (${progress}%)...`;
    if (uploadState === 'processing') return 'Extracting text & generating embeddings...';
    if (uploadState === 'completed') return 'Extraction & analysis complete!';
    return 'Ready to process';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            Selected Documents ({files.length})
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Review your files before initiating OCR and intelligence extraction
          </p>
        </div>
        {uploadState === 'idle' && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-rose-600 hover:text-rose-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* File List */}
      <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
        {files.map((file, idx) => (
          <div
            key={`${file.name}-${idx}`}
            className="flex items-center justify-between p-3.5 bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
                {getFileIcon(file.name)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate max-w-xs sm:max-w-md">
                  {file.name}
                </p>
                <p className="text-[11px] text-slate-400">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {uploadState === 'completed' ? (
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Ready
                </span>
              ) : isWorking ? (
                <span className="flex items-center gap-1 text-xs text-amber-600 font-medium animate-pulse">
                  <Clock className="w-4 h-4" /> Processing
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onRemoveFile(idx)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress UI */}
      {isWorking && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" />
              {getStatusLabel()}
            </span>
            <span className="font-semibold text-brand-600">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Completion Banner */}
      {isDone && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-900">
                Documents Processed Successfully!
              </p>
              <p className="text-xs text-emerald-700 mt-0.5">
                Text, entities, and vector embeddings are ready for analysis and Q&A.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {uploadState === 'idle' && (
          <Button
            variant="primary"
            size="md"
            icon={Sparkles}
            onClick={onStartUpload}
            className="w-full sm:w-auto"
          >
            Upload & Process
          </Button>
        )}

        {isDone && (
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={onReset}
            >
              Upload More
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={onViewDocuments}
            >
              View in Documents
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadProgress;
