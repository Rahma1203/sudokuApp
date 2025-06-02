import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GameScore from '../components/GameScore';
import { useSudokuStore } from '../store/sudokuStore';

export default function StatisticsScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useSudokuStore();
  const backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';
  const headerBackground = isDarkMode ? '#2a2a2a' : '#ddd';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerBackground,
      },
      headerTintColor: isDarkMode ? '#fff' : '#000',
    });
  }, [navigation, headerBackground, isDarkMode]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GameScore />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});