// Instrucciones de como jugar en la app 
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
const {useSudokuStore} = require('../store/sudokuStore');

export function HowToPlay() {
  const isDarkMode = useSudokuStore();
  const textColor = isDarkMode ? '#FFFFFF' : '#555';
  const themeColor = useSudokuStore().themeColor;
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={[styles.title,  {color: themeColor}, {textDecorationLine: 'underline'}]}>Instructions</Text>
      <Text style={[styles.text1,  {color: themeColor}]}>
        1. Sudoku
        </Text>

      <Image source={require('../assets/images/image0.webp')} style={{ width: '50%', height: 200, marginBottom: 16, resizeMode: 'contain' }} />
      <Text style={[styles.text,  {color: textColor}]}>
        Sudoku is a logic game that consists of filling a 9x9 grid with numbers from 1 to 9. Each row, column and 3x3 subgrid must contain all numbers from 1 to 9 without repeating.
      </Text>
      <Text style={[styles.text,  {color: textColor}]}>
        Start by selecting an empty cell and choose a number from the numeric keypad. If you make a mistake, you can undo it by touching the cell again.
      </Text>
      

      <Text style={[styles.text1,  {color: themeColor}]}>
        2.Points
        </Text>

      <Image source={require('../assets/images/image1.webp')} style={{ width: '50%', height: 200, marginBottom: 16, resizeMode: 'contain' }} />
      <Text style={[styles.text,  {color: textColor}]}>
        For each correctly completed square, you get points. EASY: +10, MEDIUM: +20, HARD: +30.
      </Text>

      
      <Text style={[styles.text1,  {color: themeColor}]}>
        3.Mistakes
        </Text>
      <Text style={[styles.text,  {color: textColor}]}>
       You have 3 attempts, if you lose them you will lose the game and 100 points will be deducted from your stored points.
      </Text>

      <Text style={[styles.text1,  {color: themeColor}]}>
        4.Stadistics
        </Text>
      <Image source={require('../assets/images/image2.webp')} style={{ width: '100%', height: 200, marginBottom: 16, resizeMode: 'contain' }} />
      <Text style={[styles.text,  {color: textColor}]}>
        You can see your current score, total score and best time in the game statistics section.
      </Text>

      <Text style={[styles.text1,  {color: themeColor}]}>
        4.Tip
        </Text>
      <Text style={[styles.text,  {color: textColor}]}>
        If you need help, you can use the tip button to get a hint for a cell, but that dont give you points.
      </Text>
    
    
    </View>
   </ScrollView>



  )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    
  },
  text: {
    fontSize: 17,    
    marginBottom: 8,
  },  
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,  
    marginTop: 16,
  }
  }
);

