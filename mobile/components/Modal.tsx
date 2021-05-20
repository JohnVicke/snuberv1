import React from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

import { Colors } from '../utils/styles/colors';
import { Fonts } from '../utils/styles/fonts';
import { Button } from './Button';

const marginBottom = '10px';

const MenuContainer = styled.ScrollView`
  align-self: center;
  position: absolute;
  z-index: 999;
  width: ${Dimensions.get('window').width - 20}px;
  bottom: 100px;
  background-color: ${Colors.blue};
  border-radius: 10px;
  padding: 20px;
`;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.View`
  margin-bottom: ${marginBottom};
`;

const Heading = styled.Text`
  font-family: ${Fonts.PoppinsBold};
  color: ${Colors.white};
  font-size: 16px;
  letter-spacing: 1px;
  margin-bottom: ${marginBottom};
`;

interface ModalProps {
  title: string;
  children: React.ReactNode;
  close(): void;
}

export const Modal: React.FC<ModalProps> = ({ title, children, close }) => {
  return (
    <MenuContainer>
      <HeaderContainer>
        <Heading>{title}</Heading>
        <Icon name="x" size={24} color={Colors.white} onPress={close} />
      </HeaderContainer>
      {children}
    </MenuContainer>
  );
};
