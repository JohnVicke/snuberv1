import { useApolloClient } from '@apollo/client';
import React from 'react';
import styled from 'styled-components/native';
import { Button } from '../components/Button';
import { useLoginMutation } from '../generated/graphql';
import { Colors } from '../utils/styles/colors';

const LoginContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: ${Colors.darkBlue};
  padding: 10px;
`;

const White = styled.Text`
  color: #fff;
`;

interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  const [login, { data: loginData, loading: loginLoading }] =
    useLoginMutation();

  const apolloClient = useApolloClient();

  const handleLogin = async () => {
    const res = await login({
      variables: { usernameOrEmail: 'kok', password: 'password' }
    });
    await apolloClient.resetStore();
  };
  return (
    <LoginContainer>
      <White>Current login credentials:</White>
      <White>Username: kok</White>
      <White>Password: password</White>
      <Button mt={10} onPress={handleLogin}>
        Login
      </Button>
    </LoginContainer>
  );
};
