import React from 'react';

export const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
      <div
        className={`${sizeMap[size] || sizeMap.md} rounded-full border-brand-200 border-t-brand-600 animate-spin`}
      />
      {text && <p className="text-xs font-medium text-slate-500 animate-pulse">{text}</p>}
    </div>
  );
};

export const SkeletonRow = ({ cols = 5 }) => {
  return (
    <div className="animate-pulse flex items-center space-x-4 py-4 px-6 border-b border-slate-100">
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/6"></div>
      <div className="h-4 bg-slate-200 rounded w-1/6"></div>
      <div className="h-4 bg-slate-200 rounded w-1/6"></div>
      <div className="h-4 bg-slate-200 rounded w-1/12 ml-auto"></div>
    </div>
  );
};

export default LoadingSpinner;
