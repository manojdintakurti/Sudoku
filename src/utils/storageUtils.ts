import { BestTimes, Difficulty, GameStats } from '../types/sudoku';

const STORAGE_KEYS = {
  BEST_TIMES: 'sudoku-best-times',
};

export const saveBestTime = (stats: GameStats): void => {
  try {
    const storedTimes = localStorage.getItem(STORAGE_KEYS.BEST_TIMES);
    const bestTimes: BestTimes = storedTimes 
      ? JSON.parse(storedTimes) 
      : { 
          [Difficulty.EASY]: null, 
          [Difficulty.MEDIUM]: null, 
          [Difficulty.HARD]: null 
        };
    
    const currentBest = bestTimes[stats.difficulty];
    
    // Update if this is a better time or there's no existing time
    if (currentBest === null || stats.time < currentBest) {
      bestTimes[stats.difficulty] = stats.time;
      localStorage.setItem(STORAGE_KEYS.BEST_TIMES, JSON.stringify(bestTimes));
    }
  } catch (error) {
    console.error('Failed to save best time:', error);
  }
};

export const getBestTimes = (): BestTimes => {
  try {
    const storedTimes = localStorage.getItem(STORAGE_KEYS.BEST_TIMES);
    return storedTimes 
      ? JSON.parse(storedTimes) 
      : { 
          [Difficulty.EASY]: null, 
          [Difficulty.MEDIUM]: null, 
          [Difficulty.HARD]: null 
        };
  } catch (error) {
    console.error('Failed to get best times:', error);
    return { 
      [Difficulty.EASY]: null, 
      [Difficulty.MEDIUM]: null, 
      [Difficulty.HARD]: null 
    };
  }
};