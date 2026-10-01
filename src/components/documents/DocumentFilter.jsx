import React from 'react';

export const DocumentFilter = ({ currentFilter, onFilterChange, counts }) => {
  const filters = [
    { id: 'All', label: 'All Documents', count: counts.all },
    { id: 'Processed', label: 'Processed', count: counts.processed },
    { id: 'Processing', label: 'Processing', count: counts.processing },
    { id: 'Failed', label: 'Failed', count: counts.failed },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80 w-fit overflow-x-auto max-w-full">
      {filters.map((tab) => {
        const isActive = currentFilter === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onFilterChange(tab.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
              isActive
                ? 'bg-white text-brand-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive
                  ? 'bg-brand-50 text-brand-700 font-bold'
                  : 'bg-slate-200/80 text-slate-500'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DocumentFilter;
