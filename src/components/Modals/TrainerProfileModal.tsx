import React from 'react';
import { motion } from 'motion/react';
import { X, Award, Star, CheckCircle2, Trophy, Users, ShieldCheck, ArrowRight, Instagram } from 'lucide-react';
import { Trainer } from '../../types';

interface TrainerProfileModalProps {
  trainer: Trainer | null;
  onClose: () => void;
  onBookTrainer: (trainer: Trainer) => void;
}

export const TrainerProfileModal: React.FC<TrainerProfileModalProps> = ({
  trainer,
  onClose,
  onBookTrainer,
}) => {
  if (!trainer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#101014] border border-white/15 overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
      >
        {/* Top Header with Image & Title */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-b from-[#1E1810] via-[#14120E] to-[#101014] border-b border-white/10 shrink-0">
          
          <button
            id="trainer-modal-close-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-br from-[#D4AF37] to-[#EF4444]">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top rounded-[14px]"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#EF4444] text-[10px] font-black uppercase text-white tracking-wider shadow">
                MASTER
              </div>
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[11px] uppercase font-bold text-[#D4AF37] tracking-wider">
                  {trainer.experience}
                </span>
                <span className="text-neutral-500">•</span>
                <div className="flex items-center gap-1 text-[#FDE047] text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{trainer.rating.toFixed(1)} Rating</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase text-white">
                {trainer.name}
              </h3>
              <p className="text-xs text-[#EF4444] font-bold uppercase tracking-wider mt-0.5">
                {trainer.role}
              </p>
              <p className="text-xs text-neutral-400 mt-2">
                Clients Coached: <strong className="text-white">{trainer.clientsTrained}</strong> athletes & executives
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Biography & Methodology
            </h4>
            <p className="text-sm text-neutral-200 font-light leading-relaxed">
              {trainer.bio}
            </p>
          </div>

          {/* Specialization Box */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
              Core Specialization
            </h4>
            <p className="text-sm font-medium text-white">
              {trainer.specialization}
            </p>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>International Certifications</span>
            </h4>
            <div className="space-y-2">
              {trainer.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Achievements */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#EF4444] mb-2.5 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#EF4444]" />
              <span>Career Milestones</span>
            </h4>
            <div className="space-y-2">
              {trainer.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <button
              id={`trainer-book-direct-${trainer.id}`}
              onClick={() => {
                onClose();
                onBookTrainer(trainer);
              }}
              className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-red-600/40 hover:shadow-red-600/70 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Book 1-on-1 Consultation with {trainer.name.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
