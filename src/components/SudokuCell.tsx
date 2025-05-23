import React, { useEffect } from 'react';
import { CellState, Coordinates } from '../types/sudoku';
import '../CSS/Sudoku.css';

interface SudokuCellProps {
  state: CellState;
  coordinates: Coordinates;
  onSelect: (coords: Coordinates) => void;
  onNumberInput?: (value: number | null) => void;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
                                                 state,
                                                 coordinates,
                                                 onSelect,
                                                 onNumberInput
                                               }) => {
  const [row, col] = coordinates;
  const boxRow = Math.floor(row / 3);
  const boxCol = Math.floor(col / 3);
  const isEvenBox = (boxRow + boxCol) % 2 === 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!state.isSelected || state.isGiven) return;

      if (e.key >= '1' && e.key <= '9') {
        onNumberInput?.(parseInt(e.key, 10));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        onNumberInput?.(null);
      }
    };

    if (state.isSelected) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [state.isSelected, state.isGiven, onNumberInput]);

  const handleClick = () => {
    onSelect(coordinates);
  };

  const classNames = [
    'sudoku-cell',
    isEvenBox ? 'bg-gray' : 'bg-white',
    state.isSelected && 'bg-selected',
    state.isRelated && !state.isSelected && 'bg-related',
    state.isInvalid && 'invalid',
    state.isGiven ? 'bold' : 'normal'
  ]
      .filter(Boolean)
      .join(' ');

  return (
      <div
          className={classNames}
          onClick={handleClick}
          tabIndex={0}
          role="button"
          aria-label={`Cell ${row + 1},${col + 1}: ${state.value || 'empty'}`}
      >
        {state.value}
      </div>
  );
};

export default SudokuCell;
