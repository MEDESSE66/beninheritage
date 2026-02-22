import { Search, BookOpen, Map, Landmark } from 'lucide-react';
import encyclopediaData from '../data/encyclopedia.json';

export default function Encyclopedia() {
  const getIcon = (id: string) => {
    switch(id) {
      case 'history': return Landmark;
      case 'geography': return Map;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Encyclopédie du Bénin</h1>
          <p className="text-slate-600 mt-1">Explorez l'histoire, la culture et le patrimoine.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white text-sm"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {encyclopediaData.categories.map((cat) => {
          const Icon = getIcon(cat.id);
          return (
            <div key={cat.id} className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all cursor-pointer">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                <Icon className="w-6 h-6 text-slate-600 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{cat.name}</h2>
              <p className="text-slate-500 text-sm">
                Découvrir les articles liés à la catégorie {cat.name.toLowerCase()}.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
