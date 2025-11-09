// src/pages/Game.tsx
import React from "react";
import { useMinesweeper } from "../hooks/useMinesweeper";
import { Board } from "../components/Board";

export const Game: React.FC = () => {
  const { board, minesLeft, gameStatus, revealCell, toggleFlag } =
    useMinesweeper(10, 10, 10);

  console.log({ board, minesLeft, gameStatus, revealCell, toggleFlag });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-gray-100">
      <h1 className="text-4xl font-bold mb-4">Minesweeper</h1>
      <p className="text-lg mb-2">Mines left: {minesLeft}</p>
      <p
        className={`text-md mb-6 ${
          gameStatus === "lost"
            ? "text-red-400"
            : gameStatus === "won"
              ? "text-green-400"
              : "text-gray-300"
        }`}
      >
        Status: {gameStatus}
      </p>{" "}
      <Board board={board} onCellClick={revealCell} onRightClick={toggleFlag} />
    </div>
  );
};

export default Game;
