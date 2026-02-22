import { Briefcase, Construction } from 'lucide-react';

export default function Opportunities() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Opportunités</h1>
        <p className="text-slate-600 mt-1">Offres d'emploi, appels d'offres et investissements.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6">
          <Construction className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Module en construction</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          Bientôt disponible : une plateforme complète pour découvrir les meilleures opportunités professionnelles au Bénin.
        </p>
        <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
          M'avertir du lancement
        </button>
      </div>
    </div>
  );
}
