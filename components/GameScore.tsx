// Estadisticas mejor tiempo en cada nivel y puntos totales
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSudokuStore } from '../store/sudokuStore';

// const GameScore = () => {
//   const { timer, mistakes, maxMistakes, difficulty } = useSudokuStore();

//   // Calculate score based on difficulty and mistakes
 

//   return (
//     <View style={styles.scoreContainer}>
//       <Text style={styles.scoreText}>Time: {timer}s</Text>
//       <Text style={styles.scoreText}>Mistakes: {mistakes}/{maxMistakes}</Text>
//       <Text style={styles.scoreText}>Score: {calculateScore()}</Text>
//     </View>
//   );
// }