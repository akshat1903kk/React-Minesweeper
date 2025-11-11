import React from "react";
import type { Cell as CellType } from "../types";
import { Cell } from "./Cell";

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
  return (
    <div
      className="
        grid gap-1 p-4
        bg-[var(--charcoal)]/60
        border border-[var(--beige)]/20
        rounded-xl shadow-inner backdrop-blur-md
      "
    >
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              onRightClick={(e) => {
                e.preventDefault();
                onRightClick(rowIndex, colIndex);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
