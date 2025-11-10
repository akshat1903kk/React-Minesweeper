import React from "react";
import type { Cell as CellType } from "../types";

interface CellProps {
  cell: CellType;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Cell: React.FC<CellProps> = ({ cell, onClick, onRightClick }) => {
  const { isRevealed, isMine, isFlagged, adjacentMines } = cell;

  const base =
    "w-10 h-10 flex justify-center items-center text-sm font-bold border rounded";
  const unrevealed =
    "bg-slate-800 hover:bg-slate-700 cursor-pointer border-slate-700";
  const revealed = "bg-slate-600 border-slate-500";
  const mine = "bg-red-600 text-white";
  const flag = "text-yellow-400";

  const cellClass = [
    base,
    isRevealed ? revealed : unrevealed,
    isMine && isRevealed ? mine : "",
    isFlagged && !isRevealed ? flag : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cellClass}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick(e);
      }}
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
