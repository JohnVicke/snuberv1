import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../utils/styles/colors';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useApolloClient } from '@apollo/client';
import { Text } from 'react-native';
import { space } from '../utils/styles/space';

const RootView = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
`;

const Username = styled.Text`
  ${space};
  color: #fff;
`;

interface ProfileButtonProps {}

export const ProfileButton: React.FC<ProfileButtonProps> = ({}) => {
  const [logout, { data, loading }] = useLogoutMutation();
  const { loading: meLoading, error, data: meData } = useMeQuery();

  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    await logout();
    await apolloClient.resetStore();
  };

  return (
    <RootView>
      <Username marginRight="10px">{meData?.me?.username}</Username>
      <Icon
        onPress={handleLogout}
        name="log-out"
        size={24}
        color={Colors.white}
      />
    </RootView>
  );
};
