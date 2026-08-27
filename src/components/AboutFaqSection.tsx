import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  CreditCard, 
  Dumbbell, 
  Building2, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';
import { PageType, ModalState } from '../types';
import { GYM_INFO } from '../data/gymData';
import { soundManager } from './common/SoundEffects';

export interface FaqItem {
  id: string;
  category: 'all' | 'membership' | 'training' | 'facilities';
  categoryLabel: string;
  categoryIcon: React.ElementType;
  q: string;
  a: string;
  highlight?: string;
}

export const ABOUT_FAQS: FaqItem[] = [
  // MEMBERSHIP
  {
    id: 'faq-mem-1',
    category: 'membership',
    categoryLabel: 'Membership',
    categoryIcon: CreditCard,
    q: 'How does the Complimentary 1-Day VIP Pass work?',
    a: 'Your pass grants 100% full, unrestricted access to our Panatta strength floor, Eleiko lifting platforms, luxury locker rooms, and recovery zone. It also includes an InBody 770 biometric scan and a 30-minute orientation with a certified master coach. No credit card or hard commitment required.',
    highlight: '100% Free VIP Trial'
  },
  {
    id: 'faq-mem-2',
    category: 'membership',
    categoryLabel: 'Membership',
    categoryIcon: CreditCard,
    q: 'Can I freeze or pause my membership when traveling or injured?',
    a: 'Yes! Quarterly memberships include up to 14 days of freeze time, while Annual VIP memberships allow up to 45 days of pause with zero administrative fees. Freezes can be activated instantly via our member portal or by contacting concierge.',
    highlight: 'Zero Freeze Fees'
  },
  {
    id: 'faq-mem-3',
    category: 'membership',
    categoryLabel: 'Membership',
    categoryIcon: CreditCard,
    q: 'What is the difference between Premium and VIP tiers?',
    a: 'The Premium tier offers 24/7 gym access, 8 monthly 1-on-1 personal training sessions, and group classes. The VIP tier adds unlimited dedicated 1-on-1 coaching, bi-weekly InBody 770 scans, unlimited sauna & cold plunge spa, 24/7 direct WhatsApp coach concierge, daily protein shakes, and reserved valet parking.',
    highlight: 'Elite VIP Perks'
  },
  {
    id: 'faq-mem-4',
    category: 'membership',
    categoryLabel: 'Membership',
    categoryIcon: CreditCard,
    q: 'Are there any hidden registration or annual maintenance fees?',
    a: 'None whatsoever. The pricing displayed on our website and in our dashboard is completely transparent and all-inclusive. It covers your RFID entry pass, standard locker usage, hydration bar, and rainfall shower amenities.',
    highlight: 'Transparent Pricing'
  },

  // TRAINING & COACHING
  {
    id: 'faq-trn-1',
    category: 'training',
    categoryLabel: 'Training & Coaching',
    categoryIcon: Dumbbell,
    q: 'I am a complete beginner. Will I receive guidance on how to use the equipment?',
    a: 'Absolutely. Every new member receives a complimentary movement assessment and personalized equipment walkthrough. Furthermore, our certified floor coaches are always stationed on the floor to check posture, spot heavy lifts, and answer form questions.',
    highlight: 'Beginner Friendly'
  },
  {
    id: 'faq-trn-2',
    category: 'training',
    categoryLabel: 'Training & Coaching',
    categoryIcon: Dumbbell,
    q: 'What credentials and certifications do your coaches possess?',
    a: 'All KSG master coaches hold internationally accredited certifications, including NSCA CSCS (Certified Strength & Conditioning Specialist), ACE Master Trainer, NASM-PES, and USA Weightlifting credentials, backed by extensive experience in biomechanics and injury prevention.',
    highlight: 'NSCA & ACE Certified'
  },
  {
    id: 'faq-trn-3',
    category: 'training',
    categoryLabel: 'Training & Coaching',
    categoryIcon: Dumbbell,
    q: 'Do you provide personalized nutrition and meal plans?',
    a: 'Yes. Our Premium and VIP memberships include custom macronutrient calculations, meal timing schedules, and supplement guidance designed by clinical sports nutritionists to support your specific body recomposition goals.',
    highlight: 'Sports Nutrition'
  },
  {
    id: 'faq-trn-4',
    category: 'training',
    categoryLabel: 'Training & Coaching',
    categoryIcon: Dumbbell,
    q: 'How do I schedule personal training sessions or class slots?',
    a: 'You can book slots seamlessly 24/7 using our online booking page, member dashboard, or by messaging your dedicated coach directly on WhatsApp. Booking opens 7 days in advance.',
    highlight: 'Flexible Booking'
  },

  // FACILITIES & AMENITIES
  {
    id: 'faq-fac-1',
    category: 'facilities',
    categoryLabel: 'Facilities & Amenities',
    categoryIcon: Building2,
    q: 'What are the operating hours and how does 24/7 access work?',
    a: 'Our 15,000 sq.ft athletic facility is open 24 hours a day, 7 days a week, 365 days a year for active members via high-security biometric RFID turnstiles. Reception concierge and master coaches are available on-site daily from 5:00 AM to 11:00 PM.',
    highlight: 'Open 24/7/365'
  },
  {
    id: 'faq-fac-2',
    category: 'facilities',
    categoryLabel: 'Facilities & Amenities',
    categoryIcon: Building2,
    q: 'What equipment brands are available on the gym floor?',
    a: 'We feature imported Italian Panatta isolateral plate-loaded machinery, Swedish Eleiko IWF-certified Olympic barbells and calibrated competition plates, custom oak deadlift platforms, Woodway curved treadmills, and Concept2 rowers.',
    highlight: 'Panatta & Eleiko'
  },
  {
    id: 'faq-fac-3',
    category: 'facilities',
    categoryLabel: 'Facilities & Amenities',
    categoryIcon: Building2,
    q: 'What recovery, spa, and hydrotherapy amenities are provided?',
    a: 'Our biohacking recovery suite includes Finnish Cedar full-spectrum infrared saunas (reaching 85°C), 4°C chilled stainless steel cold plunge tubs, eucalyptus crystal steam rooms, and Normatec dynamic pneumatic compression boots for accelerated recovery.',
    highlight: 'Infrared & Cold Plunge'
  },
  {
    id: 'faq-fac-4',
    category: 'facilities',
    categoryLabel: 'Facilities & Amenities',
    categoryIcon: Building2,
    q: 'What are your hygiene, air quality, and locker standards?',
    a: 'We maintain medical-grade HEPA-14 positive pressure air filtration systems that exchange and sanitize the training floor air every 6 minutes. Locker rooms feature Italian Carrara marble finishes, Dyson supersonic styling stations, and rainfall showers with premium toiletries.',
    highlight: 'HEPA-14 Clean Air'
  },
  {
    id: 'faq-fac-5',
    category: 'facilities',
    categoryLabel: 'Facilities & Amenities',
    categoryIcon: Building2,
    q: 'Is there dedicated parking and valet service available?',
    a: 'Yes, we provide 3 secure underground parking floors with complimentary valet service for all VIP and Annual members, plus high-speed Level-2 EV charging points.',
    highlight: 'Complimentary Valet'
  }
];

interface AboutFaqSectionProps {
  onNavigate?: (page: PageType) => void;
  onOpenModal?: (type: ModalState['type'], data?: any) => void;
}

export const AboutFaqSection: React.FC<AboutFaqSectionProps> = ({ onNavigate, onOpenModal }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'membership' | 'training' | 'facilities'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-mem-1');

  const categories = [
    { id: 'all' as const, label: 'All Questions', icon: HelpCircle, count: ABOUT_FAQS.length },
    { id: 'membership' as const, label: 'Membership', icon: CreditCard, count: ABOUT_FAQS.filter(f => f.category === 'membership').length },
    { id: 'training' as const, label: 'Training & Coaches', icon: Dumbbell, count: ABOUT_FAQS.filter(f => f.category === 'training').length },
    { id: 'facilities' as const, label: 'Facilities & Spa', icon: Building2, count: ABOUT_FAQS.filter(f => f.category === 'facilities').length },
  ];

  const filteredFaqs = ABOUT_FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.highlight && faq.highlight.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    soundManager.playClick();
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleCategorySelect = (catId: 'all' | 'membership' | 'training' | 'facilities') => {
    soundManager.playClick();
    setActiveCategory(catId);
  };

  return (
    <section id="about-faq-section" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions? Everything You Need To Know</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              FREQUENTLY ASKED <span className="text-amber-400">QUESTIONS</span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Clear, transparent answers about our membership plans, coach credentials, Italian biomechanical equipment, and 24/7 amenities.
            </p>
          </motion.div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              id="faq-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, equipment, coaching, or membership..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-wider bg-zinc-800 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`faq-tab-${cat.id}`}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-amber-400'}`} />
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${isActive ? 'bg-black/20 text-black font-black' : 'bg-zinc-800 text-zinc-400'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800 text-zinc-400">
              <HelpCircle className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h4 className="text-base font-bold text-white uppercase">No matching questions found</h4>
              <p className="text-xs text-zinc-500 mt-1">
                Try searching for keywords like "trial", "sauna", "trainer", "hours", or "freeze".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-200 text-xs font-bold uppercase hover:bg-zinc-700 transition-colors"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              const Icon = faq.categoryIcon;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-zinc-900 border-amber-500/50 shadow-xl shadow-black/40'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <button
                    id={`faq-btn-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 sm:mt-0 transition-colors ${
                        isOpen ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-amber-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500/90 font-mono">
                            {faq.categoryLabel}
                          </span>
                          {faq.highlight && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              {faq.highlight}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {faq.q}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-amber-500 text-black rotate-180 shadow-md'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80">
                          <p className="mt-2">{faq.a}</p>
                          
                          {/* Quick action pill if applicable */}
                          {faq.category === 'membership' && onNavigate && (
                            <div className="mt-4 pt-3 border-t border-zinc-800/50 flex flex-wrap items-center gap-3">
                              <span className="text-xs text-zinc-400">Want to explore all membership pricing?</span>
                              <button
                                onClick={() => onNavigate('pricing')}
                                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer underline underline-offset-4"
                              >
                                View Membership Matrix <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          {faq.category === 'training' && onNavigate && (
                            <div className="mt-4 pt-3 border-t border-zinc-800/50 flex flex-wrap items-center gap-3">
                              <span className="text-xs text-zinc-400">Want to browse trainer credentials and bios?</span>
                              <button
                                onClick={() => onNavigate('trainers')}
                                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer underline underline-offset-4"
                              >
                                View Master Coaches <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          {faq.category === 'facilities' && onNavigate && (
                            <div className="mt-4 pt-3 border-t border-zinc-800/50 flex flex-wrap items-center gap-3">
                              <span className="text-xs text-zinc-400">Want to view the 15,000 sq.ft facility floor plan?</span>
                              <button
                                onClick={() => onNavigate('facilities')}
                                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer underline underline-offset-4"
                              >
                                Explore Facilities & Zones <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Bottom Support / WhatsApp Concierge Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>24/7 Member Concierge Active</span>
            </div>
            <h4 className="text-lg font-black text-white uppercase tracking-tight">
              Have a Specific Question We Didn't Answer?
            </h4>
            <p className="text-xs text-zinc-400 max-w-lg">
              Speak directly with our head trainer or admissions concierge for customized corporate plans, injury rehabilitation, or bespoke schedules.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              id="about-faq-whatsapp-btn"
              href={`https://wa.me/${GYM_INFO.whatsapp.replace('+', '')}?text=Hello%20KSG%20DEMO%20GYM%2C%20I%20have%20a%20question%20about%20your%20membership%2C%20training%2C%20or%20facilities.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat On WhatsApp</span>
            </a>

            {onNavigate && (
              <button
                id="about-faq-book-trial-btn"
                onClick={() => onNavigate('booking')}
                className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 border border-zinc-700 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Book VIP Pass</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
