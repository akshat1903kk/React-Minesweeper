// src/types/index.ts

/** Overall game state */
export type GameStatus = "playing" | "won" | "lost";

/** A single cell in the Minesweeper grid */
export interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

/** The board is a 2D array of cells */
export type Board = Cell[][];
