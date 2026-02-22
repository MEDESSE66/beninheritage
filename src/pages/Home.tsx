import { ArrowRight, Book, Briefcase, Gamepad2, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    { 
      id: 'encyclopedie', 
      title: 'Encyclopédie', 
      desc: 'Découvrez l\'histoire, la culture et la géographie du Bénin.',
      icon: Book,
      color: 'bg-blue-50 text-blue-600',
      path: '/encyclopedie'
    },
    { 
      id: 'services', 
      title: 'Services', 
      desc: 'Accédez à un annuaire complet de services locaux.',
      icon: Layers,
      color: 'bg-emerald-50 text-emerald-600',
      path: '/services'
    },
    { 
      id: 'opportunites', 
      title: 'Opportunités', 
      desc: 'Offres d\'emploi, appels d\'offres et investissements.',
      icon: Briefcase,
      color: 'bg-amber-50 text-amber-600',
      path: '/opportunites'
    },
    { 
      id: 'divertissement', 
      title: 'Divertissement', 
      desc: 'Agenda culturel, événements et loisirs.',
      icon: Gamepad2,
      color: 'bg-purple-50 text-purple-600',
      path: '/divertissement'
    }
  ];

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white py-24 px-8 text-center shadow-xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Bienvenue sur <span className="text-emerald-400">BeninSource</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            Votre portail numérique unique pour explorer, vivre et investir au Bénin.
            Tout ce dont vous avez besoin, réuni au même endroit.
          </p>
          <div className="pt-4">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg shadow-emerald-900/20">
              Commencer l'exploration
            </button>
          </div>
        </div>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.id} 
              to={item.path}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
              <div className="flex items-center text-sm font-medium text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Explorer <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
