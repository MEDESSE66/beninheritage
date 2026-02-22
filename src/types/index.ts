export interface Source {
  title: string;
  url?: string;
  author?: string;
  year?: number;
}

export interface BaseEntity {
  id: string;
  sources: Source[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Surname extends BaseEntity {
  name: string;
  origin: string; // e.g., Fon, Yoruba, Bariba
  meaning: string;
  region: string[];
  variants?: string[];
}

export interface Adage extends BaseEntity {
  expression: string;
  language: string;
  translation: string;
  meaning: string;
  context: string; // When is it used?
}

export interface Language extends BaseEntity {
  name: string;
  family: string; // e.g., Kwa, Gur
  ethnic_groups: string[];
  region: string[];
  speakers_estimate?: string;
}

export interface Location extends BaseEntity {
  name: string;
  type: 'City' | 'Neighborhood' | 'Landmark';
  region: string;
  description: string;
  population?: string;
  coordinates?: { lat: number; lng: number };
}

export interface Craft extends BaseEntity {
  name: string;
  type: string; // e.g., Textile, Pottery, Metalwork
  materials: string[];
  region: string[];
  cultural_significance: string;
}

export interface Service {
  id: string;
  name: string;
  category: 'Plomberie' | 'Electricité' | 'Mécanique' | 'Coiffure' | 'Restauration' | 'Santé' | 'Education' | 'Autre';
  description: string;
  location: {
    address: string;
    city: string;
    coordinates: { lat: number; lng: number };
  };
  availability: {
    isOpen: boolean;
    hours: string;
    days: string[];
  };
  pricing: {
    basePrice: number;
    currency: 'XOF';
    unit: 'hour' | 'fixed' | 'service';
  };
  rating: number;
  reviewCount: number;
  contact: {
    phone: string;
    whatsapp?: string;
    email?: string;
  };
  verified: boolean;
  images?: string[];
}

export interface EncyclopediaData {
  categories: Category[];
  patronymes: Surname[];
  adages: Adage[];
  langues: Language[];
  geographie: Location[];
  artisanat: Craft[];
}
