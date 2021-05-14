import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  flex: 1;
  display: flex;
`;

export const MainScreen: React.FC = ({}) => {
  return (
    <MainContainer>
      <Text>Hello world</Text>
    </MainContainer>
  );
};
