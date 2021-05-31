import React from 'react';
import { Colors } from '../utils/styles/colors';
import styled from 'styled-components/native';
import { useIncomingFriendRequestsQuery } from '../generated/graphql';
import { IncomingRequest } from './IncomingRequests';

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

interface FriendProps {
  lol?: boolean;
}

export const Friends: React.FC<FriendProps> = ({}) => {
  const { data: friendRequests, loading: loadingFriendRequests } =
    useIncomingFriendRequestsQuery({
      fetchPolicy: 'network-only'
    });

  return (
    <RootContainer>
      <HeaderText>Vänner</HeaderText>
      {friendRequests?.incomingFriendRequests && (
        <FriendsContainer>
          {friendRequests.incomingFriendRequests.map((friendRequest) => (
            <IncomingRequest
              key={friendRequest.id}
              friendRequest={friendRequest}
            />
          ))}
        </FriendsContainer>
      )}
    </RootContainer>
  );
};
