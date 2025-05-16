import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useSudokuStore } from '../store/sudokuStore';

export function NumberPad() {
  const setNumber = useSudokuStore(state => state.setNumber);
  const themeColor = useSudokuStore(state => state.themeColor);
  const isDarkMode = useSudokuStore(state => state.isDarkMode);
   const containeer = isDarkMode ? "#1a1a1a" : "#ddd";
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
        <TouchableOpacity
          key={number}
          style={[styles.button, { backgroundColor: containeer }]}
          onPress={() => setNumber(number)}>
          <Text style={[styles.buttonText, { color: themeColor }]}>{number}</Text>
        </TouchableOpacity>
      ))}
      
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
  
  buttonText: {
    color: '#4CAF50',
    fontSize: 24,
  }
});

