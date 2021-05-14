import React from 'react';
import { Dimensions } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import styled from 'styled-components/native';

import { Colors } from '../utils/styles/colors';
import { Fonts } from '../utils/styles/fonts';

const { width, height } = Dimensions.get('window');

const LoadingView = styled.View`
  display: flex;
  height: ${height}px;
  width: ${width}px;
  background-color: ${Colors.snuberRed};
`;

const LoadingText = styled.Text`
  font-family: ${Fonts.PoppinsBold};
  margin-top: 20px;
  color: ${Colors.snuberRed};
`;

interface LoadingSpinnerProps {
  visible: boolean;
  text: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  visible,
  text
}) => {
  return (
    <LoadingView>
      <AnimatedLoader
        visible={visible}
        overlayColor={Colors.darkBlue}
        source={require('../assets/loader/loader.json')}
        animationStyle={{
          height: 200,
          width: 200
        }}
        speed={1}
      >
        <LoadingText>{text}!</LoadingText>
      </AnimatedLoader>
    </LoadingView>
  );
};
