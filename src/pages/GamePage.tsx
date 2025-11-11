import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useMinesweeper } from "../hooks/useMinesweeper";
import Board from "../components/Board";
import { useState, useEffect } from "react";

const difficultySettings = {
  easy: { rows: 8, cols: 8, mines: 10 },
  medium: { rows: 12, cols: 12, mines: 20 },
  hard: { rows: 16, cols: 16, mines: 40 },
};

export default function GamePage() {
  const [params] = useSearchParams();
  const difficulty = (params.get("difficulty") ||
    "easy") as keyof typeof difficultySettings;
  const { rows, cols, mines } = difficultySettings[difficulty];

  const { board, minesLeft, gameStatus, revealCell, toggleFlag, resetGame } =
    useMinesweeper(rows, cols, mines);

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameStatus === "playing") {
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameStatus]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[var(--charcoal)] text-[var(--beige)]">
      {/* Sidebar */}
      <Sidebar
        difficulty={difficulty}
        flagsLeft={minesLeft}
        time={time}
        onReset={resetGame}
      />

      {/* Game Board */}
      <main className="flex-1 flex justify-center items-center bg-[var(--stone)] p-4">
        <div className="rounded-xl p-6 bg-[var(--slate)] shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center capitalize">
            {difficulty} Mode
          </h2>
          <Board
            board={board}
            onCellClick={revealCell}
            onRightClick={toggleFlag}
          />
        </div>
      </main>
    </div>
  );
}
