// src/components/Cell.tsx
import React from "react";
import type { Cell as CellType } from "../types";

interface CellProps {
  cell: CellType;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

export const Cell: React.FC<CellProps> = ({ cell, onClick, onRightClick }) => {
  const { isRevealed, isMine, isFlagged, adjacentMines } = cell;

  const cellClass = `
    w-10 h-10 flex justify-center items-center text-sm font-bold rounded
    border border-slate-600
    ${isRevealed ? "bg-slate-700" : "bg-slate-800 hover:bg-slate-700 cursor-pointer"}
    ${isFlagged ? "text-yellow-400" : ""}
    ${isMine && isRevealed ? "bg-red-500 text-white" : ""}
  `;

  return (
    <div
      className={cellClass.trim()}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {isRevealed
        ? isMine
          ? "💣"
          : adjacentMines > 0
            ? adjacentMines
            : ""
        : isFlagged
          ? "🚩"
          : ""}
    </div>
  );
};
