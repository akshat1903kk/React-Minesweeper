// src/pages/GamePage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Board from "../components/Board";
import { useMinesweeper } from "../hooks/useMinesweeper";

type Difficulty = "easy" | "medium" | "hard";

const SETTINGS: Record<
  Difficulty,
  { rows: number; cols: number; mines: number }
> = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 },
};

function normalizeDifficulty(v?: string | null): Difficulty {
  switch ((v || "").toLowerCase()) {
    case "easy":
    case "medium":
    case "hard":
      return v!.toLowerCase() as Difficulty;
    default:
      return "medium";
  }
}

export default function GamePage() {
  const location = useLocation();

  // Read difficulty from navigation state or ?difficulty= query param; default to "medium"
  const difficulty: Difficulty = useMemo(() => {
    // from <Link state={{ difficulty }}>
    const fromState = (location.state as { difficulty?: string } | null)
      ?.difficulty;
    // or from ?difficulty=medium
    const fromQuery = new URLSearchParams(location.search).get("difficulty");
    return normalizeDifficulty(fromState ?? fromQuery);
  }, [location.state, location.search]);

  const { rows, cols, mines } = SETTINGS[difficulty];

  // Hook: drives board using selected difficulty
  const { board, minesLeft, gameStatus, revealCell, toggleFlag, resetGame } =
    useMinesweeper(rows, cols, mines);

  // Simple stopwatch that runs only while playing
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (gameStatus !== "playing") return;
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [gameStatus]);

  // Reset the board without hard reload
  const handleReset = () => {
    resetGame();
    setTime(0);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[var(--beige)] text-[var(--charcoal)] font-sans md:flex-row">
      {/* Sidebar */}
      <aside className="w-full bg-[var(--charcoal)] p-6 text-[var(--beige)] shadow-lg md:w-80">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Minesweeper
          </h1>
          <p className="opacity-70">Classic logic, minimal look.</p>
        </header>

        <section className="mx-auto flex w-full max-w-[260px] flex-col gap-4">
          <div className="flex justify-between">
            <span>🎯 Difficulty</span>
            <span className="capitalize">{difficulty}</span>
          </div>
          <div className="flex justify-between">
            <span>⏱ Time</span>
            <span>{time}s</span>
          </div>
          <div className="flex justify-between">
            <span>💣 Mines left</span>
            <span>{minesLeft}</span>
          </div>
          <div className="flex justify-between">
            <span>📊 Status</span>
            <span className="capitalize font-medium">{gameStatus}</span>
          </div>

          <button
            onClick={handleReset}
            className="mt-4 rounded-lg bg-[var(--beige)] px-5 py-2 font-semibold text-[var(--charcoal)] transition hover:bg-opacity-90"
          >
            Reset board
          </button>
        </section>
      </aside>

      {/* Board area */}
      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="overflow-hidden rounded-lg border-2 border-[var(--charcoal)] shadow-2xl">
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
