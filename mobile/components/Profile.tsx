import React from 'react';
import { Modal } from './Modal';
import { Text } from 'react-native';

interface ProfileProps {
  close: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ close }) => {
  return (
    <Modal title="Profil" close={close} fullSize>
      <Text>Hejsan</Text>
    </Modal>
  );
};
