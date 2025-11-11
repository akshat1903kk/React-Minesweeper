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
    "w-10 h-10 flex justify-center items-center text-sm font-bold rounded transition-all duration-200 border border-[var(--beige)]/10";
  const unrevealed =
    "bg-[var(--charcoal)] hover:bg-[var(--beige)]/10 cursor-pointer";
  const revealed = "bg-[var(--stone)] text-[var(--beige)]";
  const mine = "bg-[var(--wine)] text-[var(--beige)]";
  const flag = "text-[var(--accent)]";

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
