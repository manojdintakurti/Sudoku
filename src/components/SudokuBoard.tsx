import React from 'react';
import SudokuCell from './SudokuCell';
import { SudokuState, Coordinates } from '../types/sudoku';
import '../CSS/Sudoku.css';

interface SudokuBoardProps {
  gameState: SudokuState;
  onCellSelect: (coords: Coordinates) => void;
  onNumberInput: (value: number | null) => void;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({ gameState, onCellSelect, onNumberInput }) => {
  return (
      <div className="sudoku-board">
        {gameState.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isRightEdge = (colIndex + 1) % 3 === 0 && colIndex < 8;
              const isBottomEdge = (rowIndex + 1) % 3 === 0 && rowIndex < 8;

              const cellClass = [
                'sudoku-cell-wrapper',
                isRightEdge && 'sudoku-cell-border-right',
                isBottomEdge && 'sudoku-cell-border-bottom'
              ]
                  .filter(Boolean)
                  .join(' ');

              return (
                  <div key={`${rowIndex}-${colIndex}`} className={cellClass}>
                    <SudokuCell
                        state={cell}
                        coordinates={[rowIndex, colIndex]}
                        onSelect={onCellSelect}
                        onNumberInput={onNumberInput}
                    />
                  </div>
              );
            })
        )}
      </div>
  );
};

export default SudokuBoard;
