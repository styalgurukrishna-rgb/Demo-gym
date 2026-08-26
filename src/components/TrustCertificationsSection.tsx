import React from 'react';
import { motion } from 'motion/react';
import { Award, Dumbbell, ShieldCheck, Clock, CheckCircle2, Sparkles, Star, Users } from 'lucide-react';
import { TRUST_CERTIFICATIONS } from '../data/gymData';

export const TrustCertificationsSection: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Award,
    Dumbbell,
    ShieldCheck,
    Clock,
  };

  const trustStats = [
    { value: '500+', label: 'Active Members', desc: 'Transforming weekly' },
    { value: '10+', label: 'Master Trainers', desc: 'CSCS & ACE Certified' },
    { value: '12+', label: 'Years Experience', desc: 'Bangalore Flagship' },
    { value: '24/7', label: 'Facility Access', desc: 'Biometric RFID Turnstiles' },
  ];

  return (
    <section className="relative py-24 bg-[#080808] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Uncompromising Standards</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
            CERTIFIED EXCELLENCE. <br />
            <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">
              ZERO COMPROMISES.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light">
            We invest in certified biomechanics, medical hygiene, and elite coaching credentials to deliver an authentic high-performance sanctuary.
          </p>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_CERTIFICATIONS.map((item, idx) => {
            const Icon = iconMap[item.iconName] || Award;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-6 sm:p-7 rounded-3xl bg-[#121216] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EF4444]/20 to-[#D4AF37]/20 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-extrabold uppercase tracking-wider text-neutral-300">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white font-['Syne',sans-serif] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4 Animated Numbers Bar */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#141010] via-[#101016] to-[#0A0A0E] border border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {trustStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-1"
            >
              <span className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-black bg-gradient-to-r from-white via-[#FFF4B8] to-[#D4AF37] bg-clip-text text-transparent block">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white block">
                {stat.label}
              </span>
              <span className="text-[11px] text-neutral-400 block font-light">
                {stat.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
