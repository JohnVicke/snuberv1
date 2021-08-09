import React from 'react';
import { Marker } from 'react-native-maps';
import styled from 'styled-components/native';

import { SnuberMarker } from '../generated/graphql';
import DosaPNG from '../assets/dosa.png';
import { CustomCallout } from './CustomCallout';

const MARKER_WIDTH = 24;
const MARKER_HEIGHT = 24;

const Dosa = styled.Image`
  height: ${MARKER_HEIGHT}px;
  width: ${MARKER_WIDTH}px;
`;

const getCenterOffsetForAnchor = (
  anchor: { x: number; y: number },
  markerWidth: number,
  markerHeight: number
): { x: number; y: number } => ({
  x: markerWidth * 0.5 - markerWidth * anchor.x,
  y: markerHeight * 0.5 - markerHeight * anchor.y
});

const anchor = {
  x: 0.25,
  y: 0.55
};
const centerOffset = getCenterOffsetForAnchor(
  anchor,
  MARKER_WIDTH,
  MARKER_HEIGHT
);

interface SnuberMarkerProps {
  marker: SnuberMarker;
}

export const CustomMarker: React.FC<SnuberMarkerProps> = ({
  marker: { latLng, ...rest }
}) => {
  return (
    <Marker coordinate={latLng} anchor={anchor} centerOffset={centerOffset}>
      <Dosa source={DosaPNG} />
      <CustomCallout calloutData={rest} />
    </Marker>
  );
};
