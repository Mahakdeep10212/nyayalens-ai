import React from 'react';
import { 
  FileText, 
  Search, 
  Scale, 
  CheckSquare, 
  BarChart3, 
  Settings,
  GitCompare,
  ShieldCheck,
  MessageSquareText,
  Cpu
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView }) => {
  const navItems = [
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'contract_review', label: 'Contract Review', icon: Search },
    { id: 'risk_analysis', label: 'Risk Analysis', icon: Scale },
    { id: 'clause_extraction', label: 'Clause Extraction', icon: CheckSquare },
    { id: 'comparison', label: 'Doc Comparison', icon: GitCompare },
    { id: 'compliance', label: 'Compliance Audit', icon: ShieldCheck },
    { id: 'assistant', label: 'Legal AI Chat', icon: MessageSquareText },
    { id: 'evaluation', label: 'ML Evaluation Metrics', icon: Cpu },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="relative z-20 w-64 bg-transparent border-r border-amber-900/15 flex flex-col justify-between shrink-0 min-h-screen shadow-xl">
      <div>
        {/* Brand Header matching Indian Legal Portal */}
        <div className="p-6 flex items-center space-x-3 cursor-pointer" onClick={() => onSelectView('documents')}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500/30 via-yellow-400/20 to-amber-600/40 border border-amber-600/40 flex items-center justify-center shadow-md shadow-amber-500/10 text-2xl">
            ⚖️
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-slate-950 flex items-center gap-1.5">
              NyayaLens <span className="text-[10px] bg-amber-600/20 text-amber-900 px-1.5 py-0.5 rounded font-mono border border-amber-600/30 font-bold">न्याय</span>
            </div>
            <div className="text-[11px] text-amber-800 font-bold flex items-center gap-1">
              <span>🏛️</span> Indian Legal Chamber
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="px-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center space-x-3.5 px-4 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-amber-600/20 text-amber-950 font-bold shadow-sm border border-amber-600/35'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-amber-500/10 font-semibold'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-800' : 'text-slate-600'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Status footer */}
      <div className="p-4 m-3 rounded-xl bg-amber-50/90 border border-amber-900/15 text-xs shadow-sm">
        <div className="flex items-center justify-between text-slate-700 mb-1">
          <span className="text-[11px] font-bold text-slate-700">Jurisdiction</span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Online
          </span>
        </div>
        <div className="text-[11px] text-amber-950 font-extrabold truncate flex items-center gap-1.5 mt-1">
          <span>🦁</span> सत्यमेव जयते • Indian Law
        </div>
        <div className="text-[10px] text-slate-600 mt-0.5 font-medium">
          Supreme Court & Statutory RAG v2026
        </div>
      </div>
    </aside>
  );
};
