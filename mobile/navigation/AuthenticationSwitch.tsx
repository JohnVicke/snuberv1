import { useApolloClient } from '@apollo/client';
import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from '../components/Button';
import {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery
} from '../generated/graphql';
import { LoginScreen } from '../screens/LoginScreen';
import { MainNavigator } from './MainNavigator';

export const AuthenticationSwitch: React.FC = ({}) => {
  const { loading, error, data } = useMeQuery();

  if (!data?.me) {
    return <LoginScreen />;
  }

  return <MainNavigator />;
};
