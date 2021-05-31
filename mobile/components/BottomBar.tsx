import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../utils/styles/colors';
import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity } from 'react-native';
import { EmergencyBtn } from './EmergencyBtn';
import { bottomBarHeight } from '../utils/styles/constants';

const RootContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  max-height: ${bottomBarHeight}px;
  flex: 1;
  background-color: ${Colors.darkBlue};
  justify-content: center;
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
  openEmergencyModal(): void;
  openAddFriendModal(): void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  openEmergencyModal,
  openAddFriendModal
}) => {
  return (
    <RootContainer>
      <Icons>
        <Icon name="message-circle" size={24} color={Colors.white} />
        <TouchableOpacity onPress={openEmergencyModal}>
          <EmergencyBtn />
        </TouchableOpacity>
        <Icon
          onPress={openAddFriendModal}
          name="user-plus"
          size={24}
          color={Colors.white}
        />
      </Icons>
    </RootContainer>
  );
};
