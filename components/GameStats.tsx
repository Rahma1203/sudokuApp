import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSudokuStore } from '../store/sudokuStore';
import Icon from 'react-native-vector-icons/Ionicons';


export function GameStats() {
  const { timer, mistakes, maxMistakes, isComplete, isPaused, pausedTime,themeColor,isDarkMode} = useSudokuStore();


  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (!isPaused && !isComplete && mistakes < maxMistakes) {
      interval = setInterval(() => {
        useSudokuStore.getState().incrementTimer();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, isComplete, mistakes, maxMistakes]);

 

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const containeer = isDarkMode ? "#1a1a1a" : "#ddd";

  

  return (
    <View style={[styles.container,  { backgroundColor: containeer }]}>
      <View style={styles.stat}>
        <Text style={styles.label}>Mistakes</Text>
        <View style={styles.mistakesContainer}>
          <Text style={[styles.value, mistakes > 0 && styles.errorText, { color: themeColor }]}>{mistakes}</Text>
          <Text style={[styles.value, maxMistakes > 0 && styles.errorText, { color: themeColor }]}>/{maxMistakes}</Text>
        </View>
      </View>
      {isComplete && (
        <View style={[styles.completeContainer, { backgroundColor: themeColor }]}>
          <Text style={styles.completeText}>¡Completed!</Text>
        </View>
      )}
      <View style={styles.stat}>
        <Text style={styles.label}>Time</Text>
        <Text style={[styles.value,{ color: themeColor } ]}>{formatTime(timer)}</Text>
      </View>
      <TouchableOpacity onPress={pausedTime} style={[styles.pauseButton, { backgroundColor: themeColor }]}>
        <Icon name={isPaused ? 'play' : 'pause'} size={25} color="#fff" style={styles.pauseIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    position: 'relative',
  },
  stat: {
    alignItems: 'center',
  },
  mistakesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
    alignItems: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#f44336',
  },
  pauseIcon: {
    paddingTop: 2,
  },
  completeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  pauseButton: {
    padding: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
    margin: 9,
  },
  completeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
 
  overlay: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 8,
    padding: 20,
    height: 150,
  },

});

