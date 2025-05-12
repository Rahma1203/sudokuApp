import { create } from 'zustand';
import { Difficulty, SudokuGrid, generateSudoku, checkSolution, isCellValid} from '../utils/sudoku';

interface SudokuState {
  difficulty: Difficulty;
  puzzle: SudokuGrid;
  solution: SudokuGrid;
  currentGrid: SudokuGrid;
  selectedCell: { row: number; col: number } | null;
  mistakes: number;
  lastCorrectCell: { row: number; col: number } | null;
  points: number;
  
  timer: number;
  isComplete: boolean;
  isPaused: boolean;
  maxMistakes: number;
  tip:number;
  themeColor: string;
  resetCurrentGame: () => void;
  pausedTime: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setThemeColor: (color: string) => void;
  newGame: () => void;
  setTip: (tip: number) => void;
  selectCell: (row: number, col: number) => void;
  setNumber: (number: number) => void;
  incrementTimer: () => void;
  checkCompletion: () => void;
  checkMistakes: () => void;
  solveOneEmptyCell: () => void;
}

// Create initial empty grid
const createInitialGrid = (): SudokuGrid => Array(9).fill(null).map(() => Array(9).fill(0));

const initialGrid = createInitialGrid();
const { puzzle: initialPuzzle, solution: initialSolution } = generateSudoku('medium');

export const useSudokuStore = create<SudokuState>((set, get) => ({ 
  difficulty: 'medium',
  puzzle: initialPuzzle,
  solution: initialSolution,
  currentGrid: initialPuzzle.map(row => [...row]),
  selectedCell: null,
  mistakes: 0,
  lastCorrectCell: null,
  maxMistakes: 3,
  timer: 0,
  points: 0,
  isComplete: false,
  isPaused: false,
  tip:3,
  themeColor: '#4CAF50',

  setDifficulty: (difficulty) => {
    set({ difficulty });
    get().newGame();
  },

  setThemeColor: (color: string) => {
    set({ themeColor: color });
  },

  newGame: () => {
    const { puzzle, solution } = generateSudoku(get().difficulty);
    set({
      puzzle,
      solution,
      currentGrid: puzzle.map(row => [...row]),
      selectedCell: null,
      mistakes: 0,
      points: 0,
      timer: 0,
      
      isComplete: false,
      tip:3,
    });
  },
  
  

  resetCurrentGame: () => {
    const { puzzle } = get();
    set({
      currentGrid: puzzle.map(row => [...row]),
      selectedCell: null,
      mistakes: 0,
      points: 0,
      isComplete: false,
      timer: 0,
      tip: 3,
      isPaused: false,
    });
  },

  selectCell: (row, col) => {
    if (get().puzzle[row][col] === 0) {
      set({ selectedCell: { row, col } });
    }
  },

  setNumber: (number) => {
    const { selectedCell, currentGrid, solution, difficulty, points } = get();
    if (!selectedCell) return; // Si no hay celda seleccionada, no hacer nada

    const { row, col } = selectedCell; 
    
    const newGrid = currentGrid.map(row => [...row]);
    newGrid[row][col] = number;

    if (solution[row][col] === number) {
      // Correct number placed
      let pointsToAdd = 1;
      if (difficulty === 'easy') pointsToAdd = 10;
      else if (difficulty === 'medium') pointsToAdd = 20;
      else if (difficulty === 'hard') pointsToAdd = 30;

      set({ 
        lastCorrectCell: { row, col },
        points: points + pointsToAdd,
      });
    } else {
      if(!isCellValid(currentGrid, row, col, number)){
        if(get().mistakes < get().maxMistakes){set(state => ({ mistakes: state.mistakes + 1 }))}; 
        get().checkMistakes(); //
      }
      set({ lastCorrectCell: null });
    }
    
    set({ currentGrid: newGrid});
   
  },

  incrementTimer: () => {
    if (!get().isComplete &&get().mistakes < get().maxMistakes) {
      // Solo incrementar el tiempo si el juego no está completo y no se han alcanzado los errores máximos
      set(state => ({ timer: state.timer + 1 }));
    }
  },

// El jugador puede pausar el tiempo 
pausedTime: () => {
  if (!get().isComplete) {
    set((state) => ({ isPaused: !state.isPaused }));
  }
},

// El tiempo se pausa cuando comete 3 errores
  checkMistakes: () => {
    const { mistakes, maxMistakes } = get();
    if (mistakes >= maxMistakes) {
      set({ isPaused: true });
    }
  },

  checkCompletion: () => {
    const { currentGrid, solution } = get();
    const complete = checkSolution(currentGrid, solution);
    if (complete) {
      set({ isComplete: true });
    }
  },

  solveOneEmptyCell: () => {
    const { currentGrid, solution, tip } = get();
    if (tip <= 0) return; // No resolver si no quedan tips

    const newGrid = currentGrid.map(row => [...row]);
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (newGrid[row][col] === 0) {
          newGrid[row][col] = solution[row][col];
          set({ currentGrid: newGrid, tip: tip - 1 });
          get().checkCompletion();
          return;
        }
      }
    }
  },

  // El jugador puede recibir una pista
  setTip: (tip) => {
    set({ tip }); 
  },
}));