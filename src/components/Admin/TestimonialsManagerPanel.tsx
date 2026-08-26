import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Quote, 
  TrendingUp, 
  UserCheck 
} from 'lucide-react';
import { Testimonial } from '../../types';
import { leadStore } from '../../services/leadStore';
import { soundManager } from '../common/SoundEffects';

interface TestimonialsManagerPanelProps {
  onRefresh?: () => void;
}

export const TestimonialsManagerPanel: React.FC<TestimonialsManagerPanelProps> = ({ onRefresh }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(leadStore.getTestimonials());
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
    name: '',
    role: 'Member & Athlete',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    transformation: '-12kg Fat Loss & Built Endurance',
    quote: 'The coaching team and facilities transformed my physical resilience and energy levels completely.',
    timeframe: 'Member for 6 Months'
  });

  const loadData = () => {
    setTestimonials(leadStore.getTestimonials());
    if (onRefresh) onRefresh();
  };

  const handleOpenAdd = () => {
    soundManager.playClick();
    setFormData({
      name: '',
      role: 'Member & Business Owner',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      transformation: 'Gained 5kg Muscle & Fixed Back Pain',
      quote: 'Best investment in my health. The coaches guide biomechanics with precision and the vibe is elite.',
      timeframe: 'Member for 1 Year'
    });
    setEditingItem(null);
    setIsAddingNew(true);
  };

  const handleOpenEdit = (item: Testimonial) => {
    soundManager.playClick();
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      avatar: item.avatar,
      rating: item.rating,
      transformation: item.transformation,
      quote: item.quote,
      timeframe: item.timeframe
    });
    setIsAddingNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) return;

    soundManager.playSuccess();
    if (editingItem) {
      leadStore.updateTestimonial(editingItem.id, formData);
    } else {
      leadStore.addTestimonial(formData);
    }

    setIsAddingNew(false);
    setEditingItem(null);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this customer testimonial?')) {
      soundManager.playClick();
      leadStore.deleteTestimonial(id);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">
              Social Proof
            </span>
            <span className="text-xs text-zinc-500">• {testimonials.length} Verified Reviews</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase mt-1">
            Customer Reviews & Transformations
          </h2>
          <p className="text-xs text-zinc-400">
            Publish high-impact member feedback, transformation stats, and verified star ratings.
          </p>
        </div>

        <button
          id="add-testimonial-btn"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>ADD REVIEW</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            id={`admin-testimonial-card-${t.id}`}
            className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between hover:border-amber-500/40 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white uppercase">{t.name}</h4>
                    <div className="text-xs text-zinc-400">{t.role}</div>
                    <div className="text-[11px] text-zinc-500">{t.timeframe}</div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Transformation Pill */}
              <div className="mb-3 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{t.transformation}</span>
              </div>

              <p className="text-zinc-300 text-xs italic leading-relaxed">
                "{t.quote}"
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between gap-2">
              <button
                onClick={() => handleOpenEdit(t)}
                className="flex-1 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3 h-3 text-amber-400" />
                <span>Edit Review</span>
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="p-2 rounded-xl bg-zinc-950 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {(isAddingNew || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl text-zinc-100"
          >
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingItem(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">
              {editingItem ? 'Edit Review' : 'Add Member Testimonial'}
            </h3>
            <p className="text-xs text-zinc-400 mb-5">
              Enter athlete feedback and transformation achievements.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Member Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Avatar Photo URL
                </label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm font-mono outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Transformation Metric
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. -14kg Fat Loss in 90 Days"
                    value={formData.transformation}
                    onChange={(e) => setFormData({ ...formData, transformation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-emerald-400 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Member Tenure
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Member for 10 Months"
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Member Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingItem(null);
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
                  <span>{editingItem ? 'SAVE REVIEW' : 'PUBLISH REVIEW'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
