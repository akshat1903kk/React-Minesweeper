import React from "react";
import { Cell } from "./Cell";
import type { Cell as CellType } from "../types";

interface BoardProps {
  board: CellType[][];
  onCellClick: (row: number, col: number) => void;
  onRightClick: (row: number, col: number) => void;
}

export const Board: React.FC<BoardProps> = ({
  board,
  onCellClick,
  onRightClick,
}) => {
  if (!board || board.length === 0) return null;

  const columns = board[0].length;

  return (
    <div
      className="
        grid gap-[2px] p-3
        bg-[rgba(255,255,255,0.05)]
        rounded-2xl shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]
        border border-[rgba(255,255,255,0.1)]
        backdrop-blur-md transition-all duration-300
      "
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        width: "100%",
        height: "100%",
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
              onRightClick(rowIndex, colIndex);
            }}
          />
        )),
      )}
    </div>
  );
};

export default Board;
