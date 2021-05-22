import React, { useRef, useState } from 'react';
import { TextInputProps, View } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../utils/styles/colors';
import { Fonts } from '../utils/styles/fonts';
import { TextInput } from 'react-native-gesture-handler';

const Input = styled.TextInput`
  letter-spacing: 1px;
  color: #fff;
  width: 100%;
  background-color: ${Colors.darkBlue};
  border-radius: 10px;
  padding: 20px 14px 10px 14px;
  font-family: ${Fonts.PoppinsRegular};
  margin-bottom: 10px;
  line-height: 20px;
`;

interface LabelProps {
  focused: boolean;
}

const Label = styled.Text<LabelProps>`
  position: absolute;
  left: 10px;
  top: ${(props) => (!props.focused ? '16px' : '2px')};
  font-size: ${(props) => (!props.focused ? 16 : 10)}px;
  color: ${(props) =>
    !props.focused ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.7)'};
  z-index: 10;
`;

type CustomInputProps = TextInputProps & {
  label: string;
  value: string;
  field: string;
  secureTextEntry?: boolean;
  setValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const TextField: React.FC<CustomInputProps> = (
  { label, value, setValue, field, secureTextEntry },
  props
) => {
  const [focused, setFocused] = useState(false);
  const { style, onBlur, ...rest } = props;
  const inputRef =
    useRef<
      TextInput & {
        focus(): void;
      }
    >();

  const handleLabelPress = () => {
    if (inputRef && inputRef?.current) inputRef.current.focus();
    setFocused(true);
  };

  return (
    <View>
      <Label
        focused={focused || value !== ''}
        selectable={false}
        onPress={handleLabelPress}
      >
        {label}
      </Label>
      <Input
        {...rest}
        ref={inputRef}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onChangeText={(e) => setValue(field, e)}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
      ></Input>
    </View>
  );
};
