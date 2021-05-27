import React from 'react';
import { Colors } from '../utils/styles/colors';
import styled from 'styled-components/native';
import { useIncomingFriendRequestsQuery } from '../generated/graphql';
import { Text } from 'react-native';

const RootContainer = styled.View`
  width: 100%;
`;

const FriendsContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.Text`
  color: ${Colors.white};
  font-size: 16px;
  font-weight: 700;
`;

export const Friends: React.FC<FriendProps> = ({}) => {
  const {
    data: friendRequests,
    loading: loadingFriendRequests
  } = useIncomingFriendRequestsQuery({
    fetchPolicy: 'network-only'
  });
  if (friendRequests?.incomingFriendRequests) {
    console.log(friendRequests.incomingFriendRequests);
  }
  return (
    <RootContainer>
      <HeaderText>Vänner</HeaderText>
      {friendRequests?.incomingFriendRequests && (
        <FriendsContainer>
          {friendRequests.incomingFriendRequests.map((friendRequest) => (
            <Text key={friendRequest.id}>{friendRequest.displayName}</Text>
          ))}
        </FriendsContainer>
      )}
    </RootContainer>
  );
};
