import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider } from '@ui-kitten/components';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular as PoppinsRegular,
  Poppins_700Bold as PoppinsBold,
  Poppins_600SemiBold as PoppinsSemiBold
} from '@expo-google-fonts/poppins';

import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json';

import { RootStackParamList } from './type';

import MainScreen from './components/MainScreen';
import HomeScreen from './components/HomeScreen';
import { DatabaseProvider } from './context/DatabaseContext';
import {
  AppStateStatus,
  SafeAreaView,
  StyleSheet,
  AppState
} from 'react-native';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

let appState: AppStateStatus;

const RootNavigator = () => (
  <Navigator headerMode="none" initialRouteName="Home">
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Main" component={MainScreen} />
  </Navigator>
);

export default () => {
  appState = AppState.currentState;

  const [fontsLoaded] = useFonts({
    PoppinsBold,
    PoppinsRegular,
    PoppinsSemiBold
  });

  useEffect(() => {
    appInForeground();
    appState = 'active';

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      appInForeground();
    }
    appState = nextAppState;
  };

  const appInForeground = () => {
    console.log('app running in foreground');
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <DatabaseProvider>
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </SafeAreaView>
        </ApplicationProvider>
      </DatabaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
