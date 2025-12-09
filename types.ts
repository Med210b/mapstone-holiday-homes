export type Lang = 'en' | 'fr' | 'es' | 'de' | 'ar' | 'ru';

export type View = 'home' | 'about' | 'properties' | 'services' | 'landlords' | 'contact' | 'privacy' | 'terms' | 'faq';

export interface TranslationStructure {
  nav: { [key: string]: string };
  hero: { [key: string]: string };
  about: { [key: string]: string };
  properties: { [key: string]: string };
  landlords: { 
    label: string;
    title: string;
    desc: string;
    vipTitle: string;
    vipDesc: string;
    list: string[];
  };
  partners: { title: string };
  amenities: { title: string; desc: string };
  reviews: { label: string; title: string };
  footer: { [key: string]: string };
  booking: { [key: string]: string };
  contactPage: { [key: string]: string };
  servicesPage: {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
    app: {
      title: string;
      desc: string;
      features: string[];
    };
  };
}