import { useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button } from '../components/Button';
import { useLoginMutation } from '../generated/graphql';
import { Colors } from '../utils/styles/colors';
import { Formik } from 'formik';
import { View } from 'react-native';
import { space } from '../utils/styles/space';
import { TextField } from '../components/TextField';

// TODO: FIX THIS SHIT
const ThisIsNotVeryGood = styled.View`
  ${space}
`;

const LoginContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: ${Colors.blue};
  padding: 10px;
`;

interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  const [focused, setFocused] = useState(false);
  const [login, { data: loginData, loading: loginLoading }] =
    useLoginMutation();

  const apolloClient = useApolloClient();

  const handleLogin = async () => {
    await login({
      variables: { usernameOrEmail: 'kok', password: 'password' }
    });
    await apolloClient.resetStore();
  };

  return (
    <LoginContainer>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          if (values.usernameOrEmail === '') {
            setErrors({ usernameOrEmail: 'error' });
          }
          const res = await login({ variables: { ...values } });
          if (res.data?.login.errors) {
          } else if (res.data?.login.user) {
            await apolloClient.resetStore();
          }
        }}
      >
        {({ handleBlur, handleSubmit, values, setFieldValue }) => (
          <View>
            <ThisIsNotVeryGood marginBottom="10px">
              <TextField
                label="Användarnamn"
                field="usernameOrEmail"
                value={values['usernameOrEmail']}
                setValue={setFieldValue}
                onBlur={handleBlur('usernameOrEmail')}
              />
            </ThisIsNotVeryGood>
            <ThisIsNotVeryGood marginBottom="10px">
              <TextField
                label="Lösenord"
                field="password"
                secureTextEntry
                setValue={setFieldValue}
                onBlur={handleBlur('password')}
                value={values['password']}
              />
            </ThisIsNotVeryGood>
            <Button onPress={handleSubmit}>Logga in</Button>
          </View>
        )}
      </Formik>
    </LoginContainer>
  );
};
