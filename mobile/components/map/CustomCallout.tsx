import React from 'react';
import { Callout } from 'react-native-maps';
import styled from 'styled-components/native';
import { Svg, Image as ImageSvg } from 'react-native-svg';

import { Fonts } from '../../utils/styles/fonts';
import { Colors } from '../../utils/styles/colors';
import { SnuberMarker } from '../../generated/graphql';
import { Button } from '.././Button';

const Heading = styled.Text`
  font-family: ${Fonts.PoppinsBold};
  color: ${Colors.white};
  font-size: 16px;
  letter-spacing: 1px;
`;

const CalloutView = styled.View`
  width: 300px;
  min-height: 300px;
  background-color: ${Colors.darkBlue};
  border-radius: 10px;
  padding: 10px;
`;

const Buttons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface CustomCalloutProps {
  calloutData: Omit<SnuberMarker, 'latLng'>;
}

export const CustomCallout: React.FC<CustomCalloutProps> = ({
  calloutData
}) => {
  return (
    <Callout tooltip>
      <CalloutView>
        <Heading>{calloutData?.title}</Heading>
        <Buttons>
          <Button width={135} onPress={() => {}} outlined>
            Chatta
          </Button>
          <Button width={135} onPress={() => {}}>
            Visa rutt
          </Button>
        </Buttons>
      </CalloutView>
    </Callout>
  );
};
