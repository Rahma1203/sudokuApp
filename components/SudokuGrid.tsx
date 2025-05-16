import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useSudokuStore } from '../store/sudokuStore';
import { Background } from '@react-navigation/elements';

export function SudokuGrid() {
  const { currentGrid, puzzle, selectedCell, selectCell, isDarkMode } = useSudokuStore();
  
  // Colores dinámicos basados en el modo
  const containerColor = isDarkMode ? "#1a1a1a" : "#f5f5f5";
  const highlightColor = isDarkMode ? "#333" : "#e0e0e0";
  const selectedColor = isDarkMode ? "#444" : "#d0d0d0";
  const gridBackgroundColor = isDarkMode ? "#2a2a2a" : "#cccccc";
  const numberColor = isDarkMode ? "#4CAF50" : "#4CAF50";
  const originalNumberColor = isDarkMode ? "#888" : "#555";

  const renderCell = (row: number, col: number) => {
    const value = currentGrid[row][col];
    const isOriginal = puzzle[row][col] !== 0;
    const isSelected = selectedCell?.row === row && selectedCell?.col === col;
    const isSelectedRow = selectedCell?.row === row;
    const isSelectedCol = selectedCell?.col === col;
    
    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.cell,
          { backgroundColor: containerColor },
          isSelected && { backgroundColor: selectedColor },
          (isSelectedRow || isSelectedCol) && !isSelected && { backgroundColor: highlightColor },
          isOriginal && (isSelected || isSelectedRow || isSelectedCol) && { backgroundColor: isDarkMode ? '#333' : '#d6d6d6' },
          (row + 1) % 3 === 0 && styles.bottomBorder,
          (col + 1) % 3 === 0 && styles.rightBorder,
        ]}
        onPress={() => selectCell(row, col)}
        disabled={isOriginal}>
        <Text 
          style={[
            styles.cellText, 
            { color: numberColor },
            isOriginal && { color: originalNumberColor, fontWeight: 'bold' }
          ]}
        > 
          {value !== 0 ? value.toString() : ''}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.grid, { backgroundColor: gridBackgroundColor }]}>
      {Array(9).fill(null).map((_, row) => (
        <View key={row} style={styles.row}>
          {Array(9).fill(null).map((_, col) => renderCell(row, col))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    padding: 1,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  bottomBorder: {
    marginBottom: 3,
  },
  rightBorder: {
    marginRight: 3,
  },
  cellText: {
    fontSize: 18,
  }
});