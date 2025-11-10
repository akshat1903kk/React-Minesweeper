import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  // Navigate to game based on difficulty
  const handleSelectDifficulty = (difficulty: string) => {
    navigate("/play", { state: { difficulty } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1C1C1C] to-[#2B2B2B] text-[#F5F5DC] font-sans relative overflow-hidden px-4">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#F5F5DC]/5 to-transparent blur-3xl -z-10"></div>

      {/* Title Section */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-5xl sm:text-6xl font-extrabold tracking-wide flex items-center gap-3 select-none"
      >
        💣 Minesweeper
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-3 text-[#D3D3C2]/70 text-lg sm:text-xl text-center"
      >
        Defuse the board. One click at a time.
      </motion.p>

      {/* Difficulty Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-6 mt-12"
      >
        {["Easy", "Medium", "Hard"].map((difficulty, index) => (
          <motion.button
            key={difficulty}
            onClick={() => handleSelectDifficulty(difficulty.toLowerCase())}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.1 * index }}
            className="px-8 py-4 rounded-xl bg-[#2E2E2E] hover:bg-[#3C3C3C] shadow-lg shadow-black/40 text-lg font-semibold border border-[#F5F5DC]/10 transition-all duration-300"
          >
            {difficulty}
          </motion.button>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="text-xs text-[#D3D3C2]/60 mt-16 select-none"
      >
        Built with ❤️ using React + TypeScript | © 2025 Akshat
      </motion.footer>
    </div>
  );
}
