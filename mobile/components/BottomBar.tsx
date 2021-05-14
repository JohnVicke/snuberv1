import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../utils/styles/colors';
import styled from 'styled-components/native';
import { Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { EmergencyBtn } from './EmergencyBtn';
import { navigate } from '../navigation/RootNavigation';

const RootContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  background-color: ${Colors.darkBlue};
  flex: 1;
  justify-content: center;
  margin: auto 0;
  align-items: center;
`;

const Icons = styled.View`
  width: 100%;
  background-color: ${Colors.darkBlue};
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

interface BottomBarProps {
  openEmergencyMenu(): void;
}

export const BottomBar: React.FC<BottomBarProps> = ({ openEmergencyMenu }) => {
  return (
    <RootContainer>
      <Icons>
        <Icon name="message-circle" size={24} color={Colors.white} />
        <TouchableOpacity onPress={openEmergencyMenu}>
          <EmergencyBtn />
        </TouchableOpacity>
        <Icon name="user-plus" size={24} color={Colors.white} />
      </Icons>
    </RootContainer>
  );
};
