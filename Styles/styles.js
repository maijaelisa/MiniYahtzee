import { StyleSheet } from 'react-native';

// Värit
const COLORS = {
    background: '#dcdbd3',
    primary: '#2c2221',
    textPrimary: '#2c2221',
    categoryBackground: '#a99995',
    categoryText: '#2c2424',
    buttonText: '#ffffff',
    disabledButton: '#b0bec5',
};

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    header: {
        width: '100%',
        backgroundColor: COLORS.primary,
        padding: 15,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.buttonText,
    },
    playerName: {
        fontSize: 16,
        marginTop: 10,
        color: COLORS.textPrimary,
    },
    text: {
        fontSize: 16,
        marginVertical: 10,
        color: COLORS.textPrimary,
    },
    // GameboardScreenin tyylit
    diceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    dice: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    lockedDice: {
        backgroundColor: COLORS.categoryBackground,
    },
    diceImage: {
        width: 50,
        height: 50,
    },
    rollButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 15,
        alignItems: 'center',
    },
    rollButtonDisabled: {
        backgroundColor: COLORS.disabledButton,
    },
    rollButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.buttonText,
    },
    endGameButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 15,
        alignItems: 'center',
    },
    endGameButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.buttonText,
    },
    totalText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        color: COLORS.textPrimary,
    },
    bonusText: {
        fontSize: 14,
        color: COLORS.textPrimary,
        marginBottom: 20,
    },
    scorecardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    categoryContainer: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    categoryScoreText: {
        fontSize: 14,
        color: COLORS.categoryText,
        marginBottom: 4,
    },
    scoreButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.categoryBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreButtonFilled: {
        backgroundColor: COLORS.primary,
    },
    scoreButtonText: {
        fontSize: 16,
        color: COLORS.categoryText,
    },

    // HomeScreenin ja ScoreboardScreenin yhteiset tyylit
    contentContainer: {
        padding: 16,
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.textPrimary,
    },
    input: {
        height: 40,
        borderColor: COLORS.primary,
        borderWidth: 1,
        width: '80%',
        paddingHorizontal: 8,
        marginBottom: 20,
        color: COLORS.textPrimary,
    },
    rulesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: COLORS.textPrimary,
    },
    rulesText: {
        fontSize: 16,
        textAlign: 'justify',
        marginVertical: 10,
        paddingHorizontal: 10,
        lineHeight: 24,
        color: COLORS.textPrimary,
    },

    // ScoreboardScreen tyylit
    scoreItem: {
        width: '98%',                // Levennetään täyttämään melkein koko näyttö
        backgroundColor: COLORS.categoryBackground,
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    playerNameScoreboard: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.categoryText,
    },
    scoreText: {
        fontSize: 16,
        color: COLORS.categoryText,
        marginTop: 5,
    },
    dateText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 5,
    },
    noScoresText: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginTop: 20,
    },

    // Mukautetun painikkeen tyyli (OK- ja Play-painikkeille)
    customButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 2,
        borderColor: COLORS.buttonText,
    },
    customButtonText: {
        color: COLORS.buttonText,
        fontSize: 16,
        fontWeight: 'bold',
    },


    logo: {
        width: 100,
        height: 100,
        marginVertical: 20,
    },
});
