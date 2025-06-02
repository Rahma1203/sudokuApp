import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSudokuStore } from '../store/sudokuStore';

interface GameTipProps {
  onRequestMoreTips?: () => void;
}

export function GameTip({ onRequestMoreTips }: GameTipProps) {
  const solveOneEmptyCell = useSudokuStore(state => state.solveOneEmptyCell);
  const tip = useSudokuStore(state => state.tip);
  const setTip = useSudokuStore(state => state.setTip);
  const themeColor = useSudokuStore(state => state.themeColor);

  const handlePress = () => {
    if (tip > 0) {
      // Si hay pistas disponibles, resolvemos una celda
      solveOneEmptyCell();
    } else {
      // Si no hay pistas disponibles, solicitamos el anuncio
      if (onRequestMoreTips) {
        onRequestMoreTips();
      } else if (__DEV__) {
        // Solo en desarrollo: dar pistas sin anuncio
        setTip(3);
        Alert.alert('¡Pistas adicionales!', 'Has recibido 3 pistas adicionales (modo desarrollo)');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.solveButtonContainer}>
        <TouchableOpacity
          style={[
            styles.button, 
            styles.solveButton, 
            { backgroundColor: tip > 0 ? themeColor : '#888' }
          ]}
          onPress={handlePress}
        >
          <FontAwesome5 name="lightbulb" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.tipBadge}>
          <Text style={styles.tipText}>{tip}</Text>
        </View>
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