import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Tuo näkymäkomponentit
import HomeScreen from './Screens/HomeScreen';
import GameboardScreen from './Screens/GameboardScreen';
import ScoreboardScreen from './Screens/ScoreboardScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Gameboard" component={GameboardScreen} />
        <Tab.Screen name="Scoreboard" component={ScoreboardScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
