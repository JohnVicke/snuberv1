import React from 'react';
import { Modal } from './Modal';
import { Friends } from './Friends';
import { Button } from './Button';
import { useLogoutMutation } from '../generated/graphql';
import { useApolloClient } from '@apollo/client';

interface ProfileProps {
  close: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ close }) => {
  const [logout, { data, loading }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const handleOnPress = async () => {
    await logout();
    await apolloClient.resetStore();
  };
  return (
    <Modal title="Profil" close={close} fullSize>
      <Friends />
      <Button onPress={handleOnPress}>Logga ut</Button>
    </Modal>
  );
};
