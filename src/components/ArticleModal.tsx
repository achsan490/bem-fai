"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  articleTitle?: string;
  isDeleting?: boolean;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  articleTitle,
  isDeleting = false,
}: ConfirmDeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md glass border border-red-500/20 bg-[#0c101b] p-6 rounded-2xl shadow-2xl z-10 overflow-hidden"
          >
            {/* Header Red Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              {/* Alert Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 text-red-400 mb-4 animate-pulse">
                <AlertTriangle size={24} />
              </div>

              <h4 className="font-display font-bold text-lg text-white">{title}</h4>
              
              {articleTitle && (
                <p className="text-xs font-mono text-primary bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-lg mt-3 select-all">
                  &ldquo;{articleTitle}&rdquo;
                </p>
              )}

              <p className="text-xs text-gray-400 font-sans leading-relaxed mt-4">
                Artikel ini akan dihapus secara permanen dari basis data Supabase. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-300 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Batal
              </button>
              
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isDeleting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                <span>{isDeleting ? "Menghapus..." : "Hapus Permanen"}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
