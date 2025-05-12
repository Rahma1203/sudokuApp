import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useSudokuStore } from '../store/sudokuStore';



export function SudokuGrid() {
  const { currentGrid, puzzle, selectedCell, selectCell } = useSudokuStore();

  const renderCell = (row: number, col: number) => {
    const value = currentGrid[row][col]; // Valor actual de la celda
    const isOriginal = puzzle[row][col] !== 0;
    const isSelected = selectedCell?.row === row && selectedCell?.col === col;
    const isSelectedRow = selectedCell?.row === row; //Fila de la celda seleccionada 
    const isSelectedCol = selectedCell?.col === col; // Comprobar si la celda seleccionada está en la misma columna

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.cell,
          isSelected && styles.selectedCell, // Estilo para la celda seleccionada
          isSelectedRow && !isSelected && styles.rowCell, // Estilo para la fila de la celda selcccionada
          isSelectedCol && !isSelected && styles.colCell, // Estilo para la columna de la celda seleccionada
          isOriginal && (isSelected || isSelectedRow || isSelectedCol) && styles.origin,
          (row + 1) % 3 === 0 && styles.bottomBorder,
          (col + 1) % 3 === 0 && styles.rightBorder,
        ]}
        onPress={() => selectCell(row, col)}
        disabled={isOriginal}>
        <Text style={[styles.cellText, isOriginal && styles.originalText]}> 
          {value !== 0 ? value.toString() : ''}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.grid}>
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
    backgroundColor: '#2a2a2a',
    padding: 1,
    borderRadius: 8,
  },
  origin: {
    backgroundColor: '#333',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    margin: 1,
  },
  selectedCell: {
    backgroundColor: '#444',
  },
  rowCell: {
    backgroundColor: '#333', // Color para las celdas de la fila seleccionada
  },
  colCell: {
    backgroundColor: '#333', // Color para las celdas de la columna seleccionada
  },
  originalCell: {
    backgroundColor: '#252525',
  },
  bottomBorder: {
    marginBottom: 3,
  },
  rightBorder: {
    marginRight: 3,
  },
  cellText: {
    color: '#4CAF50',
    fontSize: 18,
  },
  originalText: {
    color: '#888',
    fontWeight: 'bold',
  },
});