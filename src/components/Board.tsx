import React from "react"; // Import React to type the event
import type { Cell as CellType } from "../types";
import { Cell } from "./Cell"; // This should now work

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
  const columns = board[0]?.length || 0;

  return (
    <div
      className="
        grid p-2 gap-0.5
        bg-[var(--charcoal)]/60
        border border-[var(--beige)]/20
        rounded-xl shadow-inner backdrop-blur-md
      "
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {board.flat().map((cell, index) => {
        const rowIndex = Math.floor(index / columns);
        const colIndex = index % columns;

        return (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            // The Cell component's prop 'onRightClick' expects a function
            // that takes an event 'e'. The Cell component will handle e.preventDefault()
            onRightClick={(e: React.MouseEvent<HTMLDivElement>) => {
              // Now we call the function from our hook
              onRightClick(rowIndex, colIndex);
            }}
          />
        );
      })}
    </div>
  );
};

export default Board;
