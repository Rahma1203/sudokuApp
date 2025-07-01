import AsyncStorage from '@react-native-async-storage/async-storage';
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
  totalScore: number;
  setTotalScore: (score: number) => void;
  timer: number;
  isComplete: boolean;
  isPaused: boolean;
  maxMistakes: number;
  tip:number;
  themeColor: string;
  isDarkMode: boolean;
  gameOver: boolean; // controlar cuando se acaban los intentos
  toggleDarkMode: () => void;
  resetCurrentGame: () => void;
  pausedTime: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setThemeColor: (color: string) => void;
  newGame: () => void;
  saveCurrentPoints: () => Promise<void>;
  setTip: (tip: number) => void;
  selectCell: (row: number, col: number) => void;
  setNumber: (number: number) => void;
  incrementTimer: () => void;
  checkCompletion: () => void;
  checkMistakes: () => void;
  solveOneEmptyCell: () => void;
  applyPenalty: () => Promise<void>; // Función para aplicar penalización
}


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
  gameOver: false,
  tip:3,
  themeColor: '#4CAF50',
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  totalScore: 0,
  setTotalScore: (score: number) => set({ totalScore: score }),

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
      gameOver: false,
      isPaused: false,
      tip:3,
    });
  },

  saveCurrentPoints: async () => {
    const { points, difficulty } = get();
    try {
      const currentTotalScore = await AsyncStorage.getItem(`totalScore_${difficulty}`);
      const currentTotal = currentTotalScore !== null ? parseInt(currentTotalScore) : 0;
      const newTotalScore = currentTotal + points;
      await AsyncStorage.setItem(`totalScore_${difficulty}`, String(newTotalScore));
      set({ totalScore: newTotalScore });
      console.log('Points saved successfully:', { points, difficulty, newTotalScore });
    } catch (error) {
      console.error('Error saving current points:', error);
    }
  },

  resetCurrentGame: () => {
    const { puzzle } = get();
    set({
      currentGrid: puzzle.map(row => [...row]),
      selectedCell: null,
      mistakes: 0,
      points: 0,
      isComplete: false,
      gameOver: false,
      timer: 0,
      tip: 3,
      isPaused: false,
    });
  },

  selectCell: (row, col) => {
    if (get().puzzle[row][col] === 0 && !get().gameOver) {
      set({ selectedCell: { row, col } });
    }
  },

  setNumber: (number) => {
    const { selectedCell, currentGrid, solution, difficulty, points, gameOver } = get();
    if (!selectedCell || gameOver) return;

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
        if(get().mistakes < get().maxMistakes){
          set(state => ({ mistakes: state.mistakes + 1 }));
        }
        get().checkMistakes();
      }
      set({ lastCorrectCell: null });
      
    }
    
    set({ currentGrid: newGrid});
    get().checkCompletion() ;
  },

  incrementTimer: () => {
    if (!get().isComplete && !get().gameOver && get().mistakes < get().maxMistakes) {
      set(state => ({ timer: state.timer + 1 }));
    }
  },

  pausedTime: () => {
    if (!get().isComplete && !get().gameOver) {
      set((state) => ({ isPaused: !state.isPaused }));
    }
  },

  // Función mejorada para manejar los errores máximos
  checkMistakes: async () => {
    const { mistakes, maxMistakes, gameOver } = get();
    if (mistakes >= maxMistakes && !gameOver) {
      set({ 
        isPaused: true,
        gameOver: true 
      });
      // Aplicar penalización automáticamente
      await get().applyPenalty();
    }
  },

  // Penelalización de puntos
  applyPenalty: async () => {
    const { difficulty } = get();
    try {
      const currentTotalScore = await AsyncStorage.getItem(`totalScore_${difficulty}`);
      const currentTotal = currentTotalScore !== null ? parseInt(currentTotalScore) : 0;
      
      const penalty = 100;
      const penalizedScore = Math.max(currentTotal - penalty, 0);
      
      await AsyncStorage.setItem(`totalScore_${difficulty}`, String(penalizedScore));
      
      // Actualizar el estado local
      set({ totalScore: penalizedScore });
      
      console.log(`Penalty applied: ${penalty} points. New total: ${penalizedScore}`);
    } catch (error) {
      console.error('Error applying penalty:', error);
    }
  },

  checkCompletion: () => {
    const { currentGrid, solution, gameOver } = get();
    if (gameOver) return; // No verificar completitud si el juego terminó por errores
    
    const complete = checkSolution(currentGrid, solution);
    if (complete) {
      set({ isComplete: true });
    }
  },

  
  solveOneEmptyCell: () => {
    const { currentGrid, solution, tip, gameOver } = get();
    if (tip <= 0 || gameOver) return;

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

  setTip: (tip) => {
    set({ tip }); 
  },
}));

const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
export async function getTotalPointsAcrossDifficulties():Promise<Number>  {
let totalPoints = 0;

for (const difficulty of difficulties) {
  try {
    const storagePoint = await AsyncStorage.getItem(`totalScore_${difficulty}`);
    const points = storagePoint !== null ? parseInt(storagePoint) : 0;
    totalPoints += points;
  } catch (error) {
    console.error(`Error reading points for difficulty "${difficulty}":`, error);
  }
}

 return Promise.resolve(totalPoints);
}
