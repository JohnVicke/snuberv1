import React from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

import { Colors } from '../utils/styles/colors';
import { Fonts } from '../utils/styles/fonts';

const marginBottom = '10px';

interface MenuContainerProps {
  fullSize: boolean;
}

const { width, height } = Dimensions.get('window');

const MenuContainer = styled.ScrollView<MenuContainerProps>`
  align-self: center;
  position: absolute;
  z-index: 999;
  width: ${(props) => (props.fullSize ? width : `${width - 20}`)}px;
  height: ${(props) => (props.fullSize ? '100%' : 'auto')};
  bottom: ${(props) => (props.fullSize ? '0' : '100px')};
  background-color: ${Colors.blue};
  border-radius: ${(props) => (props.fullSize ? 0 : '10px')};
  padding: 20px;
`;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  fullSize?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  close,
  fullSize = false
}) => {
  return (
    <MenuContainer fullSize={fullSize}>
      <HeaderContainer>
        <Heading>{title}</Heading>
        <Icon name="x" size={24} color={Colors.white} onPress={close} />
      </HeaderContainer>
      {children}
    </MenuContainer>
  );
};
