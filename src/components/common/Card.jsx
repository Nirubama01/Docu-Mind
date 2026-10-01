import React from 'react';

/**
 * Reusable Card component with clean border, header, body and footer slots
 */
export const Card = ({
  children,
  title,
  subtitle,
  badge,
  action,
  footer,
  className = '',
  bodyClassName = 'p-6',
  headerClassName = 'px-6 py-4 border-b border-slate-100',
  footerClassName = 'px-6 py-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl',
  ...props
}) => {
  const hasHeader = title || subtitle || action || badge;

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/90 shadow-sm transition-all duration-200 ${className}`}
      {...props}
    >
      {hasHeader && (
        <div className={`flex items-center justify-between gap-4 ${headerClassName}`}>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {title && (
                <h3 className="text-base font-semibold text-slate-900 truncate">
                  {title}
                </h3>
              )}
              {badge}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      <div className={bodyClassName}>{children}</div>

      {footer && <div className={footerClassName}>{footer}</div>}
    </div>
  );
};

export default Card;
