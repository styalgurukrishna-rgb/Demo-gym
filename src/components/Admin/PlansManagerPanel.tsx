import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  Star, 
  Crown, 
  Save, 
  X, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PricingPlan } from '../../types';
import { leadStore } from '../../services/leadStore';
import { soundManager } from '../common/SoundEffects';
import { DeleteConfirmModal } from '../Modals/DeleteConfirmModal';

interface PlansManagerPanelProps {
  plans: PricingPlan[];
  onRefresh: () => void;
}

export const PlansManagerPanel: React.FC<PlansManagerPanelProps> = ({ plans, onRefresh }) => {
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [deletePlanTarget, setDeletePlanTarget] = useState<PricingPlan | null>(null);
  const [featureInput, setFeatureInput] = useState('');

  const [formData, setFormData] = useState<Omit<PricingPlan, 'id'>>({
    name: 'NEW PLAN',
    price: 2500,
    period: '/month',
    tagline: 'Access tier description...',
    isPopular: false,
    isVIP: false,
    discountBadge: 'Standard Tier',
    ctaText: 'JOIN NOW',
    features: [
      'Full Gym Access (Open 24/7)',
      'Locker Facility & RFID Entry Pass',
      'Free High-Speed Wi-Fi & Lounge'
    ]
  });

  const handleOpenAdd = () => {
    soundManager.playClick();
    setFormData({
      name: '',
      price: 2500,
      period: '/month',
      tagline: '',
      isPopular: false,
      isVIP: false,
      discountBadge: 'Billed Monthly',
      ctaText: 'SUBSCRIBE NOW',
      features: ['Full Gym Access (Open 24/7)', 'Locker Facility & Shower Access']
    });
    setEditingPlan(null);
    setIsAddingNew(true);
  };

  const handleOpenEdit = (plan: PricingPlan) => {
    soundManager.playClick();
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      tagline: plan.tagline,
      isPopular: !!plan.isPopular,
      isVIP: !!plan.isVIP,
      discountBadge: plan.discountBadge || '',
      ctaText: plan.ctaText || 'JOIN NOW',
      features: [...plan.features]
    });
    setIsAddingNew(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      soundManager.playError();
      alert('Please provide plan name and price');
      return;
    }

    soundManager.playSuccess();
    if (editingPlan) {
      leadStore.updatePlan(editingPlan.id, formData);
    } else {
      leadStore.addPlan(formData);
    }

    setEditingPlan(null);
    setIsAddingNew(false);
    onRefresh();
  };

  const handleDuplicate = (id: string) => {
    soundManager.playSuccess();
    leadStore.duplicatePlan(id);
    onRefresh();
  };

  const handleConfirmDelete = () => {
    if (deletePlanTarget) {
      leadStore.deletePlan(deletePlanTarget.id);
      setDeletePlanTarget(null);
      onRefresh();
    }
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData({
      ...formData,
      features: [...formData.features, featureInput.trim()]
    });
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">
              Live Pricing Matrix
            </span>
            <span className="text-xs text-zinc-500">• {plans.length} Active Plans</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase mt-1">
            Membership Plans & Pricing
          </h2>
          <p className="text-xs text-zinc-400">
            Create, edit, duplicate, and delete public subscription plans shown to visitors.
          </p>
        </div>

        <button
          id="add-new-plan-btn"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW PLAN</span>
        </button>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          return (
            <motion.div
              key={plan.id}
              id={`admin-plan-card-${plan.id}`}
              className={`p-6 rounded-3xl border relative flex flex-col justify-between transition-all ${
                plan.isVIP
                  ? 'bg-gradient-to-b from-zinc-900 to-zinc-950 border-amber-500/50 shadow-2xl shadow-amber-500/10'
                  : plan.isPopular
                  ? 'bg-zinc-900 border-amber-500/80 shadow-xl'
                  : 'bg-zinc-900/80 border-zinc-800'
              }`}
            >
              {/* Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-1.5">
                  {plan.isVIP && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-black uppercase flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      <span>VIP ELITE</span>
                    </span>
                  )}
                  {plan.isPopular && !plan.isVIP && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase flex items-center gap-1">
                      <Star className="w-3 h-3 fill-black" />
                      <span>MOST POPULAR</span>
                    </span>
                  )}
                  {plan.discountBadge && (
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-mono">
                      {plan.discountBadge}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-zinc-400 text-xs mt-1 min-h-[32px]">
                  {plan.tagline}
                </p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-sm font-bold text-amber-400">₹</span>
                  <span className="text-3xl font-black text-white font-mono">
                    {plan.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-zinc-500 font-bold">{plan.period}</span>
                </div>

                {/* Features List */}
                <div className="mt-5 pt-4 border-t border-zinc-800/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                    Included Benefits ({plan.features.length})
                  </span>
                  {plan.features.slice(0, 5).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  {plan.features.length > 5 && (
                    <span className="text-[11px] text-zinc-500 italic block">
                      + {plan.features.length - 5} more perks
                    </span>
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between gap-2">
                <button
                  id={`edit-plan-${plan.id}-btn`}
                  onClick={() => handleOpenEdit(plan)}
                  className="flex-1 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit</span>
                </button>
                <button
                  id={`duplicate-plan-${plan.id}-btn`}
                  onClick={() => handleDuplicate(plan.id)}
                  title="Duplicate Plan"
                  className="p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  id={`delete-plan-${plan.id}-btn`}
                  onClick={() => setDeletePlanTarget(plan)}
                  title="Delete Plan"
                  className="p-2 rounded-xl bg-zinc-950 hover:bg-red-500/20 border border-zinc-800 hover:border-red-500/40 text-zinc-400 hover:text-red-400 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ADD / EDIT PLAN MODAL */}
      {(isAddingNew || editingPlan) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-100 my-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => {
                setIsAddingNew(false);
                setEditingPlan(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">
              {editingPlan ? `Edit ${editingPlan.name}` : 'Create New Pricing Tier'}
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Configure price, billing frequency, perks list, and featured badges.
            </p>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Plan Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PLATINUM PRO"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 3500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm font-mono outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Billing Period
                  </label>
                  <input
                    type="text"
                    placeholder="/month"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Discount / Tag Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MOST POPULAR"
                    value={formData.discountBadge}
                    onChange={(e) => setFormData({ ...formData, discountBadge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Tagline / Target Audience
                </label>
                <input
                  type="text"
                  placeholder="e.g. Best for dedicated bodybuilders and athletes..."
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                />
              </div>

              {/* Badges Toggles */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="w-4 h-4 accent-amber-500"
                  />
                  <span className="text-xs font-bold text-zinc-200">Highlight as Most Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVIP}
                    onChange={(e) => setFormData({ ...formData, isVIP: e.target.checked })}
                    className="w-4 h-4 accent-amber-500"
                  />
                  <span className="text-xs font-bold text-zinc-200">VIP Gold Styling</span>
                </label>
              </div>

              {/* Features Builder */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Included Features
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add a new feature (e.g. Free Protein Shakes Daily)"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {formData.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-zinc-900 border border-zinc-800/80 text-xs text-zinc-200">
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingPlan(null);
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
                  <span>{editingPlan ? 'SAVE CHANGES' : 'CREATE PLAN'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletePlanTarget}
        title="Delete Membership Plan"
        itemName={deletePlanTarget?.name}
        message="Are you sure you want to delete this membership plan? It will immediately be removed from the public website pricing matrix."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletePlanTarget(null)}
      />
    </div>
  );
};
