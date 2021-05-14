import { LatLng } from 'react-native-maps';

export type SnuberMarker = {
  id: string;
  title: string;
  description: string;
  latlng: LatLng;
};
