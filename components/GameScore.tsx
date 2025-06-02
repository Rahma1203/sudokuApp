import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSudokuStore, getTotalPointsAcrossDifficulties } from '../store/sudokuStore';

const GameScore = () => {
    const points = useSudokuStore(state => state.points);
    const isComplete = useSudokuStore(state => state.isComplete);
    const difficulty = useSudokuStore(state => state.difficulty);
    const timer = useSudokuStore(state => state.timer);
    const{themeColor, isDarkMode} = useSudokuStore();
    const gameOver = useSudokuStore(state => state.gameOver);
    const [totalScore, setTotalScore] = useState(0);
    const [bestTime, setBestTime] = useState(Number.MAX_SAFE_INTEGER);
    const mistakes = useSudokuStore(state => state.mistakes);
    const maxMistakes = useSudokuStore(state => state.maxMistakes);
   
    
    // Flag para prevenir múltiples updates
    const hasUpdatedStats = useRef(false);
    const currentGameId = useRef<string>('');

    // Función para formatear el tiempo
    const formatTime = (seconds: number) => {
        if (seconds === Number.MAX_SAFE_INTEGER) return '-';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
    };

    const container = isDarkMode ? "#1a1a1a" : "#ddd";

    // Cargar estadísticas iniciales
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const totalPoints = await getTotalPointsAcrossDifficulties();
                setTotalScore(totalPoints.valueOf());

                const storedBestTime = await AsyncStorage.getItem(`bestTime_${difficulty}`);
                setBestTime(storedBestTime !== null ? parseInt(storedBestTime) : Number.MAX_SAFE_INTEGER);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
        hasUpdatedStats.current = false;
        currentGameId.current = '';
    }, [difficulty]);

    // Actualizar stats cuando se complete el juego exitosamente
    useEffect(() => {
        if (isComplete && !hasUpdatedStats.current && !gameOver) {
            const gameId = `${difficulty}_${points}_${timer}`;
            
            if (currentGameId.current !== gameId) {
                currentGameId.current = gameId;
                hasUpdatedStats.current = true;

                const updateStats = async () => {
                    try {
                        // Actualizar puntos totales
                        const currentTotalScore = await AsyncStorage.getItem(`totalScore_${difficulty}`);
                        const currentTotal = currentTotalScore !== null ? parseInt(currentTotalScore) : 0;
                       
                        const newTotalScore = currentTotal + points;
                        await AsyncStorage.setItem(`totalScore_${difficulty}`, String(newTotalScore));
                        setTotalScore(newTotalScore);

                        // Actualizar mejor tiempo solo si es mejor
                        const currentBestTime = await AsyncStorage.getItem(`bestTime_${difficulty}`);
                        const currentBest = currentBestTime !== null ? parseInt(currentBestTime) : Number.MAX_SAFE_INTEGER;
                        
                        if (timer < currentBest) {
                            await AsyncStorage.setItem(`bestTime_${difficulty}`, String(timer));
                            setBestTime(timer);
                        }

                        console.log('Stats updated successfully:', { 
                            gameId, 
                            points, 
                            timer, 
                            difficulty, 
                            newTotalScore
                        });
                    } catch (error) {
                        console.error('Error saving stats:', error);
                    }
                };

                updateStats();
            }
        }
    }, [isComplete, difficulty, points, timer, gameOver]);

    // Actualizar totalScore cuando gameOver cambie (para reflejar la penalización)
    useEffect(() => {
        if (gameOver) {
            const updateTotalScore = async () => {
                try {
                    const currentTotalScore = await AsyncStorage.getItem(`totalScore_${difficulty}`);
                    const currentTotal = currentTotalScore !== null ? parseInt(currentTotalScore) : 0;
                    setTotalScore(currentTotal);
                } catch (error) {
                    console.error('Error updating total score after penalty:', error);
                }
            };
            
            // Pequeño delay para asegurar que la penalización se haya aplicado
            setTimeout(updateTotalScore, 100);
        }
    }, [gameOver, difficulty]);

    // Reset flag cuando inicie nuevo juego
    useEffect(() => {
        if (!isComplete && !gameOver) {
            hasUpdatedStats.current = false;
        }
    }, [isComplete, gameOver]);
    const backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';
    const textColor = isDarkMode ? '#FFFFFF' : '#555';
    
    return (
        <View style={{backgroundColor, flex:1}}>
            <View style={styles.container}>
            <Text style={[styles.score, {backgroundColor: themeColor }, {color: textColor} ]}>Current: {points}</Text>
            <Text style={[styles.totalScore,{backgroundColor: themeColor }, {color: textColor} ]}>Total: {totalScore}</Text>
            <Text style={[styles.bestTime,{backgroundColor: themeColor }, {color: textColor} ]}>Best Time: {formatTime(bestTime)}</Text>
            
        </View></View>
    
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        
    },
  
    score: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#555',
        marginRight: 6,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        
      
    },
    totalScore: {
        fontSize: 15,
        color: '#555',
        fontWeight: 'bold',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        // marginRight: 10,
    },
    bestTime: {
        fontSize: 15,
        color: '#555',
        borderRadius: 8,
        fontWeight: 'bold',
        paddingHorizontal: 13,
        paddingVertical: 10,
        marginLeft: 5,
        marginRight: 16,
    },
   
});

export default GameScore;