import { useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button } from '../components/Button';
import { useLoginMutation } from '../generated/graphql';
import { Colors } from '../utils/styles/colors';
import { Formik } from 'formik';
import { Text, View } from 'react-native';
import { TextField } from '../components/TextInput';

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
            console.log(res.data.login.errors);
          } else if (res.data?.login.user) {
            console.log('managed to login');
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue
        }) => (
          <View>
            <TextField
              label="Användarnamn"
              field="usernameOrEmail"
              value={values['usernameOrEmail']}
              setValue={setFieldValue}
              onBlur={handleBlur('usernameOrEmail')}
            />
            <TextField
              label="Lösenord"
              field="password"
              secureTextEntry
              setValue={setFieldValue}
              onBlur={handleBlur('password')}
              value={values['password']}
            />
            <Button onPress={handleSubmit}>Submit</Button>
          </View>
        )}
      </Formik>
    </LoginContainer>
  );
};
