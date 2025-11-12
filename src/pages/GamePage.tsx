import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Board from "../components/Board";
import GameStatusModal from "../components/GameStatusModal";
import { useMinesweeper } from "../hooks/useMinesweeper";
import type { Board as BoardType, GameStatus } from "../types";

const GamePage: React.FC = () => {
  // Could be routed later; for now default to Easy
  const [difficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [time, setTime] = useState<number>(0);

  // Compute dimensions/mines from difficulty
  const { rows, cols, mines } = useMemo(() => {
    if (difficulty === "Hard") return { rows: 24, cols: 24, mines: 99 };
    if (difficulty === "Medium") return { rows: 16, cols: 16, mines: 40 };
    return { rows: 10, cols: 10, mines: 10 };
  }, [difficulty]);

  const { board, minesLeft, gameStatus, revealCell, toggleFlag, resetGame } =
    useMinesweeper(rows, cols, mines);

  // Stopwatch: run only when playing
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (gameStatus === "playing") {
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStatus]);

  // Reset handler should also clear time
  const handleReset = useCallback(() => {
    setTime(0);
    resetGame();
  }, [resetGame]);

  // Simple entrance animations
  const sidebarVariants: Variants = {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  const boardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="flex min-h-screen w-full overflow-hidden">
        {/* Sidebar (fixed 20% column) */}
        <motion.aside
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="sticky top-0 h-screen w-[20vw] min-w-[260px] max-w-[340px]
                     bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border-r border-[rgba(255,255,255,0.1)]
                     shadow-[0_0_25px_rgba(0,0,0,0.25)] p-6 flex flex-col"
        >
          <Sidebar
            difficulty={difficulty}
            time={time}
            flagsLeft={minesLeft}
            minesLeft={minesLeft}
            status={gameStatus}
            onReset={handleReset}
          />
        </motion.aside>

        {/* Main game area (80%) */}
        <motion.main
          variants={boardVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col items-center justify-start p-8"
        >
          <h2 className="mb-8 text-5xl font-semibold text-[var(--beige)] drop-shadow-[0_8px_25px_rgba(0,0,0,0.25)]">
            {difficulty} Mode
          </h2>

          <div
            className="flex items-center justify-center w-[min(80vw,1200px)] aspect-square
                       rounded-2xl border border-[rgba(255,255,255,0.08)]
                       bg-[rgba(255,255,255,0.05)] backdrop-blur-xl p-4
                       shadow-[0_40px_140px_rgba(0,0,0,0.3)]"
          >
            {board && (
              <Board
                board={board as BoardType}
                onCellClick={revealCell}
                onRightClick={toggleFlag}
              />
            )}
          </div>
        </motion.main>
      </div>

      {/* Win/Lose modal */}
      <GameStatusModal
        status={gameStatus as GameStatus}
        time={time}
        onReset={handleReset}
      />
    </>
  );
};

export default GamePage;
