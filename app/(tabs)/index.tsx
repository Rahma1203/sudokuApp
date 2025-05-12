import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch, useColorScheme } from 'react-native';
import { SudokuGrid } from '../../components/SudokuGrid';
import { NumberPad } from '../../components/NumberPad';
import { GameStats} from '../../components/GameStats';
import { GameTip } from '../../components/GameTip';
import { useSudokuStore } from '../../store/sudokuStore';
// import { RefreshCw } from 'lucide-react-native';
import { GameAnimation } from '../../components/GameAnimation';
 

export default function GameScreen() {
  const {timer, newGame, difficulty, isPaused, pausedTime, mistakes, maxMistakes, resetCurrentGame, checkMistakes,  isComplete, themeColor } = useSudokuStore();
  const [showRetry, setShowRetry] = useState(false);
  const {colorScheme, toggleColorScheme} = useColorScheme()


  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (mistakes >= maxMistakes) {
      setShowRetry(true) ;
      
      
    }
  }, [mistakes, maxMistakes]);
  const handleRetry = () => {
    resetCurrentGame();
    setShowRetry(false);
  };
  // useEffect(() => {
  //    let interval: NodeJS.Timeout | undefined;
  //    if (!isPausedByMistakes && !isComplete) {
  //      interval = setInterval(() => {
  //        useSudokuStore.getState().incrementTimer();
  //      }, 1000);
  //    }
  //    return () => {
  //      if (interval) clearInterval(interval);
  //    };
  //  }, [isPausedByMistakes, isComplete]);
  //Pausar el tiempo cuando 


  return (
    <View style={styles.container}>
      {showRetry && (
        <View style={[styles.container, styles.overlay]}>
          <Text style={styles.resumeText}>Has alcanzado el máximo de errores.</Text>
          <TouchableOpacity onPress={handleRetry} style={[styles.retryButton, { backgroundColor: themeColor }]}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      )}
       
      <View style={styles.headerContent}>
        <View style={styles.header}>
        <Text style={[styles.title, { color: themeColor }]}>Sudoku</Text>
        <Text style={styles.subtitle}>{difficulty.toUpperCase()}</Text>
        </View>
        <GameTip />
      </View>
      <View className='flex-row items-center justify-center white:bg-white'>
        <Switch value={colorScheme === 'white'} onValueChange={toggleColorScheme} ></Switch>
      </View>
      <GameStats />
      <View style={styles.gridContainer}>
        <SudokuGrid />
        <GameAnimation />
      </View>
      <NumberPad />
      {/* <TouchableOpacity style={[styles.newGameButton, { backgroundColor: themeColor }]} onPress={newGame}>
        <RefreshCw size={24} color="#fff" />
        <Text style={styles.newGameText}>New Game</Text>
      </TouchableOpacity> */}
      {isPaused && !showRetry && (
        <View style={styles.overlay}>
          <TouchableOpacity onPress={pausedTime} style={[styles.resumeButton, { backgroundColor: themeColor }]}>
          <Text style={styles.pausedText}>Reanudar</Text>
          </TouchableOpacity>
        </View>
      )}

      
      
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 48,
  },
  resumeButton: {
    padding: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  resumeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    marginRight: 32,
    
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
   
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
    flexDirection: 'column',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  gridContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  newGameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  newGameText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  pausedText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  }
});