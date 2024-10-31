import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../Styles/styles';

// Asetetaan pelin säännöissä käytettävät vakioarvot
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const MIN_SPOT = 1;
const MAX_SPOT = 6;
const BONUS_POINTS_LIMIT = 63;
const BONUS_POINTS = 50;

const HomeScreen = ({ navigation }) => {
    const [playerName, setPlayerName] = useState("");
    const [showRules, setShowRules] = useState(false);

    const handleOk = () => {
        if (playerName.trim()) {
            setShowRules(true);
        } else {
            alert("Please enter your name.");
        }
    };

    const startGame = () => {
        navigation.navigate('Gameboard', { playerName });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Mini-Yahtzee</Text>
            </View>


            <Image
                source={require('../assets/dice_logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {!showRules ? (
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Enter Your Name</Text>
                    <TextInput
                        style={styles.input}
                        value={playerName}
                        onChangeText={setPlayerName}
                        placeholder="Player Name"
                        placeholderTextColor={styles.textSecondary}
                    />
                    <TouchableOpacity style={styles.customButton} onPress={handleOk}>
                        <Text style={styles.customButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.rulesTitle}>Rules of the Game</Text>
                    <Text style={styles.rulesText}>
                        THE GAME: Upper section of the classic Yahtzee dice game. You have {NBR_OF_DICES} dices and for each dice you have {NBR_OF_THROWS} throws.
                        After each throw you can keep dices in order to get the same dice spot counts as many as possible. At the end of the turn, you must select
                        your points from {MIN_SPOT} to {MAX_SPOT}. The game ends when all points have been selected. You can choose the order freely.
                    </Text>
                    <Text style={styles.rulesText}>
                        POINTS: After each turn, the game calculates the sum for the dices you selected. Only the dices with the same spot count are counted.
                        You cannot select the same points from {MIN_SPOT} to {MAX_SPOT} again within the same game.
                    </Text>
                    <Text style={styles.rulesText}>
                        GOAL: To get as many points as possible. Reaching {BONUS_POINTS_LIMIT} points awards you a bonus of {BONUS_POINTS} additional points.
                    </Text>
                    <TouchableOpacity style={styles.customButton} onPress={startGame}>
                        <Text style={styles.customButtonText}>Play</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </View>
    );
};

export default HomeScreen;
