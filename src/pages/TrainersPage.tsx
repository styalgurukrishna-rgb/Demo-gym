import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  Award, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Instagram,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { PageType, ModalState, Trainer } from '../types';
import { leadStore } from '../services/leadStore';
import { handleImageError } from '../utils/imageFallback';

interface TrainersPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const TrainersPage: React.FC<TrainersPageProps> = ({ onNavigate, onOpenModal }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [trainers, setTrainers] = useState<Trainer[]>(leadStore.getTrainers());

  useEffect(() => {
    const unsub = leadStore.subscribe(() => {
      setTrainers(leadStore.getTrainers());
    });
    return () => unsub();
  }, []);

  const specialties = [
    { id: 'all', label: 'All Master Coaches' },
    { id: 'strength', label: 'Strength & Hypertrophy' },
    { id: 'recomp', label: 'Body Recomposition & Diet' },
    { id: 'hiit', label: 'HIIT & Conditioning' },
    { id: 'mobility', label: 'Mobility & Rehab' },
    { id: 'crossfit', label: 'CrossFit & Olympic Lifting' }
  ];

  const filteredTrainers = trainers.filter((trainer: Trainer) => {
    if (selectedSpecialty === 'all') return true;
    const spec = (trainer.specialization || '').toLowerCase();
    if (selectedSpecialty === 'strength') return spec.includes('powerlifting') || spec.includes('hypertrophy') || spec.includes('strength');
    if (selectedSpecialty === 'recomp') return spec.includes('recomposition') || spec.includes('diet') || spec.includes('fat loss');
    if (selectedSpecialty === 'hiit') return spec.includes('vo2') || spec.includes('hiit') || spec.includes('conditioning');
    if (selectedSpecialty === 'mobility') return spec.includes('mobility') || spec.includes('rehab') || spec.includes('posture');
    if (selectedSpecialty === 'crossfit') return spec.includes('olympic') || spec.includes('plyometrics') || spec.includes('crossfit');
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* 1. HERO HEADER */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-4">
            <Award className="w-4 h-4" /> 100% Internationally Certified
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            EXPERT <span className="text-amber-400">TRAINERS</span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto mt-4 font-light">
            Train with CSCS, ACE, and ISSA master coaches with a combined 60+ years of competitive athletic excellence.
          </p>

          {/* Specialty Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {specialties.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSpecialty(s.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedSpecialty === s.id
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TRAINERS DIRECTORY GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrainers.map((trainer: Trainer, idx: number) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/50 transition-all overflow-hidden flex flex-col justify-between shadow-2xl group"
            >
              {/* Photo & Badge */}
              <div className="relative h-80 w-full overflow-hidden bg-zinc-950">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                
                {/* Experience Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-200 text-xs font-bold font-mono">
                  {trainer.experience}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-black font-black text-xs flex items-center gap-1 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-black" />
                  <span>{trainer.rating.toFixed(1)}</span>
                </div>

                {/* Name and Role */}
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">{trainer.specialization}</div>
                  <h2 className="text-2xl font-black text-white uppercase">{trainer.name}</h2>
                  <div className="text-xs text-zinc-300 font-medium">{trainer.role}</div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed mb-6">
                    {trainer.bio}
                  </p>

                  {/* Highlights Strip */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-zinc-950 border border-zinc-800/80 mb-6 text-center">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold">Clients Transformed</span>
                      <div className="text-sm font-black text-white mt-0.5">{trainer.clientsTrained}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold">Certifications</span>
                      <div className="text-xs font-bold text-amber-400 mt-0.5 truncate">{trainer.certifications[0]?.split(' ')[0] || 'Certified'}</div>
                    </div>
                  </div>

                  {/* Certifications Checklist */}
                  <div className="mb-6">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">Key Credentials:</span>
                    <ul className="space-y-1.5">
                      {trainer.certifications.slice(0, 2).map((cert, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    id={`view-profile-${trainer.id}`}
                    onClick={() => onOpenModal('trainer', trainer)}
                    className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700 transition-all text-center"
                  >
                    View Profile
                  </button>
                  <button
                    id={`book-coach-${trainer.id}`}
                    onClick={() => onOpenModal('consultation', { trainerName: trainer.name, trainerRole: trainer.role })}
                    className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all text-center flex items-center justify-center gap-1"
                  >
                    <span>Book Coach</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. 1-ON-1 COACHING BANNER */}
      <section className="py-16 bg-zinc-900/60 border-t border-zinc-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Bespoke Personal Training
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Accelerate Results with 1-on-1 Dedicated Coaching
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Get personalized workout splits, daily WhatsApp accountability, and real-time form checks.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest shadow-xl transition-all"
            >
              SCHEDULE FITNESS CONSULTATION
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainersPage;
