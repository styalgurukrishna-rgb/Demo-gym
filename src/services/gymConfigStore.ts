import { GymConfig, BrandConfig, ThemeColors, HeroConfig, ContactConfig, WhatsAppConfig, SeoConfig } from '../types';

const GYM_CONFIG_STORAGE_KEY = 'ksg_white_label_gym_config_v4';

export const DEFAULT_GYM_CONFIG: GymConfig = {
  id: 'cfg_default_ksg',
  brand: {
    gymName: 'KSG DEMO GYM',
    tagline: 'Transform Your Body. Upgrade Your Life.',
    logo: '',
    logoBadge: 'Luxury Fitness Platform',
    favicon: '',
    aboutText: 'KSG DEMO GYM is a premier athletic performance sanctuary dedicated to progressive overload, certified coaching, and real human transformation.',
    storyHeading: 'Forged in Discipline. Built for Greatness.',
    storyDescription: 'Founded by strength athletes and sports biomechanists, our facility pairs Olympic-grade equipment with personalized programming.'
  },
  colors: {
    primaryColor: '#f59e0b',    // Amber 500
    secondaryColor: '#ef4444',  // Red 500
    accentColor: '#10b981',     // Emerald 500
    backgroundColor: '#09090b', // Zinc 950
    textColor: '#f4f4f5'        // Zinc 100
  },
  hero: {
    heroHeading: 'BUILD THE STRONGEST VERSION OF YOURSELF',
    heroSubtitle: 'Transform Your Body. Upgrade Your Life.',
    ctaButtonText: 'JOIN NOW',
    secondaryButtonText: 'BOOK FREE TRIAL',
    heroImage: '/images/hero-gym-bg.webp',
    heroVideo: ''
  },
  contact: {
    phone: '+91 75499 29102',
    email: 'contact@ksgdemogym.com',
    address: 'Level 4, Zenith Pinnacle Tower, 100 Feet Road, Indiranagar, Bangalore, Karnataka 560038',
    city: 'Bangalore',
    area: 'Indiranagar',
    googleMapsUrl: 'https://maps.google.com/?q=Indiranagar+Bangalore',
    openingHours: 'Open 24/7 (Staffed 05:00 AM - 11:00 PM)',
    instagram: 'https://instagram.com/ksgdemogym',
    facebook: 'https://facebook.com/ksgdemogym',
    youtube: 'https://youtube.com/@ksgdemogym'
  },
  whatsapp: {
    whatsappNumber: '+917549929102',
    defaultMessage: 'Hello KSG DEMO GYM, I would like to know more about your gym membership plans and free trial.',
    trainerDefaultMessage: 'Hello Coach, I would like to inquire about personal training schedules.'
  },
  seo: {
    metaTitle: 'KSG DEMO GYM | Transform Your Body. Upgrade Your Life.',
    metaDescription: 'KSG DEMO GYM is a premier athletic performance sanctuary dedicated to progressive overload, certified coaching, and real human transformation.',
    keywords: [
      'gym in bangalore',
      'luxury fitness sanctuary',
      'olympic weightlifting',
      'personal training bangalore',
      'strength and conditioning',
      'body transformation program',
      '24/7 gym access',
      'crossfit training studio',
      'certified master coaches',
      'free trial gym workout'
    ],
    ogImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: '',
    author: 'KSG Athletic Performance Lab',
    robots: 'index, follow'
  },
  demoMode: true,
  whiteLabelMode: false,
  clientPreviewMode: false,
  updatedAt: new Date().toISOString()
};

export const GYM_PRESETS: { name: string; description: string; config: Partial<GymConfig> }[] = [
  {
    name: 'KSG Signature Sanctuary (Default)',
    description: 'Cinematic luxury dark fitness aesthetic with amber accents.',
    config: {
      ...DEFAULT_GYM_CONFIG,
      brand: {
        ...DEFAULT_GYM_CONFIG.brand,
        gymName: 'KSG DEMO GYM',
        tagline: 'Transform Your Body. Upgrade Your Life.',
      },
      seo: {
        ...DEFAULT_GYM_CONFIG.seo,
        metaTitle: 'KSG DEMO GYM | Transform Your Body. Upgrade Your Life.',
        keywords: [
          'gym in bangalore',
          'luxury fitness sanctuary',
          'olympic weightlifting',
          'personal training bangalore',
          'strength and conditioning',
          'body transformation program',
          '24/7 gym access',
          'crossfit training studio',
          'certified master coaches',
          'free trial gym workout'
        ]
      },
      whiteLabelMode: false,
      demoMode: true
    }
  },
  {
    name: 'Titan Athletic Club - Patna',
    description: 'High-energy regional powerhouse gym with bold red & amber styling.',
    config: {
      brand: {
        gymName: 'Titan Athletic Club',
        tagline: 'Patna’s Premier Strength & Biomechanics Studio',
        logo: '',
        logoBadge: 'Boring Road Sanctuary',
        favicon: '',
        aboutText: 'Titan Athletic Club brings world-class powerlifting, CrossFit, and personal training to Patna with certified coaches and modern recovery facilities.',
        storyHeading: 'Building Champions in the Heart of Bihar.',
        storyDescription: 'Established in 2021 on Boring Road, Titan Athletic Club has empowered over 800 individuals to hit peak physical condition.'
      },
      colors: {
        primaryColor: '#e11d48',    // Rose/Crimson
        secondaryColor: '#f59e0b',  // Amber
        accentColor: '#38bdf8',     // Sky Blue
        backgroundColor: '#09090b',
        textColor: '#f8fafc'
      },
      hero: {
        heroHeading: 'REDEFINE YOUR LIMITS IN PATNA',
        heroSubtitle: 'Heavy Barbells. Unrivaled Atmosphere. Expert Coaches.',
        ctaButtonText: 'JOIN TITAN TODAY',
        secondaryButtonText: 'FREE 1-DAY PASS',
        heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1920&q=80',
        heroVideo: ''
      },
      contact: {
        phone: '+91 75499 29102',
        email: 'info@titanathleticclub.com',
        address: 'Plot 14, 3rd Floor, Boring Road, Near Pantaloons, Patna, Bihar 800001',
        city: 'Patna',
        area: 'Boring Road',
        googleMapsUrl: 'https://maps.google.com/?q=Boring+Road+Patna',
        openingHours: '05:30 AM - 10:30 PM (Mon - Sun)',
        instagram: 'https://instagram.com/titanpatna',
        facebook: 'https://facebook.com/titanpatna',
        youtube: 'https://youtube.com/@titanpatna'
      },
      seo: {
        metaTitle: 'Titan Athletic Club | Premier Gym in Boring Road, Patna',
        metaDescription: 'Titan Athletic Club in Patna features Olympic barbells, powerlifting racks, CrossFit rigs, and certified transformation coaches.',
        keywords: [
          'gym in patna',
          'boring road gym',
          'best fitness club patna',
          'powerlifting studio bihar',
          'crossfit patna',
          'personal trainer patna',
          'bodybuilding gym bihar',
          'weight loss program patna',
          'titan athletic club',
          'free gym trial patna'
        ],
        ogImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
        canonicalUrl: '',
        author: 'Titan Athletic Club Patna',
        robots: 'index, follow'
      },
      whiteLabelMode: true,
      demoMode: false
    }
  },
  {
    name: 'Vanguard Fitness Club - Delhi',
    description: 'Ultra-modern urban fitness club in Connaught Place with emerald neon tones.',
    config: {
      brand: {
        gymName: 'Vanguard Fitness Club',
        tagline: 'Capital Strength. Precision Performance.',
        logo: '',
        logoBadge: 'Connaught Place Elite',
        favicon: '',
        aboutText: 'Vanguard Fitness Club in Delhi provides premium high-intensity conditioning, isolated strength rigs, and Olympic lifting platforms in an architect-designed facility.',
        storyHeading: 'Excellence in Motion in Central Delhi.',
        storyDescription: 'Crafted for athletes, busy executives, and fitness enthusiasts who demand premium equipment and clinical coaching standards.'
      },
      colors: {
        primaryColor: '#10b981',    // Emerald
        secondaryColor: '#06b6d4',  // Cyan
        accentColor: '#fbbf24',     // Warm Yellow
        backgroundColor: '#050505',
        textColor: '#f4f4f5'
      },
      hero: {
        heroHeading: 'ELEVATE YOUR ATHLETIC POTENTIAL',
        heroSubtitle: 'Delhi’s Most Advanced Biomechanics Complex.',
        ctaButtonText: 'START YOUR MEMBERSHIP',
        secondaryButtonText: 'BOOK VIP TOUR',
        heroImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1920&q=80',
        heroVideo: ''
      },
      contact: {
        phone: '+91 75499 29102',
        email: 'delhi@vanguardfitness.com',
        address: 'B-Block, Outer Circle, Connaught Place, New Delhi 110001',
        city: 'New Delhi',
        area: 'Connaught Place',
        googleMapsUrl: 'https://maps.google.com/?q=Connaught+Place+Delhi',
        openingHours: 'Open 24 Hours Daily',
        instagram: 'https://instagram.com/vanguarddelhi',
        facebook: 'https://facebook.com/vanguarddelhi',
        youtube: 'https://youtube.com/@vanguarddelhi'
      },
      seo: {
        metaTitle: 'Vanguard Fitness Club | Central Delhi 24/7 Biomechanics Gym',
        metaDescription: 'Vanguard Fitness Club in Connaught Place, New Delhi offers luxury 24-hour gym access, Olympic lifting platforms, and elite personal conditioning.',
        keywords: [
          'gym in connaught place',
          'delhi luxury gym',
          '24/7 fitness club delhi',
          'central delhi gym',
          'biomechanics gym delhi',
          'executive personal training',
          'olympic lifting new delhi',
          'vanguard fitness club',
          'vip gym tour delhi',
          'best gym in cp'
        ],
        ogImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
        canonicalUrl: '',
        author: 'Vanguard Fitness Club Delhi',
        robots: 'index, follow'
      },
      whiteLabelMode: true,
      demoMode: false
    }
  }
];

type ConfigListener = (config: GymConfig) => void;

class GymConfigStore {
  private config: GymConfig;
  private listeners: Set<ConfigListener> = new Set();

  constructor() {
    this.config = this.loadConfig();
    this.applyCssTheme();
    this.updateDocumentMetadata();
  }

  private loadConfig(): GymConfig {
    try {
      const stored = localStorage.getItem(GYM_CONFIG_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_GYM_CONFIG,
          ...parsed,
          brand: { ...DEFAULT_GYM_CONFIG.brand, ...(parsed.brand || {}) },
          colors: { ...DEFAULT_GYM_CONFIG.colors, ...(parsed.colors || {}) },
          hero: { ...DEFAULT_GYM_CONFIG.hero, ...(parsed.hero || {}) },
          contact: { ...DEFAULT_GYM_CONFIG.contact, ...(parsed.contact || {}) },
          whatsapp: { ...DEFAULT_GYM_CONFIG.whatsapp, ...(parsed.whatsapp || {}) },
          seo: {
            ...DEFAULT_GYM_CONFIG.seo,
            ...(parsed.seo || {}),
            keywords: Array.isArray(parsed.seo?.keywords) ? parsed.seo.keywords : DEFAULT_GYM_CONFIG.seo.keywords
          }
        };
      }
    } catch (e) {
      console.warn('Failed to load gym config from storage, using defaults', e);
    }
    return { ...DEFAULT_GYM_CONFIG };
  }

  private saveConfig() {
    try {
      this.config.updatedAt = new Date().toISOString();
      localStorage.setItem(GYM_CONFIG_STORAGE_KEY, JSON.stringify(this.config));
    } catch (e) {
      console.error('Failed to save gym config to localStorage', e);
    }
    this.applyCssTheme();
    this.updateDocumentMetadata();
    this.notify();
  }

  public applyCssTheme() {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const colors = this.config.colors;
    root.style.setProperty('--color-primary', colors.primaryColor);
    root.style.setProperty('--color-secondary', colors.secondaryColor);
    root.style.setProperty('--color-accent', colors.accentColor);
    root.style.setProperty('--color-bg', colors.backgroundColor);
    root.style.setProperty('--color-text', colors.textColor);
  }

  public updateDocumentMetadata() {
    if (typeof document === 'undefined') return;
    const gymName = this.getGymName();
    const tagline = this.config.brand.tagline || 'Transform Your Body. Upgrade Your Life.';
    const customTitle = this.config.seo?.metaTitle || `${gymName} | ${tagline}`;
    document.title = customTitle;
    
    const customDesc = this.config.seo?.metaDescription || `${gymName} - ${tagline}. World-class coaches, Olympic equipment, and personalized fitness programs.`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', customDesc);

    // Meta keywords tag
    const keywordsList = this.config.seo?.keywords || [];
    const keywordsStr = keywordsList.join(', ');
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywordsStr);

    // Meta author
    if (this.config.seo?.author) {
      let metaAuthor = document.querySelector('meta[name="author"]');
      if (!metaAuthor) {
        metaAuthor = document.createElement('meta');
        metaAuthor.setAttribute('name', 'author');
        document.head.appendChild(metaAuthor);
      }
      metaAuthor.setAttribute('content', this.config.seo.author);
    }

    // Meta robots
    if (this.config.seo?.robots) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', this.config.seo.robots);
    }

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', customTitle);

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', customDesc);

    // Open Graph Image
    const ogImgSrc = this.config.seo?.ogImage || this.config.hero.heroImage;
    if (ogImgSrc) {
      let ogImg = document.querySelector('meta[property="og:image"]');
      if (!ogImg) {
        ogImg = document.createElement('meta');
        ogImg.setAttribute('property', 'og:image');
        document.head.appendChild(ogImg);
      }
      ogImg.setAttribute('content', ogImgSrc);
    }
  }

  public getConfig(): GymConfig {
    return { ...this.config };
  }

  public getGymName(): string {
    return this.config.brand.gymName || 'KSG DEMO GYM';
  }

  public getWhatsAppUrl(customMessage?: string): string {
    let rawNumber = (this.config.whatsapp.whatsappNumber || '917549929102').replace(/[^0-9]/g, '');
    if (rawNumber.length === 10) {
      rawNumber = `91${rawNumber}`;
    }
    const message = encodeURIComponent(customMessage || this.config.whatsapp.defaultMessage);
    return `https://wa.me/${rawNumber}?text=${message}`;
  }

  public getTrainerWhatsAppUrl(trainerName: string): string {
    let rawNumber = (this.config.whatsapp.whatsappNumber || '917549929102').replace(/[^0-9]/g, '');
    if (rawNumber.length === 10) {
      rawNumber = `91${rawNumber}`;
    }
    const message = encodeURIComponent(`Hello! I would like to train with Coach ${trainerName} at ${this.getGymName()}. Please share their availability.`);
    return `https://wa.me/${rawNumber}?text=${message}`;
  }

  public getPhoneUrl(): string {
    const rawPhone = this.config.contact.phone.replace(/[^0-9+]/g, '');
    return `tel:${rawPhone}`;
  }

  public updateConfig(partial: Partial<GymConfig>) {
    this.config = {
      ...this.config,
      ...partial,
      brand: { ...this.config.brand, ...(partial.brand || {}) },
      colors: { ...this.config.colors, ...(partial.colors || {}) },
      hero: { ...this.config.hero, ...(partial.hero || {}) },
      contact: { ...this.config.contact, ...(partial.contact || {}) },
      whatsapp: { ...this.config.whatsapp, ...(partial.whatsapp || {}) },
      seo: {
        ...this.config.seo,
        ...(partial.seo || {}),
        keywords: partial.seo?.keywords !== undefined 
          ? partial.seo.keywords 
          : (this.config.seo?.keywords || DEFAULT_GYM_CONFIG.seo.keywords)
      }
    };
    this.saveConfig();
  }

  public updateBrand(brand: Partial<BrandConfig>) {
    this.config.brand = { ...this.config.brand, ...brand };
    this.saveConfig();
  }

  public updateColors(colors: Partial<ThemeColors>) {
    this.config.colors = { ...this.config.colors, ...colors };
    this.saveConfig();
  }

  public updateHero(hero: Partial<HeroConfig>) {
    this.config.hero = { ...this.config.hero, ...hero };
    this.saveConfig();
  }

  public updateContact(contact: Partial<ContactConfig>) {
    this.config.contact = { ...this.config.contact, ...contact };
    this.saveConfig();
  }

  public updateWhatsApp(whatsapp: Partial<WhatsAppConfig>) {
    this.config.whatsapp = { ...this.config.whatsapp, ...whatsapp };
    this.saveConfig();
  }

  public updateSeo(seo: Partial<SeoConfig>) {
    this.config.seo = {
      ...this.config.seo,
      ...seo,
      keywords: seo.keywords !== undefined ? seo.keywords : this.config.seo.keywords
    };
    this.saveConfig();
  }

  public addKeyword(keyword: string): boolean {
    const trimmed = keyword.trim();
    if (!trimmed) return false;
    const currentKeywords = this.config.seo?.keywords || [];
    if (currentKeywords.some(k => k.toLowerCase() === trimmed.toLowerCase())) {
      return false; // Already exists
    }
    this.config.seo = {
      ...this.config.seo,
      keywords: [...currentKeywords, trimmed]
    };
    this.saveConfig();
    return true;
  }

  public editKeyword(index: number, newKeyword: string): boolean {
    const trimmed = newKeyword.trim();
    if (!trimmed) return false;
    const currentKeywords = [...(this.config.seo?.keywords || [])];
    if (index < 0 || index >= currentKeywords.length) return false;
    currentKeywords[index] = trimmed;
    this.config.seo = {
      ...this.config.seo,
      keywords: currentKeywords
    };
    this.saveConfig();
    return true;
  }

  public deleteKeyword(index: number): boolean {
    const currentKeywords = [...(this.config.seo?.keywords || [])];
    if (index < 0 || index >= currentKeywords.length) return false;
    currentKeywords.splice(index, 1);
    this.config.seo = {
      ...this.config.seo,
      keywords: currentKeywords
    };
    this.saveConfig();
    return true;
  }

  public reorderKeywords(keywords: string[]) {
    this.config.seo = {
      ...this.config.seo,
      keywords
    };
    this.saveConfig();
  }

  public bulkAddKeywords(keywordsList: string[]): number {
    const currentKeywords = [...(this.config.seo?.keywords || [])];
    let addedCount = 0;
    for (const kw of keywordsList) {
      const trimmed = kw.trim();
      if (trimmed && !currentKeywords.some(k => k.toLowerCase() === trimmed.toLowerCase())) {
        currentKeywords.push(trimmed);
        addedCount++;
      }
    }
    if (addedCount > 0) {
      this.config.seo = {
        ...this.config.seo,
        keywords: currentKeywords
      };
      this.saveConfig();
    }
    return addedCount;
  }

  public setDemoMode(enabled: boolean) {
    this.config.demoMode = enabled;
    this.saveConfig();
  }

  public setWhiteLabelMode(enabled: boolean) {
    this.config.whiteLabelMode = enabled;
    this.saveConfig();
  }

  public setClientPreviewMode(enabled: boolean) {
    this.config.clientPreviewMode = enabled;
    this.saveConfig();
  }

  public loadPreset(presetName: string) {
    const preset = GYM_PRESETS.find(p => p.name === presetName);
    if (preset && preset.config) {
      this.updateConfig(preset.config);
    }
  }

  public resetToDefaults() {
    this.config = { ...DEFAULT_GYM_CONFIG, updatedAt: new Date().toISOString() };
    this.saveConfig();
  }

  public subscribe(listener: ConfigListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const current = this.getConfig();
    this.listeners.forEach(listener => listener(current));
  }
}

export const gymConfigStore = new GymConfigStore();
