import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Colors } from '../utils/styles/colors';
import { Fonts } from '../utils/styles/fonts';

interface ButtonProps {
  outlined?: boolean;
  onPress(value: any): void;
  disabled?: boolean;
  align?: 'left' | 'right';
  mt?: number;
  mb?: number;
  text?: boolean;
  small?: boolean;
}

type ButtonTextProps = Pick<ButtonProps, 'outlined' | 'mt' | 'mb'>;

// TODO: implement disabled

const StyledTouchableOpacity = styled.TouchableOpacity<ButtonProps>`
  background-color: ${(props) =>
    props.outlined ? 'transparent' : Colors.snuberRed};
  border: ${(props) =>
    props.outlined ? `2px solid ${Colors.snuberRed}` : 'none'};
  border-radius: 10px;
  height: ${(props) => (props.small ? 30 : 50)}px;
  font-family: ${Fonts.PoppinsBold};
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${(props) => (props.align === 'right' ? 'auto' : 0)};
  margin-right: ${(props) => (props.align === 'left' ? 'auto' : 0)};
  margin-top: ${(props) => (props.mt ? props.mt : 0)}px;
  margin-bottom: ${(props) => (props.mb ? props.mb : 0)}px;
`;

const TextButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
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
  align,
  mt,
  mb,
  text,
  small
}) => {
  const onDisabled = () => {};

  if (text) {
    return (
      <TextButton onPress={disabled ? onDisabled : onPress}>
        <ButtonText outlined>{children}</ButtonText>
      </TextButton>
    );
  }

  return (
    <StyledTouchableOpacity
      small={small}
      align={align}
      outlined={outlined}
      activeOpacity={disabled ? 1 : 0.8}
      onPress={disabled ? onDisabled : onPress}
      mt={mt}
      mb={mb}
    >
      <ButtonText outlined={outlined}>{children}</ButtonText>
    </StyledTouchableOpacity>
  );
};
