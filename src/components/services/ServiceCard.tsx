import { Service } from '../../types';
import { MapPin, Clock, Star, Phone, MessageCircle, CheckCircle } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onClick: (service: Service) => void;
}

export default function ServiceCard({ service, onClick }: ServiceCardProps) {
  return (
    <div 
      onClick={() => onClick(service)}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        {service.images && service.images[0] ? (
          <img 
            src={service.images[0]} 
            alt={service.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            Pas d'image
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
           {service.verified && (
            <span className="bg-white/90 backdrop-blur-sm text-emerald-600 text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-sm">
              <CheckCircle className="w-3 h-3 mr-1" /> Vérifié
            </span>
          )}
          <span className={`text-xs font-bold px-2 py-1 rounded-full shadow-sm ${service.availability.isOpen ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
            {service.availability.isOpen ? 'Ouvert' : 'Fermé'}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
            {service.category}
          </span>
          <div className="flex items-center text-amber-400 text-sm font-bold">
            <Star className="w-4 h-4 fill-current mr-1" />
            {service.rating} <span className="text-slate-400 font-normal ml-1">({service.reviewCount})</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{service.name}</h3>
        <div className="flex items-center text-slate-500 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{service.location.city}, {service.location.address}</span>
        </div>

        <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-grow">
          {service.description}
        </p>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="text-slate-900 font-bold">
            {service.pricing.basePrice} {service.pricing.currency}
            <span className="text-slate-400 text-xs font-normal ml-1">
              / {service.pricing.unit === 'fixed' ? 'prestation' : service.pricing.unit === 'hour' ? 'heure' : 'service'}
            </span>
          </div>
          <div className="flex gap-2">
            {service.contact.whatsapp && (
              <button className="p-2 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
            )}
            <button className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
