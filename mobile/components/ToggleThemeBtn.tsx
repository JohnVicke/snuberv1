import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../utils/styles/colors';

interface ToggleThemeBtnProps {
  darkmode: boolean;
}

export const ToggleThemeBtn: React.FC<ToggleThemeBtnProps> = ({ darkmode }) => {
  if (darkmode) {
    return (
      <Icon
        style={{ zIndex: 1000, position: 'absolute', top: 100 }}
        name="moon"
        size={24}
        color={Colors.white}
      />
    );
  }

  return <Icon name="sun" size={24} color={Colors.white} />;
};
