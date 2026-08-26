import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { soundManager } from '../common/SoundEffects';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title = "Delete Membership Plan",
  message = "Are you sure you want to delete this membership plan? This action will remove it from the public pricing matrix.",
  itemName,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    soundManager.playSuccess();
    onConfirm();
  };

  const handleCancel = () => {
    soundManager.playClick();
    onCancel();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-zinc-950 border border-red-500/30 rounded-2xl p-6 shadow-2xl text-zinc-100"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {title}
              </h3>
              {itemName && (
                <div className="mt-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-400 inline-block">
                  {itemName}
                </div>
              )}
              <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-zinc-900">
            <button
              id="confirm-delete-cancel-btn"
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-black uppercase tracking-wider cursor-pointer transition-colors"
            >
              CANCEL
            </button>
            <button
              id="confirm-delete-action-btn"
              onClick={handleConfirm}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors shadow-lg shadow-red-950"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>DELETE</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
