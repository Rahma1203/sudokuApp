import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';

import { useSudokuStore } from '../../store/sudokuStore';
import type { Difficulty } from '../../utils/sudoku';

export default function SettingsScreen() {
  const router = useRouter();
  const { difficulty, setDifficulty, themeColor, setThemeColor } = useSudokuStore();

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  const themeColors = [
    { name: 'Green', color: '#4CAF50' },
    { name: 'Blue', color: '#2196F3' },
    { name: 'Pink', color: '#E91E63' },
  ];

  

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColor }]}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Difficulty</Text>
        <View style={styles.difficulties}>
          {difficulties.map((diff, index) => (
            <TouchableOpacity
              key={diff}
              style={[
                styles.difficultyButton,
                index !== difficulties.length - 1 && styles.buttonSpacing,
                difficulty === diff && { backgroundColor: themeColor },
              ]}
              onPress={() => setDifficulty(diff)}
            >
              <Text
                style={[
                  styles.difficultyText,
                  difficulty === diff && styles.selectedDifficultyText,
                ]}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme Color</Text>
        <View style={styles.difficulties}>
          {themeColors.map(({ name, color }, index) => (
            <TouchableOpacity
              key={name}
              style={[
                styles.colorButton,
                index !== themeColors.length - 1 && styles.buttonSpacing,
                themeColor === color && { borderColor: color, borderWidth: 2 },
              ]}
              onPress={() => setThemeColor(color)}
            >
              <View style={[styles.colorCircle, { backgroundColor: color }]} />
              <Text style={styles.colorName}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <TouchableOpacity
          style={styles.difficultyButton}
          onPress={() => {
            // Handle statistics action here
          }}
        >
          <Text style={styles.difficultyText}>View Statistics</Text>
        </TouchableOpacity>
      </View>
      {/* <Link href="/how-to-play">
        <Text style={styles.sectionTitle}>How to play</Text>
      </Link> */}

      {/* {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to play</Text>
        <TouchableOpacity
          style={styles.difficultyButton}
          onPress={() => router.push('')}
        >
          <Text style={styles.difficultyText}>How to play</Text>
        </TouchableOpacity>
      </View> */}
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 16,
  },
  difficulties: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSpacing: {
    marginRight: 12,
  },
  difficultyText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDifficultyText: {
    color: '#fff',
  },
  colorButton: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 4,
  },
  colorName: {
    color: '#fff',
    fontSize: 14,
  },
});
