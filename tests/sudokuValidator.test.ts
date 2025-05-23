import {
    isValidPlacement,
    getRelatedCells,
    isGridFilled,
    checkSolution
} from '../src/utils/sudokuValidator';
import { SudokuGrid } from '../src/types/sudoku';

const sampleGrid: SudokuGrid = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

describe('Sudoku Validator Utils', () => {
    it('should validate correct placements', () => {
        expect(isValidPlacement(sampleGrid, 0, 2, 4)).toBe(true);
        expect(isValidPlacement(sampleGrid, 0, 2, 5)).toBe(false);
    });

    it('should detect if grid is filled or not', () => {
        expect(isGridFilled(sampleGrid)).toBe(false);
        const filledGrid = sampleGrid.map(row => row.map(cell => cell || 1));
        expect(isGridFilled(filledGrid)).toBe(true);
    });

    it('should get correct number of related cells', () => {
        const related = getRelatedCells(4, 4); // center cell
        const uniqueCoords = new Set(related.map(([r, c]) => `${r},${c}`));
        expect(related.length).toBe(24);
        expect(uniqueCoords.size).toBe(20);
    });


    it('should return false for incorrect solution match', () => {
        const wrongSolution = sampleGrid.map(row => row.map(cell => cell || 1));
        expect(checkSolution(sampleGrid, wrongSolution)).toBe(false);
    });
});
