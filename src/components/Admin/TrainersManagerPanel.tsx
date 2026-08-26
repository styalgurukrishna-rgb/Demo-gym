import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  UserCheck, 
  Check, 
  X, 
  Save, 
  Calendar, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { Trainer } from '../../types';
import { leadStore } from '../../services/leadStore';
import { soundManager } from '../common/SoundEffects';

interface TrainersManagerPanelProps {
  trainers: Trainer[];
  onRefresh: () => void;
}

export const TrainersManagerPanel: React.FC<TrainersManagerPanelProps> = ({ trainers, onRefresh }) => {
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [certInput, setCertInput] = useState('');

  const [formData, setFormData] = useState<Omit<Trainer, 'id'>>({
    name: '',
    role: 'Strength & Conditioning Coach',
    experience: '5+ Years Experience',
    specialization: 'Hypertrophy & Biomechanics',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Dedicated coach helping athletes push past plateaus with safe biomechanics.',
    certifications: ['CSCS (NSCA)', 'ACE Personal Trainer'],
    achievements: ['Coached 200+ athletes', 'Transformation specialist'],
    instagram: '@coach_ironfit',
    rating: 4.9,
    clientsTrained: '450+',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableSlots: ['06:00 AM', '08:00 AM', '05:00 PM', '07:00 PM']
  });

  const handleOpenAdd = () => {
    soundManager.playClick();
    setFormData({
      name: '',
      role: 'Head Strength Coach',
      experience: '6+ Years',
      specialization: 'Powerlifting & Athletic Recomposition',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
      bio: 'Former athlete certified in corrective exercise and progressive overload.',
      certifications: ['NSCA CSCS', 'Precision Nutrition L1'],
      achievements: ['99% client retention', 'Over 10,000 coaching hours'],
      instagram: '@coach_iron',
      rating: 4.9,
      clientsTrained: '300+',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      availableSlots: ['07:00 AM', '09:00 AM', '05:00 PM', '07:00 PM']
    });
    setEditingTrainer(null);
    setIsAddingNew(true);
  };

  const handleOpenEdit = (trainer: Trainer) => {
    soundManager.playClick();
    setEditingTrainer(trainer);
    setFormData({
      name: trainer.name,
      role: trainer.role,
      experience: trainer.experience,
      specialization: trainer.specialization,
      image: trainer.image,
      bio: trainer.bio,
      certifications: [...trainer.certifications],
      achievements: [...(trainer.achievements || [])],
      instagram: trainer.instagram || '',
      rating: trainer.rating,
      clientsTrained: trainer.clientsTrained,
      availableDays: [...(trainer.availableDays || [])],
      availableSlots: [...(trainer.availableSlots || [])]
    });
    setIsAddingNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    soundManager.playSuccess();
    if (editingTrainer) {
      leadStore.updateTrainer(editingTrainer.id, formData);
    } else {
      leadStore.addTrainer(formData);
    }

    setIsAddingNew(false);
    setEditingTrainer(null);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this trainer?')) {
      soundManager.playClick();
      leadStore.deleteTrainer(id);
      onRefresh();
    }
  };

  const handleAddCert = () => {
    if (!certInput.trim()) return;
    setFormData({
      ...formData,
      certifications: [...formData.certifications, certInput.trim()]
    });
    setCertInput('');
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">
              Coaching Roster
            </span>
            <span className="text-xs text-zinc-500">• {trainers.length} Certified Coaches</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase mt-1">
            Trainer & Coach Profiles
          </h2>
          <p className="text-xs text-zinc-400">
            Showcase certifications, bios, specializations, and schedule slots for VIP bookings.
          </p>
        </div>

        <button
          id="add-trainer-profile-btn"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW TRAINER</span>
        </button>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((t) => (
          <div
            key={t.id}
            id={`admin-trainer-card-${t.id}`}
            className="p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between overflow-hidden group hover:border-amber-500/40 transition-all"
          >
            <div>
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-mono font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{t.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md text-[10px] font-bold uppercase text-zinc-300">
                  {t.experience}
                </div>
              </div>

              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {t.name}
              </h3>
              <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mt-0.5">
                {t.role}
              </div>
              <p className="text-zinc-400 text-xs mt-2 line-clamp-2">
                {t.bio}
              </p>

              {/* Certifications preview */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.certifications.slice(0, 2).map((c, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between gap-2">
              <button
                onClick={() => handleOpenEdit(t)}
                className="flex-1 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="p-2 rounded-xl bg-zinc-950 hover:bg-red-500/20 border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-red-400 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT TRAINER MODAL */}
      {(isAddingNew || editingTrainer) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-100 my-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingTrainer(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">
              {editingTrainer ? `Edit Coach ${editingTrainer.name}` : 'Add Master Coach'}
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Fill in trainer credentials, profile portrait, and training specialties.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Coach Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Singhania"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Official Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Transformation Director"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Experience Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10+ Years Experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Star Rating (1.0 to 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Portrait Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Specialization Focus
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hypertrophy, Biomechanics & Injury Rehab"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Bio / Philosophy
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none resize-none"
                />
              </div>

              {/* Certifications Builder */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Certifications
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="e.g. NSCA CSCS Certified"
                    value={certInput}
                    onChange={(e) => setCertInput(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCert}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.certifications.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-1.5">
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          certifications: formData.certifications.filter((_, idx) => idx !== i)
                        })}
                        className="text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingTrainer(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingTrainer ? 'SAVE COACH' : 'CREATE COACH'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
