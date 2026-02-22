import { useState } from 'react';
import { Language } from '../../types';
import { Search, Users, MapPin, X, Globe } from 'lucide-react';

interface LanguageListProps {
  data: Language[];
}

export default function LanguageList({ data }: LanguageListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Language | null>(null);

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.family.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Rechercher une langue ou ethnie..." 
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {item.name}
                </h3>
                <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full border border-slate-200">
                  {item.family}
                </span>
              </div>
              <div className="flex items-center text-sm text-slate-500 gap-4">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {item.speakers_estimate || 'N/A'}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {item.region.length} régions
                </span>
              </div>
            </div>
            <Globe className="w-8 h-8 text-slate-100 group-hover:text-emerald-100 transition-colors" />
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
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedItem.name}</h2>
                <p className="text-slate-500 text-sm">Famille linguistique : {selectedItem.family}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold text-sm">
                    <Users className="w-4 h-4 text-emerald-600" /> Locuteurs
                  </div>
                  <p className="text-slate-600">{selectedItem.speakers_estimate || 'Non estimé'}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold text-sm">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Régions
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-2">{selectedItem.region.join(', ')}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">Groupes Ethniques Associés</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.ethnic_groups.map((group, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-medium shadow-sm">
                      {group}
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
                        {source.title} {source.url && <a href={source.url} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">(Lien)</a>}
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
