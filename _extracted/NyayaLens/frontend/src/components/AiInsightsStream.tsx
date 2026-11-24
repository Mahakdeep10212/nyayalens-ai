import React from 'react';
import { AIInsightItem } from '../types';

interface AiInsightsStreamProps {
  insights: AIInsightItem[];
  onInsightClick?: (insight: AIInsightItem) => void;
}

export const AiInsightsStream: React.FC<AiInsightsStreamProps> = ({ insights, onInsightClick }) => {
  return (
    <div className="bg-transparent backdrop-blur-md border border-amber-900/15 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase flex items-center gap-2">
          <span>⚖️</span> Statutory Risk Insights
        </h2>
        <span className="text-xs text-amber-900 font-bold">Real-time Stream</span>
      </div>

      <div className="space-y-4">
        {insights.map((item) => (
          <div
            key={item.id}
            onClick={() => onInsightClick && onInsightClick(item)}
            className="p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-amber-900/15 hover:bg-white/70 hover:border-amber-600/40 hover:scale-105 shadow-lg transition-all duration-300 cursor-pointer"
          >
            {/* Title with icon */}
            <div className="text-xs font-bold tracking-wide text-slate-950 uppercase mb-2">
              {item.title}
            </div>

            {/* Description */}
            <div className="text-xs text-slate-700 font-medium leading-relaxed mb-3">
              {item.description}
            </div>

            {/* Confidence Progress Bar */}
            <div className="flex items-center space-x-3">
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full"
                  style={{ width: `${item.confidence}%` }}
                />
              </div>
              <span className="text-[11px] font-black text-amber-900 font-mono">
                {item.confidence}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
