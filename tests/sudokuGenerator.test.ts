import { generateSudokuPuzzle } from '../src/utils/sudokuGenerator';
import { isGridFilled, checkSolution } from '../src/utils/sudokuValidator';
import { Difficulty } from '../src/types/sudoku';

describe('Sudoku Puzzle Generator', () => {
    it('should generate a puzzle and solution with valid structure', () => {
        const { puzzle, solution } = generateSudokuPuzzle(Difficulty.MEDIUM);

        expect(puzzle).toHaveLength(9);
        expect(solution).toHaveLength(9);
        puzzle.forEach(row => expect(row).toHaveLength(9));
        solution.forEach(row => expect(row).toHaveLength(9));
    });

    it('should generate a solved puzzle that matches itself', () => {
        const { solution } = generateSudokuPuzzle(Difficulty.HARD);
        expect(isGridFilled(solution)).toBe(true);
        expect(checkSolution(solution, solution)).toBe(true);
    });
});
