export type SudokuGrid = number[][]; // El tipo SudokuGrid es un array de arrays de números
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

const GRID_SIZE = 9;

export function createEmptyGrid(): SudokuGrid {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
}

function isValid(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  // Check row
  for (let x = 0; x < GRID_SIZE; x++) {
    if (grid[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < GRID_SIZE; x++) {
    if (grid[x][col] === num) return false;
  }

  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
}

function findEmptyCell(grid: SudokuGrid): [number, number] | null {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === 0) return [row, col];
    }
  }
  return null;
}

function solveSudoku(grid: SudokuGrid): boolean {
  const emptyCell = findEmptyCell(grid);
  if (!emptyCell) return true;

  const [row, col] = emptyCell;
  const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (const num of nums) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num;
      if (solveSudoku(grid)) return true;
      grid[row][col] = 0;
    }
  }

  return false;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Se genera un numero aleatprio 
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateSudoku(difficulty: Difficulty): {
  puzzle: SudokuGrid;
  solution: SudokuGrid;
} {
  const solution = createEmptyGrid();
  solveSudoku(solution);

  const puzzle = solution.map(row => [...row]);
  const cellsToRemove = {
    easy: 1,
    medium: 40,
    hard:50,
    expert:70,
  }[difficulty];

  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }

  return { puzzle, solution };
}

export function checkSolution(grid: SudokuGrid, solution: SudokuGrid): boolean {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] !== solution[i][j]) return false;
    }
  }
  return true;
}

//resolver una celda
function solveSingleCell(grid: SudokuGrid, row: number, col: number): boolean {
  // Verifica si la celda ya está ocupada
  if (grid[row][col] !== 0) {
    return true; // La celda ya está resuelta
  }

  // Intenta colocar números del 1 al 9 en la celda
  for (let num = 1; num <= 9; num++) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num; // Coloca el número en la celda
      return true; // Se ha resuelto la celda
    }
  }


  return false; // No se encontró un número válido
}

export function isCellValid(grid: SudokuGrid, row: number, col: number, value: number): boolean {
  const originalValue = grid[row][col];
  grid[row][col] = 0; // Temporarily set the cell to 0
  const valid = isValid(grid, row, col, value);
  grid[row][col] = originalValue; // Restore the original value
  return valid;
}