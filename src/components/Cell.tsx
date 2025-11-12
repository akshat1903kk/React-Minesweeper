import React from "react";
import type { Cell as CellType } from "../types";

export interface CellProps {
  cell: CellType;
  onClick: () => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CellComponent: React.FC<CellProps> = ({
  cell,
  onClick,
  onContextMenu,
}) => {
  const { isRevealed, isMine, isFlagged, adjacentMines } = cell;

  const base =
    "w-full aspect-square flex justify-center items-center text-sm font-bold rounded transition-all duration-200 border border-[var(--beige)]/10";
  const unrevealed =
    "bg-[var(--charcoal)] hover:bg-[var(--beige)]/10 cursor-pointer";
  const revealed = "bg-[var(--stone)] text-[var(--beige)]";
  const mine = "bg-[var(--wine)] text-[var(--beige)]";
  const flag = "text-[var(--beige)]";

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
      onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (onContextMenu) onContextMenu(e);
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

export const Cell = React.memo(CellComponent);
