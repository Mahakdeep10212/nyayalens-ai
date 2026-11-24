import React from 'react';
import { Search, UploadCloud, Globe, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenUpload: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenUpload,
  searchQuery,
  onSearchChange,
  language,
  onLanguageChange
}) => {
  return (
    <header className="h-20 border-b border-amber-900/15 px-8 flex items-center justify-between bg-transparent sticky top-0 z-20 shadow-sm">
      {/* Title & Indian Legal Authority Pill */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/25 to-orange-500/15 border border-amber-600/40 flex items-center justify-center text-xl shadow-sm">
            🏛️
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-950 flex items-center gap-2">
              Document Intelligence & Legal Review
            </h1>
            <div className="text-[11px] text-amber-900 font-bold flex items-center gap-1.5">
              <span>🦁</span> सत्यमेव जयते • Grounded in Constitution & Indian Statutes
            </div>
          </div>
        </div>
        <div className="hidden lg:inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-500/40 text-xs font-bold text-emerald-950 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
          <span>Indian Law AI Active</span>
        </div>
      </div>

      {/* Right Controls: Search, Language Switcher, Upload Button */}
      <div className="flex items-center space-x-4">
        {/* Search Input matching reference screenshot */}
        <div className="relative w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search documents..."
            className="w-full bg-transparent border border-amber-900/20 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-amber-600 transition-colors shadow-inner font-medium"
          />
        </div>

        {/* Multilingual Selector */}
        <div className="flex items-center bg-white/10 border border-amber-900/20 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 font-semibold shadow-sm">
          <Globe className="w-3.5 h-3.5 text-amber-700 mr-1.5" />
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-transparent focus:outline-none cursor-pointer font-bold text-slate-900"
          >
            <option value="en" className="bg-white/10 text-slate-900">English</option>
            <option value="hi" className="bg-white/10 text-slate-900">हिन्दी (Hindi)</option>
            <option value="pa" className="bg-white/10 text-slate-900">ਪੰਜਾਬੀ (Punjabi)</option>
          </select>
        </div>

        {/* Upload Button */}
        <button
          onClick={onOpenUpload}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all duration-150 shadow-md shadow-amber-600/20 active:scale-95"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>
    </header>
  );
};
