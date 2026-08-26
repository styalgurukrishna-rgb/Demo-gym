import React from 'react';
import { motion } from 'motion/react';
import { X, Check, Sparkles, MapPin } from 'lucide-react';
import { Facility } from '../../types';

interface FacilityLightboxModalProps {
  facility: Facility | null;
  onClose: () => void;
  onOpenJoin: () => void;
}

export const FacilityLightboxModal: React.FC<FacilityLightboxModalProps> = ({
  facility,
  onClose,
  onOpenJoin,
}) => {
  if (!facility) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl rounded-3xl bg-[#0F0F12] border border-white/15 overflow-hidden shadow-2xl z-10 my-4 flex flex-col"
      >
        {/* Close Button */}
        <button
          id="facility-lightbox-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Facility View */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
          <img
            src={facility.image}
            alt={facility.title}
            className="w-full h-full object-cover brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-black/30" />
          
          <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            {facility.highlight}
          </div>
        </div>

        {/* Facility Info Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
              {facility.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] uppercase text-white mt-0.5">
              {facility.title}
            </h3>
            <p className="text-sm text-neutral-300 font-light mt-2 leading-relaxed">
              {facility.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Included Specifications & Features:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {facility.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/5 text-xs text-neutral-200">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <div className="text-xs text-neutral-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Available 24/7 to all active KSG Demo Gym members</span>
            </div>

            <button
              id="facility-join-from-lightbox-btn"
              onClick={() => {
                onClose();
                onOpenJoin();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg hover:scale-105 transition-all cursor-pointer shrink-0"
            >
              Get Gym Access Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
