import { useState } from 'react';
import { Adage } from '../../types';
import { Search, Quote, X } from 'lucide-react';

interface AdageListProps {
  data: Adage[];
}

export default function AdageList({ data }: AdageListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Adage | null>(null);

  const filteredData = data.filter(item => 
    item.expression.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Rechercher un adage..." 
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredData.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-100 group-hover:text-emerald-50 transition-colors" />
            
            <div className="relative z-10">
              <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded mb-3">
                {item.language}
              </span>
              <p className="text-lg font-serif italic text-slate-800 mb-2">"{item.expression}"</p>
              <p className="text-sm text-slate-500">{item.translation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-xl relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
            
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full mb-4">
                {selectedItem.language}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif italic text-slate-900 mb-4">"{selectedItem.expression}"</h2>
              <p className="text-lg text-slate-600 font-medium">{selectedItem.translation}</p>
            </div>

            <div className="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Signification</h4>
                <p className="text-slate-700 leading-relaxed">{selectedItem.meaning}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Contexte d'usage</h4>
                <p className="text-slate-700 leading-relaxed">{selectedItem.context}</p>
              </div>

              {selectedItem.sources && selectedItem.sources.length > 0 && (
                <div className="pt-4 border-t border-slate-200/50">
                  <p className="text-xs text-slate-400 italic">
                    Source: {selectedItem.sources[0].title}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
