import { Construction, Gamepad2 } from 'lucide-react';

export default function Entertainment() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Divertissement</h1>
        <p className="text-slate-600 mt-1">Agenda culturel, événements et loisirs.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6">
          <Construction className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Module en construction</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          Préparez-vous à découvrir le meilleur du divertissement et de la culture béninoise.
        </p>
        <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
          M'avertir du lancement
        </button>
      </div>
    </div>
  );
}
