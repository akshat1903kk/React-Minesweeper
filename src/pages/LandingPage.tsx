import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSelect = (difficulty: string) => {
    navigate(`/play`, { state: { difficulty } });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-[var(--beige)] fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card p-12 text-center w-[90%] max-w-lg"
      >
        <h1 className="text-5xl font-heading mb-4 text-[var(--beige)] drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]">
          Minesweeper
        </h1>
        <p className="text-[var(--beige)]/90 mb-8 text-lg">
          Choose your difficulty and start clearing the field.
        </p>

        <div className="flex justify-center gap-6">
          {["Easy", "Medium", "Hard"].map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="btn shadow-md"
              onClick={() => handleSelect(level.toLowerCase())}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </main>
  );
};

export default LandingPage;
