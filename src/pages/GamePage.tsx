import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Board from "../components/Board";
import { useMinesweeper } from "../hooks/useMinesweeper";
import type { Board as BoardType } from "../types";

const GamePage: React.FC = () => {
  // difficulty from landing; default to Easy
  const [difficulty, setDifficulty] = useState<string>("Easy");
  const [time, setTime] = useState<number>(0);

  // sizes/mines per difficulty
  const rows = difficulty === "Medium" ? 16 : difficulty === "Hard" ? 24 : 10;
  const cols = difficulty === "Medium" ? 16 : difficulty === "Hard" ? 24 : 10;
  const mines = difficulty === "Medium" ? 40 : difficulty === "Hard" ? 99 : 10;

  // game logic
  const { board, minesLeft, gameStatus, revealCell, toggleFlag, resetGame } =
    useMinesweeper(rows, cols, mines);

  // sidebar wants flagsLeft; for us it's the same as minesLeft
  const flagsLeft = minesLeft;

  // timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (gameStatus === "playing") {
      timer = setInterval(() => setTime((t) => t + 1), 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStatus]);

  // animations
  const sidebarVariants: Variants = {
    hidden: { x: -80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const boardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  // layout: 20% sidebar / 80% board
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Sidebar (20%) */}
      <motion.aside
        className="w-[20%] min-w-[250px] h-full bg-[rgba(255,255,255,0.04)] border-r border-[rgba(255,255,255,0.1)] p-6 backdrop-blur-lg shadow-[0_0_25px_rgba(0,0,0,0.2)]"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <Sidebar
          difficulty={difficulty}
          time={time}
          flagsLeft={flagsLeft}
          minesLeft={minesLeft}
          status={gameStatus}
          onReset={resetGame}
        />
      </motion.aside>

      {/* Game board (80%) */}
      <motion.main
        className="flex-1 flex flex-col items-center justify-center p-10"
        variants={boardVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-semibold text-[var(--beige)] tracking-wide mb-8 drop-shadow-md">
          {difficulty} Mode
        </h2>

        <div className="flex items-center justify-center w-[min(75vmin,700px)] h-[min(75vmin,700px)] rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]">
          <Board
            board={board as BoardType}
            onCellClick={revealCell}
            onRightClick={toggleFlag}
          />
        </div>
      </motion.main>
    </div>
  );
};

export default GamePage;
