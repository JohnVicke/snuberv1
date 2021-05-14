import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Colors } from '../utils/styles/colors';
import { Fonts } from '../utils/styles/fonts';

interface ButtonProps {
  outlined?: boolean;
  onPress(): void;
  disabled?: boolean;
  align?: 'left' | 'right';
}

type ButtonTextProps = Pick<ButtonProps, 'outlined'>;

// TODO: implement disabled

const StyledTouchableOpacity = styled.TouchableOpacity<ButtonProps>`
  background-color: ${(props) =>
    props.outlined ? 'transparent' : Colors.snuberRed};
  border: ${(props) =>
    props.outlined ? `2px solid ${Colors.snuberRed}` : 'none'};
  border-radius: 10px;
  height: 50px;
  font-family: ${Fonts.PoppinsBold};
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${(props) => (props.align === 'right' ? 'auto' : 0)};
  margin-right: ${(props) => (props.align === 'left' ? 'auto' : 0)};
`;

const ButtonText = styled.Text<ButtonTextProps>`
  font-family: ${Fonts.PoppinsBold};
  font-size: 16px;
  letter-spacing: 1px;
  color: ${(props) => (props.outlined ? Colors.snuberRed : Colors.darkBlue)};
`;

export const Button: React.FC<ButtonProps> = ({
  disabled,
  onPress,
  outlined,
  children,
  align
}) => {
  const onDisabled = () => {};
  return (
    <StyledTouchableOpacity
      align={align}
      outlined={outlined}
      activeOpacity={disabled ? 1 : 0.8}
      onPress={disabled ? onDisabled : onPress}
    >
      <ButtonText outlined={outlined}>{children}</ButtonText>
    </StyledTouchableOpacity>
  );
};
