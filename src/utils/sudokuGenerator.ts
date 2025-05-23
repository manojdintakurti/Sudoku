import { SudokuGrid, Difficulty } from '../types/sudoku';

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Generate a valid solved Sudoku grid
const generateSolvedGrid = (): SudokuGrid => {
  // Start with an empty grid
  const grid: SudokuGrid = Array(9).fill(null).map(() => Array(9).fill(null));
  
  // Helper function to check if a number can be placed at a position
  const isValid = (row: number, col: number, num: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
      if (grid[x][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[boxRow + i][boxCol + j] === num) return false;
      }
    }
    
    return true;
  };
  
  // Backtracking algorithm to fill the grid
  const fillGrid = (row: number = 0, col: number = 0): boolean => {
    if (row === 9) return true;
    
    const nextRow = col === 8 ? row + 1 : row;
    const nextCol = col === 8 ? 0 : col + 1;
    
    const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    
    for (const num of nums) {
      if (isValid(row, col, num)) {
        grid[row][col] = num;
        if (fillGrid(nextRow, nextCol)) return true;
        grid[row][col] = null;
      }
    }
    
    return false;
  };
  
  fillGrid();
  return grid;
};

// Create a puzzle by removing numbers from a solved grid
const createPuzzle = (solvedGrid: SudokuGrid, difficulty: Difficulty): SudokuGrid => {
  const puzzle = solvedGrid.map(row => [...row]);
  const cellsToRemove = {
    [Difficulty.EASY]: 35,
    [Difficulty.MEDIUM]: 45,
    [Difficulty.HARD]: 55
  }[difficulty];
  
  // Create a list of all positions
  const positions: [number, number][] = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push([i, j]);
    }
  }
  
  // Shuffle the positions
  const shuffledPositions = shuffleArray(positions);
  
  // Remove numbers based on difficulty
  for (let i = 0; i < cellsToRemove && i < shuffledPositions.length; i++) {
    const [row, col] = shuffledPositions[i];
    puzzle[row][col] = null;
  }
  
  return puzzle;
};

// Main function to generate a new puzzle
export const generateSudokuPuzzle = (difficulty: Difficulty = Difficulty.MEDIUM): {
  puzzle: SudokuGrid;
  solution: SudokuGrid;
} => {
  const solution = generateSolvedGrid();
  const puzzle = createPuzzle(solution, difficulty);
  
  return {
    puzzle,
    solution
  };
};