import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useSudokuStore } from '../store/sudokuStore';
import { SudokuGrid } from './SudokuGrid';
import Icon from 'react-native-vector-icons/Ionicons';

export function GameTip() {
  const solveOneEmptyCell = useSudokuStore(state => state.solveOneEmptyCell);
  const tip  = useSudokuStore(state => state.tip);
  const themeColor = useSudokuStore(state => state.themeColor);

  return (
    <View style={styles.container}>
    
      <View style={styles.solveButtonContainer}>
        <TouchableOpacity
        
          style={[styles.button, styles.solveButton, tip === 0 && styles.disabledButton, { backgroundColor: themeColor }]}
          onPress={() => {
            if (tip > 0) solveOneEmptyCell();
          }}
          disabled={tip === 0}
        >
          <Icon name= "lightbulb-outline" size={24}  />
        </TouchableOpacity>
        {tip > 0 && (
          <View style={styles.tipBadge}>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 25,
  },
  solveButtonContainer: {
    position: 'relative',
    marginLeft: 8,
  },
  solveButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#888',
  },
  buttonText: {
    color: '#4CAF50',
    fontSize: 24,
  },
  tipBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

