import React from 'react';
import { Check, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';

export const ComparisonTable = ({
  fields = [],
  docAName = 'Document A',
  docBName = 'Document B',
  docAType = 'PDF',
  docBType = 'PDF',
}) => {
  const matchCount = fields.filter((f) => !f.isDifferent).length;
  const diffCount = fields.filter((f) => f.isDifferent).length;

  return (
    <div className="space-y-4">
      {/* Metric summary bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">Total Fields Compared</p>
          <p className="text-xl font-bold text-slate-800 mt-1">{fields.length}</p>
        </div>
        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80 shadow-2xs">
          <p className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" /> Matching Entities
          </p>
          <p className="text-xl font-bold text-emerald-800 mt-1">{matchCount}</p>
        </div>
        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
          <p className="text-xs text-amber-700 font-medium flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Variances / Differences
          </p>
          <p className="text-xl font-bold text-amber-800 mt-1">{diffCount}</p>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200/90 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50/90 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200/90">
              <th scope="col" className="px-6 py-4 w-1/4">
                Field
              </th>
              <th scope="col" className="px-6 py-4 w-1/3 border-l border-slate-200/60">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-600" />
                  <span className="truncate">{docAName}</span>
                  <Badge type={docAType} size="sm" />
                </div>
              </th>
              <th scope="col" className="px-6 py-4 w-1/3 border-l border-slate-200/60">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span className="truncate">{docBName}</span>
                  <Badge type={docBType} size="sm" />
                </div>
              </th>
              <th scope="col" className="px-4 py-4 text-center w-24">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fields.map((row) => (
              <tr
                key={row.key}
                className={`transition-colors ${
                  row.isDifferent
                    ? 'bg-amber-50/20 hover:bg-amber-50/40'
                    : 'hover:bg-slate-50/50'
                }`}
              >
                {/* Field Label */}
                <td className="px-6 py-3.5 font-medium text-slate-800">
                  {row.label}
                </td>

                {/* Doc A Value */}
                <td className="px-6 py-3.5 border-l border-slate-100 font-mono text-xs sm:text-sm text-slate-700">
                  {row.docA || '—'}
                </td>

                {/* Doc B Value */}
                <td className="px-6 py-3.5 border-l border-slate-100 font-mono text-xs sm:text-sm text-slate-700">
                  <span
                    className={
                      row.isDifferent
                        ? 'font-semibold text-amber-900 bg-amber-100/70 px-1.5 py-0.5 rounded'
                        : ''
                    }
                  >
                    {row.docB || '—'}
                  </span>
                </td>

                {/* Match Status Icon */}
                <td className="px-4 py-3.5 text-center">
                  {row.isDifferent ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      Variance
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Identical
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
