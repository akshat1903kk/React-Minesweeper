// src/components/Board.tsx
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
  if (!board || board.length === 0) {
    return <div className="text-gray-400">No board data available</div>;
  }

  return (
    <div
      className="grid gap-1 p-4 glass"
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, 2.5rem)`,
        gridTemplateRows: `repeat(${board.length}, 2.5rem)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            onRightClick={(e) => {
              e.preventDefault();
              onRightClick(rowIndex, colIndex);
            }}
          />
        )),
      )}
    </div>
  );
};
