import { useState, useCallback, useEffect } from 'react';
import { 
  SudokuGrid, 
  CellValue, 
  Coordinates, 
  SudokuState, 
  Difficulty,
  GameStats
} from '../types/sudoku';
import { generateSudokuPuzzle } from '../utils/sudokuGenerator';
import { 
  isValidPlacement, 
  getRelatedCells, 
  isGridFilled, 
  checkSolution,
  getHint
} from '../utils/sudokuValidator';
import { saveBestTime } from '../utils/storageUtils';

export const useSudoku = () => {
  const [puzzle, setPuzzle] = useState<SudokuGrid>([]);
  const [solution, setSolution] = useState<SudokuGrid>([]);
  const [gameState, setGameState] = useState<SudokuState>([]);
  const [selectedCell, setSelectedCell] = useState<Coordinates | null>(null);
  const [showMistakes, setShowMistakes] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);
  const [gameTime, setGameTime] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Initialize or reset the game
  const initializeGame = useCallback((diff: Difficulty = difficulty) => {
    const { puzzle: newPuzzle, solution: newSolution } = generateSudokuPuzzle(diff);
    
    setPuzzle(newPuzzle);
    setSolution(newSolution);
    setIsGameComplete(false);
    setSelectedCell(null);
    setShowMistakes(true);
    setGameTime(0);
    setIsTimerRunning(true);
    
    // Initialize the game state based on the puzzle
    const initialState: SudokuState = newPuzzle.map((row, rowIndex) => 
      row.map((cell, colIndex) => ({
        value: cell,
        isGiven: cell !== null,
        isSelected: false,
        isRelated: false,
        isInvalid: false,
        notes: []
      }))
    );
    
    setGameState(initialState);
  }, [difficulty]);

  // Handle cell selection
  const selectCell = useCallback((coords: Coordinates | null) => {
    if (!isGameComplete) {
      setSelectedCell(coords);
      
      // Update related cells
      const newState = [...gameState];
      
      // Reset all cells' selected and related states
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          newState[i][j].isSelected = false;
          newState[i][j].isRelated = false;
        }
      }
      
      // If a cell is selected, update its state and related cells
      if (coords) {
        const [row, col] = coords;
        newState[row][col].isSelected = true;
        
        // Mark related cells
        const relatedCells = getRelatedCells(row, col);
        relatedCells.forEach(([r, c]) => {
          newState[r][c].isRelated = true;
        });
      }
      
      setGameState(newState);
    }
  }, [gameState, isGameComplete]);

  // Update a cell's value
  const updateCellValue = useCallback((value: CellValue) => {
    if (!selectedCell || isGameComplete) return;
    
    const [row, col] = selectedCell;
    if (gameState[row][col].isGiven) return;
    
    const newState = [...gameState];
    newState[row][col].value = value;
    
    // Check if the value is valid
    if (value !== null) {
      const isValid = isValidPlacement(
        gameState.map(row => row.map(cell => cell.value)),
        row,
        col,
        value
      );
      newState[row][col].isInvalid = showMistakes && !isValid;
    } else {
      newState[row][col].isInvalid = false;
    }
    
    setGameState(newState);
    
    // Check if the puzzle is complete
    const currentGrid = newState.map(row => row.map(cell => cell.value));
    if (isGridFilled(currentGrid)) {
      const isSolved = checkSolution(currentGrid, solution);
      if (isSolved) {
        completeGame();
      }
    }
  }, [selectedCell, gameState, showMistakes, isGameComplete, solution]);

  // Toggle show mistakes
  const toggleShowMistakes = useCallback(() => {
    setShowMistakes(prev => {
      const newShowMistakes = !prev;
      
      // Update invalid states based on the new setting
      const newState = [...gameState];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (newState[i][j].value !== null && !newState[i][j].isGiven) {
            const isValid = isValidPlacement(
              gameState.map(row => row.map(cell => cell.value)),
              i,
              j,
              newState[i][j].value as number
            );
            newState[i][j].isInvalid = newShowMistakes && !isValid;
          }
        }
      }
      
      setGameState(newState);
      return newShowMistakes;
    });
  }, [gameState]);

  // Check if the current solution is correct
  const checkCurrentSolution = useCallback(() => {
    const currentGrid = gameState.map(row => row.map(cell => cell.value));
    const isFilled = isGridFilled(currentGrid);
    const isSolved = isFilled && checkSolution(currentGrid, solution);
    
    if (isSolved) {
      completeGame();
      return true;
    }
    
    return false;
  }, [gameState, solution]);

  // Reset the puzzle to its initial state
  const resetPuzzle = useCallback(() => {
    const newState = [...gameState];
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!newState[i][j].isGiven) {
          newState[i][j].value = null;
          newState[i][j].isInvalid = false;
          newState[i][j].notes = [];
        }
      }
    }
    
    setGameState(newState);
    setIsGameComplete(false);
    setIsTimerRunning(true);
  }, [gameState]);

  // Get a hint
  const getHintCell = useCallback(() => {
    const currentGrid = gameState.map(row => row.map(cell => cell.value));
    const hintCoords = getHint(currentGrid, solution);
    
    if (hintCoords) {
      const [row, col] = hintCoords;
      const newState = [...gameState];
      newState[row][col].value = solution[row][col];
      newState[row][col].isInvalid = false;
      setGameState(newState);
      selectCell(hintCoords);
      
      // Check if the puzzle is now complete
      const updatedGrid = newState.map(row => row.map(cell => cell.value));
      if (isGridFilled(updatedGrid)) {
        const isSolved = checkSolution(updatedGrid, solution);
        if (isSolved) {
          completeGame();
        }
      }
    }
  }, [gameState, solution, selectCell]);

  // Change difficulty and start a new game
  const changeDifficulty = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    initializeGame(newDifficulty);
  }, [initializeGame]);

  // Complete the game
  const completeGame = useCallback(() => {
    setIsGameComplete(true);
    setIsTimerRunning(false);
    
    // Save best time
    const stats: GameStats = {
      difficulty,
      time: gameTime
    };
    saveBestTime(stats);
  }, [difficulty, gameTime]);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isTimerRunning && !isGameComplete) {
      interval = setInterval(() => {
        setGameTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isGameComplete]);

  // Initialize the game on first load
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    gameState,
    selectedCell,
    isGameComplete,
    gameTime,
    showMistakes,
    difficulty,
    selectCell,
    updateCellValue,
    toggleShowMistakes,
    checkCurrentSolution,
    resetPuzzle,
    initializeGame,
    changeDifficulty,
    getHintCell
  };
};