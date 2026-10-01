import React from 'react';
import { FileQuestion } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = FileQuestion,
  title = 'No records found',
  description = 'There are no documents matching your criteria at the moment.',
  actionLabel,
  onAction,
  actionIcon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-dashed border-slate-200">
      <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-5">{description}</p>
      {actionLabel && (
        <Button
          variant="primary"
          size="sm"
          icon={actionIcon}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
