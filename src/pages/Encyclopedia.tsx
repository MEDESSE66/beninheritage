import { useState } from 'react';
import { Search, BookOpen, Map, Landmark, Users, MessageCircle, Palette, ArrowLeft } from 'lucide-react';
import encyclopediaData from '../data/encyclopedia.json';
import PatronymList from '../components/encyclopedia/PatronymList';
import AdageList from '../components/encyclopedia/AdageList';
import LanguageList from '../components/encyclopedia/LanguageList';

export default function Encyclopedia() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getIcon = (id: string) => {
    switch(id) {
      case 'patronymes': return Users;
      case 'adages': return MessageCircle;
      case 'langues': return BookOpen;
      case 'geographie': return Map;
      case 'artisanat': return Palette;
      default: return Landmark;
    }
  };

  const renderContent = () => {
    switch(selectedCategory) {
      case 'patronymes':
        return <PatronymList data={encyclopediaData.patronymes} />;
      case 'adages':
        return <AdageList data={encyclopediaData.adages} />;
      case 'langues':
        return <LanguageList data={encyclopediaData.langues} />;
      default:
        return (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-400">
            Module {encyclopediaData.categories.find(c => c.id === selectedCategory)?.name} en construction
          </div>
        );
    }
  };

  if (selectedCategory) {
    const category = encyclopediaData.categories.find(c => c.id === selectedCategory);
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour aux catégories
        </button>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
            {category && (() => {
              const Icon = getIcon(category.id);
              return <Icon className="w-5 h-5 text-emerald-600" />;
            })()}
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{category?.name}</h1>
        </div>

        {renderContent()}
      </div>
    );
  }

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
            <div 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat.id)}
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                <Icon className="w-6 h-6 text-slate-600 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{cat.name}</h2>
              <p className="text-slate-500 text-sm">
                {cat.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
