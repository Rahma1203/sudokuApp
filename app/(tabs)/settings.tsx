import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useSudokuStore } from '../../store/sudokuStore';
import type { Difficulty } from '../../utils/sudoku';


export default function SettingsScreen() {
  const router = useRouter();
  const { difficulty, setDifficulty, themeColor, setThemeColor, isDarkMode, toggleDarkMode } = useSudokuStore();

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  const themeColors = [
    { name: 'Green', color: '#4CAF50' },
    { name: 'Blue', color: '#2196F3' },
    { name: 'Pink', color: '#E91E63' },
  ];

  const backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const difficultyTextColor = isDarkMode ? '#888' : '#444';
  const difficultyButtonBackground = isDarkMode ? '#2a2a2a' : '#ddd';


  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: themeColor }]}>Settings</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Difficulty</Text>
        <View style={styles.difficulties}>
          {difficulties.map((diff, index) => (
            <TouchableOpacity
              key={diff}
              style={[
                styles.difficultyButton,
                { backgroundColor: difficultyButtonBackground },
                index !== difficulties.length - 1 && styles.buttonSpacing,
                difficulty === diff && { backgroundColor: themeColor },
              ]}
              onPress={() => setDifficulty(diff)}
            >
              <Text
                style={[
                  styles.difficultyText,
                  { color: difficultyTextColor },
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
        <Text style={[styles.sectionTitle, { color: textColor }]}>Theme Color</Text>
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
              <Text style={[styles.colorName, { color: textColor }]}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#767577', true: themeColor }}
          thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Statistics</Text>
        <TouchableOpacity
          style={[
            styles.statisticsButton,
            { backgroundColor: difficultyButtonBackground, padding: 7, alignItems: 'center', justifyContent: 'center'},
            
          ]}
          onPress={() => {
            router.push('/statistics');
          }}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.difficultyText,
              { color: themeColor, fontWeight: 'bold' },
              { fontSize: 18}, 
            ]}
          >
            View Statistics
          </Text>
        </TouchableOpacity>
      </View>
       <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>instructions</Text>
        <TouchableOpacity
          style={[
            styles.statisticsButton,
            { backgroundColor: difficultyButtonBackground, padding: 7, alignItems: 'center', justifyContent: 'center'},
            
          ]}
          onPress={() => {
            router.push('/howplay');
          }}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.difficultyText,
              { color: themeColor, fontWeight: 'bold' },
              { fontSize: 18}, 
            ]}
          >
            How to play 
          </Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 16,
  },
  difficulties: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statisticsButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSpacing: {
    marginRight: 12,
  },
  difficultyText: {
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
    fontSize: 14,
  },
});
