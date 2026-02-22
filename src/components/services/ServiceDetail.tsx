import { Service } from '../../types';
import { X, MapPin, Clock, Phone, MessageCircle, Star, CheckCircle, ShieldCheck, Calendar } from 'lucide-react';

interface ServiceDetailProps {
  service: Service;
  onClose: () => void;
}

export default function ServiceDetail({ service, onClose }: ServiceDetailProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur hover:bg-white rounded-full transition-colors z-10 shadow-sm"
        >
          <X className="w-5 h-5 text-slate-900" />
        </button>

        {/* Left Column: Image & Quick Info */}
        <div className="w-full md:w-2/5 bg-slate-50">
          <div className="h-64 md:h-full relative">
             {service.images && service.images[0] ? (
              <img 
                src={service.images[0]} 
                alt={service.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-200">
                Pas d'image
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white md:hidden">
              <h2 className="text-2xl font-bold">{service.name}</h2>
              <p className="opacity-90">{service.category}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="w-full md:w-3/5 p-8">
          <div className="hidden md:block mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                {service.category}
              </span>
              {service.verified && (
                <span className="flex items-center text-xs font-bold text-slate-500">
                  <ShieldCheck className="w-3 h-3 mr-1 text-emerald-500" /> Vérifié
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{service.name}</h2>
            <div className="flex items-center text-slate-500 text-sm">
              <MapPin className="w-4 h-4 mr-1" /> {service.location.address}, {service.location.city}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                {service.rating}/5
              </div>
              <p className="text-xs text-slate-500">{service.reviewCount} avis</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                <Clock className="w-4 h-4 text-emerald-600" />
                {service.availability.isOpen ? 'Ouvert' : 'Fermé'}
              </div>
              <p className="text-xs text-slate-500">{service.availability.hours}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">À propos</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-2">Disponibilité</h3>
              <div className="flex flex-wrap gap-2">
                {service.availability.days.map((day, idx) => (
                  <span key={idx} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 mb-1">Tarif de base</p>
                <p className="text-2xl font-bold text-slate-900">
                  {service.pricing.basePrice} <span className="text-sm font-normal text-slate-500">{service.pricing.currency}</span>
                </p>
              </div>
              <div className="flex gap-3">
                {service.contact.whatsapp && (
                  <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-emerald-200">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                )}
                <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                  <Phone className="w-4 h-4" /> Appeler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
