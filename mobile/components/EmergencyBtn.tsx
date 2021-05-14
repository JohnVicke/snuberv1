import React from 'react';
import { Colors } from '../utils/styles/colors';
import styled from 'styled-components/native';
import glow from '../assets/glow/50x50-round-glow.png';
import { Image } from 'react-native';

const fontOffsetY = 25;
const fontOffsetX = 2;

const RootContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: ${Colors.snuberRed};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-family: Pacifico_400Regular;
  color: ${Colors.white};
  font-size: 40px;
  margin-bottom: ${fontOffsetY}px;
  margin-right: ${fontOffsetX}px;
`;

interface EmergencyBtnProps {}

export const EmergencyBtn: React.FC<EmergencyBtnProps> = ({}) => {
  return (
    <RootContainer>
      <StyledText>s</StyledText>
    </RootContainer>
  );
};
