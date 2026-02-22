import { useState } from 'react';
import { Surname } from '../../types';
import { Search, ChevronRight, X } from 'lucide-react';

interface PatronymListProps {
  data: Surname[];
}

export default function PatronymList({ data }: PatronymListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Surname | null>(null);

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Rechercher un patronyme..." 
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {item.name}
              </h3>
              <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                {item.origin}
              </span>
            </div>
            <p className="text-sm text-slate-500 line-clamp-2">{item.meaning}</p>
            <div className="mt-3 flex items-center text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Voir détails <ChevronRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{selectedItem.name}</h2>
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
                {selectedItem.origin}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-1">Signification</h4>
                <p className="text-slate-600 leading-relaxed">{selectedItem.meaning}</p>
              </div>

              {selectedItem.variants && selectedItem.variants.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-1">Variantes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.variants.map((variant, idx) => (
                      <span key={idx} className="text-sm bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-100">
                        {variant}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-1">Régions</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.region.map((reg, idx) => (
                    <span key={idx} className="text-sm text-slate-600">
                      {reg}{idx < selectedItem.region.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {selectedItem.sources && selectedItem.sources.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Sources</h4>
                  <ul className="space-y-1">
                    {selectedItem.sources.map((source, idx) => (
                      <li key={idx} className="text-xs text-slate-500 italic">
                        {source.title} {source.author ? `— ${source.author}` : ''} {source.year ? `(${source.year})` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
