import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles/styles';

const ScoreboardScreen = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const storedScores = await AsyncStorage.getItem('scores');
                if (storedScores) {
                    const parsedScores = JSON.parse(storedScores);
                    const sortedScores = parsedScores.sort((a, b) => b.points - a.points).slice(0, 10);
                    setScores(sortedScores);
                }
            } catch (error) {
                console.error("Failed to load scores", error);
            }
        };

        fetchScores();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Scoreboard</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {scores.length > 0 ? (
                    scores.map((score, index) => (
                        <View key={index} style={styles.scoreItem}>
                            <Text style={styles.playerNameScoreboard}>{index + 1}. {score.player}</Text>
                            <Text style={styles.scoreText}>Score: {score.points}</Text>
                            <Text style={styles.dateText}>Date: {score.date}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noScoresText}>No scores available</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default ScoreboardScreen;
