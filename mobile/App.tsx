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
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCache } from 'apollo3-cache-persist';

import { LoadingSpinner } from './components/LoadingSpinner';
import { AuthenticationSwitch } from './navigation/AuthenticationSwitch';
import { navigationRef } from './navigation/RootNavigation';
import { Colors } from './utils/styles/colors';

const cache = new InMemoryCache({
  typePolicies: {
    SnuberMarker: {
      keyFields: ['id', 'creatorId', 'title'],
      merge(existing, incoming) {
        return [...existing, ...incoming];
      }
    }
  }
});
const uri = 'http://192.168.1.215:42069/graphql';

const httpLink = createHttpLink({
  uri
});

const authLink = setContext((_, { headers }) => {
  const token = AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  credentials: 'include',
  cache
});

export default function App() {
  const [, setError] = useState<string | null>(null);
  const [loadingCache, setLoadingCache] = useState(true);

  const [pacificoLoaded] = usePacifico({ Pacifico_400Regular });
  const [poppinsLoaded] = usePoppins({
    Poppins_400Regular,
    Poppins_700Bold
  });

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage
    }).then(() => setLoadingCache(false));
  }, []);

  useEffect(() => {
    (async () => {
      const {
        status: locationStatus
      } = await requestForegroundPermissionsAsync();
      const serviceEnabled = await hasServicesEnabledAsync();
      const {
        status: imagePickerStatus
      } = await requestMediaLibraryPermissionsAsync();
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

  if (!pacificoLoaded || !poppinsLoaded || loadingCache) {
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
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.darkBlue}
          />
          <AuthenticationSwitch />
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
