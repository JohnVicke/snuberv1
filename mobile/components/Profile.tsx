import React from 'react';
import { Modal } from './Modal';
import { Friends } from './Friends';
import { Button } from './Button';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Fonts } from '../utils/styles/fonts';
import { Colors } from '../utils/styles/colors';

const ModalContent = styled.View`
  display: flex;
  min-height: ${Dimensions.get('window').height - 200}px;
  justify-content: space-between;
`;

const AvatarSection = styled.View`
  display: flex;
  flex-direction: column;
`;

const DisplayName = styled.Text`
  font-family: ${Fonts.PoppinsBold};
  color: ${Colors.white};
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 100px;
`;

interface ProfileProps {
  close: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ close }) => {
  const [logout, { data, loading }] = useLogoutMutation();
  const { loading: meLoading, error: meError, data: meData } = useMeQuery();

  const apolloClient = useApolloClient();
  const handleOnPress = async () => {
    await logout();
    await apolloClient.resetStore();
  };

  return (
    <Modal title="Profil" close={close} fullSize>
      <ModalContent>
        <AvatarSection>
          <DisplayName>{meData?.me?.avatarId}</DisplayName>
        </AvatarSection>
        <Friends />
        <Button onPress={handleOnPress}>Logga ut</Button>
      </ModalContent>
    </Modal>
  );
};
