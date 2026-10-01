import React from 'react';

/**
 * Reusable status and type badge
 */
export const Badge = ({ status, type, label, size = 'sm', className = '' }) => {
  const text = label || status || type || '';

  // Determine color scheme based on status or file type
  const getStyle = () => {
    const key = (status || type || '').toLowerCase();

    // Status styles
    if (key === 'processed' || key === 'completed' || key === 'success' || key === 'paid') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (key === 'processing' || key === 'in progress' || key === 'pending') {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }
    if (key === 'failed' || key === 'error') {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }

    // File type styles
    if (key === 'pdf') {
      return 'bg-red-50 text-red-700 border-red-200 font-semibold';
    }
    if (key === 'jpg' || key === 'png' || key === 'image') {
      return 'bg-purple-50 text-purple-700 border-purple-200 font-semibold';
    }
    if (key === 'txt' || key === 'text') {
      return 'bg-sky-50 text-sky-700 border-sky-200 font-semibold';
    }

    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  const isProcessing = (status || '').toLowerCase() === 'processing';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${getStyle()} ${className}`}
    >
      {isProcessing && (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      )}
      {status === 'Processed' && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      )}
      {status === 'Failed' && (
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
      )}
      {text}
    </span>
  );
};

export default Badge;
