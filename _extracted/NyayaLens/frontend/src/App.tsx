import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { RecentDocuments } from './components/RecentDocuments';
import { AiInsightsStream } from './components/AiInsightsStream';
import { DocumentWorkspace } from './components/DocumentWorkspace';
import { UploadModal } from './components/UploadModal';
import { ComparisonModal } from './components/ComparisonModal';
import { 
  DocumentListItem, 
  DocumentDetail, 
  DashboardKPIs, 
  AIInsightItem 
} from './types';
import { 
  fetchDocuments, 
  fetchDocumentDetail, 
  fetchDashboardKPIs, 
  fetchAIInsights 
} from './services/api';

export function App() {
  const [currentView, setCurrentView] = useState('documents');
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [insights, setInsights] = useState<AIInsightItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en');

  // Modals & Workspace State
  const [selectedDoc, setSelectedDoc] = useState<DocumentDetail | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  useEffect(() => {
    async function initData() {
      try {
        const [docsData, kpiData, insightsData] = await Promise.all([
          fetchDocuments(),
          fetchDashboardKPIs(),
          fetchAIInsights()
        ]);
        setDocuments(docsData);
        setKpis(kpiData);
        setInsights(insightsData);
      } catch (err) {
        console.error('Error fetching initial dashboard data', err);
      }
    }
    initData();
  }, []);

  const handleSelectDocument = async (doc: DocumentListItem) => {
    try {
      const fullDoc = await fetchDocumentDetail(doc.id);
      setSelectedDoc(fullDoc);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNavSelect = (view: string) => {
    setCurrentView(view);
    if (view === 'comparison') {
      setIsComparisonOpen(true);
    } else if (view === 'contract_review' || view === 'risk_analysis' || view === 'clause_extraction' || view === 'compliance' || view === 'assistant') {
      if (documents.length > 0) {
        handleSelectDocument(documents[0]);
      }
    }
  };

  const filteredDocs = documents.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.doc_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex min-h-screen text-slate-900 overflow-x-hidden">
      {/* Master Indian Legal Backdrop with Ashoka Lions, Supreme Court & Constitution */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(254, 250, 242, 0.40) 0%, rgba(254, 250, 242, 0.60) 45%, rgba(254, 250, 242, 0.78) 100%), url('/indian-legal-bg.jpg')`,
          backgroundAttachment: 'fixed',
        }}
      />

      {/* LEFT SIDEBAR matching reference screenshot */}
      <Sidebar
        currentView={currentView}
        onSelectView={handleNavSelect}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header
          onOpenUpload={() => setIsUploadOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          language={language}
          onLanguageChange={setLanguage}
        />

        <main className="p-8 max-w-7xl mx-auto w-full">
          {/* INDIAN LEGAL CHAMBER & ASHOKA LIONS SHOWCASE */}
          <div className="mb-8 rounded-2xl p-6 bg-transparent border border-amber-600/30 backdrop-blur-md shadow-xl relative overflow-hidden">
            {/* National Tricolor Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-emerald-600"></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 pt-1">
              <div className="flex items-start sm:items-center space-x-5">
                {/* Ashoka Lion & National Emblem Insignia */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-amber-500/25 to-amber-700/20 border-2 border-amber-600/40 flex flex-col items-center justify-center text-center shadow-md shadow-amber-500/10 shrink-0">
                  <span className="text-2xl leading-none">🦁</span>
                  <span className="text-[8px] font-black text-amber-950 uppercase tracking-wider mt-1 font-serif">सत्यमेव जयते</span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-black uppercase tracking-widest text-amber-950 bg-amber-600/15 px-2.5 py-0.5 rounded-full border border-amber-600/30 font-mono">
                      भारत गणराज्य • REPUBLIC OF INDIA
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      Supreme Court of India Jurisprudence & Statutory Engine
                    </span>
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-950 font-serif">
                    NyayaLens AI Legal Intelligence & Contract Review Chamber
                  </h2>
                  <p className="text-xs text-slate-700 mt-1 max-w-2xl leading-relaxed font-medium">
                    Automated clause risk analysis and statutory compliance verification under the <strong className="text-slate-900">Indian Contract Act 1872</strong>, <strong className="text-slate-900">DPDP Act 2023</strong>, <strong className="text-slate-900">Arbitration Act 1996</strong>, and <strong className="text-slate-900">Indian Stamp Act 1899</strong>.
                  </p>
                </div>
              </div>

              {/* Legal Authorities Quick Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 shrink-0">
                <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-amber-600/25 shadow-sm flex items-center gap-2.5">
                  <span className="text-lg">🏛️</span>
                  <div>
                    <div className="text-[10px] text-slate-600 uppercase font-bold">Apex Forum</div>
                    <div className="text-xs font-black text-slate-950">Supreme Court of India</div>
                  </div>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-amber-600/25 shadow-sm flex items-center gap-2.5">
                  <span className="text-lg">📜</span>
                  <div>
                    <div className="text-[10px] text-slate-600 uppercase font-bold">Constitutional Law</div>
                    <div className="text-xs font-black text-amber-950">Constitution of India</div>
                  </div>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-emerald-600/30 shadow-sm flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <span className="text-lg">⚖️</span>
                  <div>
                    <div className="text-[10px] text-slate-600 uppercase font-bold">Legal Standard</div>
                    <div className="text-xs font-black text-emerald-900">सत्यमेव जयते • Section 27 Verified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top KPI Metrics Cards matching reference screenshot */}
          <MetricCards kpis={kpis} />

          {/* Main Split Grid matching reference screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: RECENT DOCUMENTS */}
            <div className="lg:col-span-2">
              <RecentDocuments
                documents={filteredDocs}
                onSelectDocument={handleSelectDocument}
                selectedDocId={selectedDoc?.id}
              />
            </div>

            {/* Right 1 Col: AI INSIGHTS STREAM */}
            <div className="lg:col-span-1">
              <AiInsightsStream
                insights={insights}
                onInsightClick={() => {
                  if (documents.length > 0) handleSelectDocument(documents[0]);
                }}
              />
            </div>
          </div>
        </main>
      </div>

      {/* TWO-PANEL INTERACTIVE WORKSPACE MODAL */}
      {selectedDoc && (
        <DocumentWorkspace
          document={selectedDoc}
          onClose={() => setSelectedDoc(null)}
          language={language}
        />
      )}

      {/* UPLOAD MODAL */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={(newDoc) => {
          setSelectedDoc(newDoc);
          fetchDocuments().then(setDocuments);
        }}
      />

      {/* CROSS-DOCUMENT COMPARISON MODAL */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        documents={documents}
      />
    </div>
  );
}

export default App;
