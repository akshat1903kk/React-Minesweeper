export type GameStatus = "playing" | "won" | "lost";

export interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}
