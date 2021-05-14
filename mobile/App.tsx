import {
  Pacifico_400Regular,
  useFonts as usePacifico
} from '@expo-google-fonts/pacifico';
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts as usePoppins
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import {
  hasServicesEnabledAsync,
  requestForegroundPermissionsAsync
} from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AuthenticationSwitch } from './navigation/AuthenticationSwitch';
import { navigationRef } from './navigation/RootNavigation';
import { store } from './redux/store';
import { Colors } from './utils/styles/colors';

export default function App() {
  const [error, setError] = useState<string | null>(null);
  const [darkTheme, setDarkTheme] = useState(true);

  const [pacificoLoaded] = usePacifico({ Pacifico_400Regular });
  const [poppinsLoaded] = usePoppins({
    Poppins_400Regular,
    Poppins_700Bold
  });

  useEffect(() => {
    (async () => {
      const { status: locationStatus } =
        await requestForegroundPermissionsAsync();
      const serviceEnabled = await hasServicesEnabledAsync();
      const { status: imagePickerStatus } =
        await requestMediaLibraryPermissionsAsync();
      if (imagePickerStatus !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }

      if (locationStatus !== 'granted') {
        return setError('Location permission not granted');
      }

      if (!serviceEnabled) {
        return setError('Location service not enabled');
      }
    })();
  }, []);

  if (!pacificoLoaded || !poppinsLoaded) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={Colors.darkBlue} />
        <LoadingSpinner
          visible={!pacificoLoaded || !poppinsLoaded}
          text="Bloated software"
        />
      </SafeAreaProvider>
    );
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.darkBlue}
          />
          <AuthenticationSwitch />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
