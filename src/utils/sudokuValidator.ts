import { SudokuGrid, Coordinates } from '../types/sudoku';

// Check if a value is valid at the given position
export const isValidPlacement = (
  grid: SudokuGrid,
  row: number,
  col: number,
  value: number
): boolean => {
  // Skip if the cell already has this value
  if (grid[row][col] === value) return true;
  
  // Check row
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === value) return false;
  }
  
  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === value) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i][boxCol + j] === value) return false;
    }
  }
  
  return true;
};

// Get all related cells (same row, column, or box) for a given cell
export const getRelatedCells = (row: number, col: number): Coordinates[] => {
  const relatedCells: Coordinates[] = [];
  
  // Add cells in the same row
  for (let i = 0; i < 9; i++) {
    if (i !== col) {
      relatedCells.push([row, i]);
    }
  }
  
  // Add cells in the same column
  for (let i = 0; i < 9; i++) {
    if (i !== row) {
      relatedCells.push([i, col]);
    }
  }
  
  // Add cells in the same 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = boxRow + i;
      const c = boxCol + j;
      if (r !== row || c !== col) {
        relatedCells.push([r, c]);
      }
    }
  }
  
  return relatedCells;
};

// Check if the grid is completely filled
export const isGridFilled = (grid: SudokuGrid): boolean => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === null) return false;
    }
  }
  return true;
};

// Check if the current grid matches the solution
export const checkSolution = (grid: SudokuGrid, solution: SudokuGrid): boolean => {
  // First check if all numbers are valid in their positions
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      if (value === null || !isValidPlacement(grid, row, col, value)) {
        return false;
      }
    }
  }
  
  // Then check if it matches the solution
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] !== solution[i][j]) return false;
    }
  }
  return true;
};

// Get a hint (find the next empty cell and fill it with the correct value)
export const getHint = (
  grid: SudokuGrid,
  solution: SudokuGrid
): Coordinates | null => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === null) {
        return [i, j];
      }
    }
  }
  return null;
};