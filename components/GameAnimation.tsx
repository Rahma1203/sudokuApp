import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useSudokuStore } from '../store/sudokuStore';

export function GameAnimation() {
  const lastCorrectCell = useSudokuStore(state => state.lastCorrectCell);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showAnimation, setShowAnimation] = useState(false);
  const {difficulty} = useSudokuStore();
  const {themeColor, isDarkMode} = useSudokuStore();

  useEffect(() => {
    if (lastCorrectCell) {
        if (difficulty === 'easy') {
            fadeAnim.setValue(10); 
          } else if  (difficulty === "medium"){
              fadeAnim.setValue(20);
          } else if (difficulty === "hard"){
                fadeAnim.setValue(30);
          }
      setShowAnimation(true);
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowAnimation(false);
      });
    }
  }, [lastCorrectCell, difficulty]);

  if (!showAnimation || !lastCorrectCell) {
    return null;
  }

  

  // Calculate position for animation based on cell row and col
  // Assuming each cell is 36x36 with 1 margin, adjust as needed
  const top = lastCorrectCell.row * 38; // 36 + 2 margin approx
  const left = lastCorrectCell.col * 38;
  const pointsText = difficulty === 'easy' ? '+10' : difficulty === 'medium' ? '+20' : '+30';

  return (
    <Animated.View style={[styles.animationContainer, { top, left, opacity: fadeAnim }]}>
      <View style={[styles.bubble, { backgroundColor: themeColor }]}>
        <Text style={styles.text}>{pointsText}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    position: 'absolute',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  bubble: {
    backgroundColor: '#4CAF50',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
