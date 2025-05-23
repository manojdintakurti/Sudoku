export type CellValue = number | null;
export type SudokuGrid = CellValue[][];
export type Coordinates = [number, number];

export interface CellState {
  value: CellValue;
  isGiven: boolean;
  isSelected: boolean;
  isRelated: boolean;
  isInvalid: boolean;
  notes: number[];
}

export type SudokuState = CellState[][];

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export interface GameStats {
  difficulty: Difficulty;
  time: number;
}

export interface BestTimes {
  [Difficulty.EASY]: number | null;
  [Difficulty.MEDIUM]: number | null;
  [Difficulty.HARD]: number | null;
}