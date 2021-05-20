import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { LoginScreen } from '../screens/LoginScreen';
import { MainNavigator } from './MainNavigator';

export const AuthenticationSwitch: React.FC = ({}) => {
  const { loading, error, data } = useMeQuery();

  if (data?.me) {
    return <LoginScreen />;
  }

  return <MainNavigator />;
};
