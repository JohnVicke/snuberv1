import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { animated, useSpring } from 'react-spring';

import { Colors } from '../utils/styles/colors';
import { Fonts } from '../utils/styles/fonts';
import { Dimensions, TouchableWithoutFeedback, View } from 'react-native';

const marginBottom = '10px';
const { height, width } = Dimensions.get('window');

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Heading = styled.Text`
  font-family: ${Fonts.PoppinsBold};
  color: ${Colors.white};
  font-size: 16px;
  letter-spacing: 1px;
  margin-bottom: ${marginBottom};
`;

const DissmissableArea = styled.TouchableOpacity`
  bottom: 0;
  z-index: 10;
  position: absolute;
  height: 100%;
  width: ${width}px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const AnimatedView = animated(View);

interface ModalProps {
  title: string;
  children: React.ReactNode;
  close(): void;
  fullSize?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  close,
  fullSize = false
}) => {
  const styleprops = useSpring({
    bottom: 0,
    from: { bottom: fullSize ? -height : -200 }
  });

  return (
    <DissmissableArea onPress={close}>
      <TouchableWithoutFeedback>
        <AnimatedView
          {...styleprops}
          style={{
            alignSelf: 'center',
            position: 'absolute',
            zIndex: 99,
            width: '100%',
            height: fullSize ? '100%' : 'auto',
            backgroundColor: Colors.blue,
            padding: 10
          }}
        >
          <HeaderContainer>
            <Heading>{title}</Heading>
            <Icon name="x" size={24} color={Colors.white} onPress={close} />
          </HeaderContainer>
          {children}
        </AnimatedView>
      </TouchableWithoutFeedback>
    </DissmissableArea>
  );
};
