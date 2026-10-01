import React from 'react';

/**
 * Reusable Metric/Stat Card for Dashboard
 */
export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'positive', // 'positive' | 'negative' | 'neutral'
  color = 'brand',
}) => {
  const colorMap = {
    brand: {
      bg: 'bg-brand-50',
      text: 'text-brand-600',
      border: 'border-brand-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100',
    },
  };

  const activeColor = colorMap[color] || colorMap.brand;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        {Icon && (
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeColor.bg} ${activeColor.text} border ${activeColor.border}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              trendType === 'positive'
                ? 'bg-emerald-50 text-emerald-700'
                : trendType === 'negative'
                ? 'bg-rose-50 text-rose-700'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 truncate">{subtitle}</p>
      )}
    </div>
  );
};

export default StatCard;
