import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const KpiCard = ({
  title,
  value,
  change,
  changeType = 'increase', // 'increase' | 'decrease' | 'neutral'
  comparisonText,
  icon: Icon,
  iconBgColor = 'bg-blue-50 text-blue-600',
  warning,
  subtitle,
}) => {
  const isPositiveChange = change?.startsWith('+');
  const isNegativeChange = change?.startsWith('-');

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 card-shadow card-hover-shadow flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-500">{title}</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h2>
        </div>

        {/* Change Indicator / Subtitle */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                isPositiveChange
                  ? 'text-emerald-700 bg-emerald-50'
                  : isNegativeChange
                  ? 'text-rose-700 bg-rose-50'
                  : 'text-slate-600 bg-slate-50'
              }`}
            >
              {isPositiveChange ? (
                <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              ) : isNegativeChange ? (
                <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />
              ) : null}
              {change}
            </span>
          )}

          {warning && (
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              {warning}
            </span>
          )}

          {comparisonText && (
            <span className="text-xs text-slate-400 font-normal">{comparisonText}</span>
          )}

          {subtitle && (
            <span className="text-xs text-slate-400 font-normal">{subtitle}</span>
          )}
        </div>
      </div>

      {/* Metric Icon */}
      <div className={`p-3 rounded-2xl shrink-0 ${iconBgColor}`}>
        <Icon className="w-5 h-5 stroke-[2]" />
      </div>
    </div>
  );
};
