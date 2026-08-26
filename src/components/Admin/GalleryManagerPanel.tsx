import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Sparkles, 
  Tag, 
  Filter 
} from 'lucide-react';
import { GalleryItem } from '../../types';
import { leadStore } from '../../services/leadStore';
import { soundManager } from '../common/SoundEffects';

interface GalleryManagerPanelProps {
  onRefresh?: () => void;
}

export const GalleryManagerPanel: React.FC<GalleryManagerPanelProps> = ({ onRefresh }) => {
  const [gallery, setGallery] = useState<GalleryItem[]>(leadStore.getGallery());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formData, setFormData] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'workout',
    categoryLabel: 'Workout',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    description: '',
    tag: 'Strength'
  });

  const loadData = () => {
    setGallery(leadStore.getGallery());
    if (onRefresh) onRefresh();
  };

  const handleOpenAdd = () => {
    soundManager.playClick();
    setFormData({
      title: '',
      category: 'workout',
      categoryLabel: 'Workout',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      description: '',
      tag: 'Heavy Lifting'
    });
    setEditingItem(null);
    setIsAddingNew(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    soundManager.playClick();
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      categoryLabel: item.categoryLabel,
      image: item.image,
      description: item.description || '',
      tag: item.tag || ''
    });
    setIsAddingNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image.trim()) return;

    soundManager.playSuccess();
    if (editingItem) {
      leadStore.updateGalleryItem(editingItem.id, formData);
    } else {
      leadStore.addGalleryItem(formData);
    }

    setIsAddingNew(false);
    setEditingItem(null);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this image from the public gallery?')) {
      soundManager.playClick();
      leadStore.deleteGalleryItem(id);
      loadData();
    }
  };

  const filtered = gallery.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">
              Visual Showcase
            </span>
            <span className="text-xs text-zinc-500">• {gallery.length} Images</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase mt-1">
            Gym Facility & Activity Gallery
          </h2>
          <p className="text-xs text-zinc-400">
            Manage high-res facility photos, workout captures, transformations, and event highlights.
          </p>
        </div>

        <button
          id="add-gallery-photo-btn"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>ADD PHOTO</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {['all', 'workout', 'trainers', 'facilities', 'transformation', 'events'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundManager.playClick();
              setActiveCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-amber-500 text-black'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800'
            }`}
          >
            {cat === 'all' ? 'All Images' : cat}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            id={`admin-gallery-card-${item.id}`}
            className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden group hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold text-amber-400 uppercase">
                  {item.categoryLabel || item.category}
                </div>
                {item.tag && (
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-zinc-950/80 backdrop-blur-md text-[10px] font-mono text-zinc-300">
                    #{item.tag}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h4 className="text-sm font-bold text-white uppercase line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-zinc-400 text-xs mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-3 bg-zinc-950/80 border-t border-zinc-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => handleOpenEdit(item)}
                className="flex-1 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase flex items-center justify-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3 text-amber-400" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 cursor-pointer"
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
              {editingItem ? 'Edit Gallery Photo' : 'Add Photo to Gallery'}
            </h3>
            <p className="text-xs text-zinc-400 mb-5">
              Specify image URL, category, title, and social tag.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavy Deadlift Platform"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm font-mono outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      const label = cat.charAt(0).toUpperCase() + cat.slice(1);
                      setFormData({ ...formData, category: cat, categoryLabel: label });
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                  >
                    <option value="workout">Workout</option>
                    <option value="trainers">Trainers</option>
                    <option value="facilities">Facilities</option>
                    <option value="transformation">Transformation</option>
                    <option value="events">Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Tag / Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Deadlift"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  <span>{editingItem ? 'SAVE PHOTO' : 'ADD PHOTO'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
