import React from 'react';
import { DashboardKPIs } from '../types';

interface MetricCardsProps {
  kpis: DashboardKPIs | null;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ kpis }) => {
  const cards = [
    {
      icon: '📜',
      label: 'CONTRACTS ANALYZED',
      value: kpis?.docs_analyzed.value || '2,847',
      trend: kpis?.docs_analyzed.trend || '↑ 12% this month',
      trendColor: 'text-emerald-400'
    },
    {
      icon: '⚖️',
      label: 'LEGAL RISKS FLAGGED',
      value: kpis?.risks_flagged.value || '143',
      trend: kpis?.risks_flagged.trend || '↑ 8 this week',
      trendColor: 'text-amber-400'
    },
    {
      icon: '⏱️',
      label: 'REVIEW TIME SAVED',
      value: kpis?.review_time_saved.value || '89%',
      trend: kpis?.review_time_saved.trend || 'vs. manual review',
      trendColor: 'text-emerald-400'
    },
    {
      icon: '🛡️',
      label: 'STATUTORY AI ACCURACY',
      value: kpis?.ai_accuracy.value || '97.3%',
      trend: kpis?.ai_accuracy.trend || '↑ 1.2% this quarter',
      trendColor: 'text-emerald-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white/10 border border-amber-900/20 rounded-2xl p-6 shadow-lg hover:border-amber-600/40 transform hover:scale-105 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold tracking-wider text-slate-700 uppercase">
              {card.label}
            </span>
            <span className="text-lg">{card.icon}</span>
          </div>
          <div className="text-3xl font-black text-slate-950 tracking-tight mb-2">
            {card.value}
          </div>
          <div className={`text-xs font-bold ${card.trendColor === 'text-emerald-400' ? 'text-emerald-700' : 'text-amber-800'}`}>
            {card.trend}
          </div>
        </div>
      ))}
    </div>
  );
};
