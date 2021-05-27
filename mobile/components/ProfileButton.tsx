import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../utils/styles/colors';

const RootView = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
`;

const FriendRequestNotification = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15px;
  width: 15px;
  background-color: ${Colors.snuberRed};
  border-radius: 200px;
  position: absolute;
  top: -5px;
  right: 25px;
  z-index: 100;
`;

const FriendRequestText = styled.Text`
  font-size: 10px;
  color: ${Colors.white};
`;

const Border = styled.View`
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 5px;
  background: ${Colors.darkBlue};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ProfileButtonProps {
  friendRequests?: number | false;
  openProfileModal: () => void;
}

// TODO: Replace with user image
export const ProfileButton: React.FC<ProfileButtonProps> = ({
  friendRequests,
  openProfileModal
}) => {
  return (
    <RootView>
      <Border>
        {friendRequests && (
          <FriendRequestNotification>
            <FriendRequestText>
              {friendRequests.toLocaleString()}
            </FriendRequestText>
          </FriendRequestNotification>
        )}
        <Icon
          onPress={openProfileModal}
          name="user"
          size={24}
          color={Colors.white}
        />
      </Border>
    </RootView>
  );
};
