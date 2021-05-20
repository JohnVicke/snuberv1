import React, { useEffect, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInputFocusEventData,
  TextInputProps,
  View
} from 'react-native';
import styled from 'styled-components/native';
import { useField } from 'formik';
import { Colors } from '../utils/styles/colors';
import { Fonts } from '../utils/styles/fonts';
import { TextInput } from 'react-native-gesture-handler';

const Input = styled.TextInput`
  letter-spacing: 1px;
  color: #fff;
  min-height: 30px;
  width: 100%;
  background-color: ${Colors.darkBlue};
  border-radius: 10px;
  padding: 10px;
  font-family: ${Fonts.PoppinsRegular};
  line-height: 20px;
`;

interface LabelProps {
  focused: boolean;
}

const Label = styled.Text<LabelProps>`
  position: absolute;
  left: 10px;
  top: ${(props) => (!props.focused ? 10 : 0)}px;
  font-size: ${(props) => (!props.focused ? 16 : 10)}px;
  color: ${(props) => (!props.focused ? '#fff' : 'rgba(255,255,255,0.2)')};
  z-index: 10;
`;

Input.defaultProps = {
  placeholderTextColor: 'rgba(255,255,255,0.2)',
  selectionColor: Colors.snuberRed
};

type CustomInputProps = TextInputProps & {
  label: string;
  value: any;
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
  const [customFocus, setCustomFocus] = useState(false);
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
        autoFocus={customFocus}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onChangeText={(e) => setValue(field, e)}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
      ></Input>
    </View>
  );
};
