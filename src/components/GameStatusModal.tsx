// src/components/GameStatusModal.tsx
import React, { useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface GameStatusModalProps {
  status: "won" | "lost" | "playing";
  time: number;
  onReset: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, y: -24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: { opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.2 } },
};

const GameStatusModal: React.FC<GameStatusModalProps> = ({
  status,
  time,
  onReset,
}) => {
  const open = status === "won" || status === "lost";
  const title = status === "won" ? "You Won! 🎉" : "Game Over 💣";
  const message =
    status === "won"
      ? `You cleared the board in ${time}s.`
      : "You hit a mine. Try again!";

  // Close on Escape for basic a11y
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onReset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onReset]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onReset}
        >
          <motion.div
            className="w-[90%] max-w-md rounded-2xl bg-[var(--beige)] p-8 text-center text-[var(--charcoal)] shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 text-3xl font-bold">{title}</h2>
            <p className="mb-6 text-lg opacity-80">{message}</p>
            <button
              onClick={onReset}
              className="rounded-lg bg-[var(--charcoal)] px-6 py-3 text-[var(--beige)] transition-colors hover:bg-[var(--wine)]"
            >
              Reset Game
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameStatusModal;
