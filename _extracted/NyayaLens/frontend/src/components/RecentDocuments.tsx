import React from 'react';
import { DocumentListItem } from '../types';

interface RecentDocumentsProps {
  documents: DocumentListItem[];
  onSelectDocument: (doc: DocumentListItem) => void;
  selectedDocId?: number;
}

export const RecentDocuments: React.FC<RecentDocumentsProps> = ({
  documents,
  onSelectDocument,
  selectedDocId
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Reviewed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 border border-emerald-400 text-emerald-900 shadow-sm">
            Reviewed
          </span>
        );
      case 'Processing':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 border border-blue-400 text-blue-900 shadow-sm">
            Processing
          </span>
        );
      case 'Risk Found':
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 border border-amber-400 text-amber-950 shadow-sm">
            Risk Found
          </span>
        );
    }
  };

  const getFileTypeBadge = (type: string) => {
    const isDoc = type.toUpperCase().includes('DOC');
    return (
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-xs uppercase tracking-wider shadow-sm ${
          isDoc ? 'bg-blue-100 text-blue-900 border border-blue-300' : 'bg-red-100 text-red-900 border border-red-300'
        }`}
      >
        {isDoc ? 'DOC' : 'PDF'}
      </div>
    );
  };

  return (
    <div className="bg-transparent backdrop-blur-md border border-amber-900/15 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase flex items-center gap-2">
          <span>📜</span> Legal Documents & Contract Docket
        </h2>
        <span className="text-xs text-amber-900 font-bold cursor-pointer hover:underline">
          View All ({documents.length})
        </span>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => {
          const isSelected = selectedDocId === doc.id;
          return (
            <div
              key={doc.id}
              onClick={() => onSelectDocument(doc)}
              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300 ${isSelected ? 'bg-amber-100/80 border-amber-600/60 shadow-md' : 'bg-white/40 backdrop-blur-xl border-amber-900/15 hover:bg-white/70 hover:border-amber-600/40 hover:scale-105 shadow-lg'}`}
            >
              <div className="flex items-center space-x-4">
                {getFileTypeBadge(doc.file_type)}
                <div>
                  <div className="text-sm font-bold text-slate-950 group-hover:text-amber-900 transition-colors">
                    {doc.title}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex items-center gap-2 font-medium">
                    <span>{doc.page_count} pages</span>
                    <span>•</span>
                    <span>Uploaded recently</span>
                    <span>•</span>
                    <span className={doc.clauses_flagged > 0 ? 'text-amber-800 font-bold' : 'text-slate-600'}>
                      {doc.clauses_flagged > 0 ? `${doc.clauses_flagged} clauses flagged` : 'Clean'}
                    </span>
                  </div>
                </div>
              </div>

              <div>{getStatusBadge(doc.status)}</div>
            </div>
          );
        })}

        {documents.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">
            No documents uploaded yet. Upload a document to begin analysis.
          </div>
        )}
      </div>
    </div>
  );
};
