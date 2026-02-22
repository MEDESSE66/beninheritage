import { Service } from '../../types';
import { MapPin } from 'lucide-react';

interface ServiceMapProps {
  services: Service[];
  onSelect: (service: Service) => void;
}

export default function ServiceMap({ services, onSelect }: ServiceMapProps) {
  // Mock map visualization using a simple relative grid
  // In a real app, this would be Leaflet or Google Maps
  
  // Calculate bounds to normalize coordinates for the mock view
  const lats = services.map(s => s.location.coordinates.lat);
  const lngs = services.map(s => s.location.coordinates.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const normalize = (val: number, min: number, max: number) => {
    return ((val - min) / (max - min)) * 80 + 10; // Keep within 10-90% range
  };

  return (
    <div className="bg-slate-100 rounded-2xl overflow-hidden h-[600px] relative border border-slate-200 shadow-inner">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-sm z-10 max-w-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-1">Carte des Services</h3>
        <p className="text-xs text-slate-500">Visualisation simplifiée de la localisation des prestataires.</p>
      </div>

      {services.map((service) => {
        // Invert Lat for Y axis (top is higher lat usually, but screen Y is down)
        // Actually map Y is up, screen Y is down. So MaxLat = 10%, MinLat = 90%
        const top = 100 - normalize(service.location.coordinates.lat, minLat, maxLat); 
        const left = normalize(service.location.coordinates.lng, minLng, maxLng);

        return (
          <div 
            key={service.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ top: `${top}%`, left: `${left}%` }}
            onClick={() => onSelect(service)}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-20 relative border-2 border-white">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[150px] bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                {service.name}
              </div>
              {/* Pulse effect */}
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
