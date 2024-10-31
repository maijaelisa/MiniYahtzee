import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles/styles'

const diceImages = [
    require('../assets/dice/dice1.png'),
    require('../assets/dice/dice2.png'),
    require('../assets/dice/dice3.png'),
    require('../assets/dice/dice4.png'),
    require('../assets/dice/dice5.png'),
    require('../assets/dice/dice6.png'),
];

const scoreCategories = ['Ykköset', 'Kakkoset', 'Kolmoset', 'Neloset', 'Viitoset', 'Kuutoset'];
const BONUS_LIMIT = 63;
const BONUS_POINTS = 50;

const GameboardScreen = ({ route, navigation }) => {
    const playerName = route?.params?.playerName || "Player";
    const [dices, setDices] = useState([0, 0, 0, 0, 0]);
    const [lockedDices, setLockedDices] = useState([false, false, false, false, false]);
    const [throwsLeft, setThrowsLeft] = useState(3);
    const [score, setScore] = useState(0);
    const [scorecard, setScorecard] = useState({
        Ykköset: null,
        Kakkoset: null,
        Kolmoset: null,
        Neloset: null,
        Viitoset: null,
        Kuutoset: null,
    });
    const [hasRolled, setHasRolled] = useState(false);

    const rollDices = () => {
        if (throwsLeft > 0) {
            const newDices = dices.map((die, index) =>
                lockedDices[index] ? die : Math.floor(Math.random() * 6) + 1
            );
            setDices(newDices);
            setThrowsLeft(throwsLeft - 1);
            setHasRolled(true);
        }
    };

    const toggleLockDice = (index) => {
        if (hasRolled) {
            const updatedLockedDices = [...lockedDices];
            updatedLockedDices[index] = !updatedLockedDices[index];
            setLockedDices(updatedLockedDices);
        } else {
            Alert.alert("Roll first", "You need to roll the dices before locking them.");
        }
    };

    const isYahtzee = () => {
        return dices.every(die => die === dices[0] && die !== 0);
    };

    const calculateScore = (category) => {
        if (scorecard[category] !== null) {
            Alert.alert("Already filled", `The category ${category} is already filled.`);
            return;
        }

        if (throwsLeft > 0 && !isYahtzee()) {
            Alert.alert("Not Enough Throws", "You must roll three times before choosing a category, unless you have a Yahtzee.");
            return;
        }

        const categoryValue = scoreCategories.indexOf(category) + 1;
        const turnPoints = dices.filter(die => die === categoryValue).reduce((acc, curr) => acc + curr, 0);

        if (isYahtzee()) {
            Alert.alert("Yahtzee!", "Congratulations! You got Yahtzee!");
        }

        setScorecard(prevScorecard => ({ ...prevScorecard, [category]: turnPoints }));
        setScore(score + turnPoints);
        resetTurn();
    };

    useEffect(() => {
        const isGameOver = Object.values(scorecard).every(value => value !== null);
        if (isGameOver) {
            endGame();
        }
    }, [scorecard]);

    const endGame = async (manualEnd = false) => {
        let finalScore = score;
        let bonusMessage = "";

        if (finalScore >= BONUS_LIMIT) {
            finalScore += BONUS_POINTS;
            bonusMessage = ` You received a 50-point bonus!`;
        }

        try {
            const currentScores = JSON.parse(await AsyncStorage.getItem('scores')) || [];
            const newScore = {
                player: playerName,
                date: new Date().toLocaleDateString(),
                points: finalScore,
            };
            const updatedScores = [...currentScores, newScore];
            await AsyncStorage.setItem('scores', JSON.stringify(updatedScores));

            Alert.alert(
                "Game Over",
                `Game over! Your total score is ${finalScore}.${bonusMessage}`,
                [
                    { text: "New Game", onPress: startNewGame },
                    { text: "Home", onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }) }
                ]
            );
        } catch (error) {
            console.error("Failed to save score", error);
        }
    };

    const startNewGame = () => {
        setDices([0, 0, 0, 0, 0]);
        setLockedDices([false, false, false, false, false]);
        setThrowsLeft(3);
        setScore(0);
        setScorecard({
            Ykköset: null,
            Kakkoset: null,
            Kolmoset: null,
            Neloset: null,
            Viitoset: null,
            Kuutoset: null,
        });
        setHasRolled(false);
    };

    const resetTurn = () => {
        setDices([0, 0, 0, 0, 0]);
        setLockedDices([false, false, false, false, false]);
        setThrowsLeft(3);
        setHasRolled(false);
    };

    const diceImage = (value) => (value > 0 ? diceImages[value - 1] : null);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Mini-Yahtzee</Text>
            </View>

            <Text style={styles.playerName}>Player: {playerName}</Text>

            <View style={styles.diceContainer}>
                {dices.map((die, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.dice, lockedDices[index] ? styles.lockedDice : null]}
                        onPress={() => toggleLockDice(index)}
                    >
                        {die > 0 ? <Image source={diceImage(die)} style={styles.diceImage} /> : <Text>-</Text>}
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.text}>Throws left: {throwsLeft}</Text>

            <TouchableOpacity
                style={[styles.rollButton, throwsLeft === 0 ? styles.rollButtonDisabled : null]}
                onPress={rollDices}
                disabled={throwsLeft === 0}
            >
                <Text style={styles.rollButtonText}>THROW DICES</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.endGameButton}
                onPress={() => endGame(true)}
            >
                <Text style={styles.endGameButtonText}>END GAME</Text>
            </TouchableOpacity>

            <Text style={styles.totalText}>Total: {score}</Text>
            <Text style={styles.bonusText}>
                You are {Math.max(0, BONUS_LIMIT - score)} points away from bonus
            </Text>

            <View style={styles.scorecardContainer}>
                {scoreCategories.map((category, index) => (
                    <View key={category} style={styles.categoryContainer}>
                        <Text style={styles.categoryScoreText}>
                            {scorecard[category] !== null ? scorecard[category] : 0}
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.scoreButton,
                                scorecard[category] !== null ? styles.scoreButtonFilled : null,
                            ]}
                            onPress={() => calculateScore(category)}
                            disabled={scorecard[category] !== null}
                        >
                            <Text style={styles.scoreButtonText}>{index + 1}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};


export default GameboardScreen;
