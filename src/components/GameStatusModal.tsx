// src/components/GameStatusModal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

interface GameStatusModalProps {
  status: "won" | "lost" | "playing";
  time: number;
  onReset: () => void;
}

// ✅ Define Framer Motion variants with proper typing
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, y: -30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.25 } },
};

const GameStatusModal: React.FC<GameStatusModalProps> = ({
  status,
  time,
  onReset,
}) => {
  const isVisible = status === "won" || status === "lost";
  const title = status === "won" ? "You Won! 🎉" : "Game Over 💣";
  const message =
    status === "won"
      ? `You cleared the board in ${time} seconds!`
      : "You hit a mine. Try again!";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-[var(--beige)] text-[var(--charcoal)] rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-3xl font-bold mb-3">{title}</h2>
            <p className="text-lg mb-6">{message}</p>
            <button
              onClick={onReset}
              className="bg-[var(--charcoal)] text-[var(--beige)] px-6 py-3 rounded-lg hover:bg-[var(--wine)] transition-all"
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
