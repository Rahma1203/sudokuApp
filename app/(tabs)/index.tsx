import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch } from 'react-native';
import { SudokuGrid } from '../../components/SudokuGrid';
import { NumberPad } from '../../components/NumberPad';
import { GameStats} from '../../components/GameStats';
import { GameTip } from '../../components/GameTip';
import { useSudokuStore } from '../../store/sudokuStore';
// import { RefreshCw } from 'lucide-react-native';
import { GameAnimation } from '../../components/GameAnimation';
 

export default function GameScreen() {
  const {timer, newGame, difficulty, isPaused, pausedTime, mistakes, maxMistakes, resetCurrentGame, checkMistakes,  isComplete, themeColor, isDarkMode } = useSudokuStore();
  const [showRetry, setShowRetry] = useState(false);

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

  const backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtitleColor = isDarkMode ? '#888' : '#444';
  

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {showRetry && (
        <View style={[styles.container, styles.overlay]}>
          <Text style={[styles.gameOverText, { color: themeColor }]}>GAME OVER</Text>
          <Text style={[styles.resumeText, { color: textColor }]}>You have reached the maximum number of errors.</Text>
          <TouchableOpacity onPress={handleRetry} style={[styles.retryButton, { backgroundColor: themeColor }]}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
       
      <View style={styles.headerContent}>
        <View style={styles.header}>
        <Text style={[styles.title, { color: themeColor }]}>Sudoku</Text>
        <Text style={[styles.subtitle, { color: subtitleColor }]}>{difficulty.toUpperCase()}</Text>
        </View>
        <GameTip />
      </View>
      <GameStats />
      <View style={styles.gridContainer}>
        <SudokuGrid />
        <GameAnimation />
      </View>
      <NumberPad />
      {isPaused && !showRetry && (
        <View style={styles.overlay}>
          <TouchableOpacity onPress={pausedTime} style={[styles.resumeButton, { backgroundColor: themeColor }]}>
          <Text style={[styles.pausedText, { color: textColor }]}>Resume</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
  },
  resumeButton: {
    padding: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  gameOverText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resumeText: {
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
  },
  gridContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  pausedText: {
    fontSize: 32,
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
});
