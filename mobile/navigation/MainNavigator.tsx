import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from '../screens/MainScreen';
import { MapScreen } from '../screens/MapScreen';
import { Platform } from 'react-native';

export type RootStackParamList = {
  Main: undefined;
  Map: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const MainNavigator = ({}) => {
  return (
    <Stack.Navigator
      mode="card"
      screenOptions={{
        headerShown: false,
        animationEnabled: Platform.OS === 'ios'
      }}
    >
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  );
};
