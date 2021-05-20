import { gql } from '@apollo/client';
import {
  getLastKnownPositionAsync,
  LocationAccuracy,
  watchPositionAsync
} from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import styled from 'styled-components/native';
import { BottomBar } from '../components/BottomBar';
import { CustomMarker } from '../components/CustomMarker';
import { EmergencyMenu } from '../components/EmergencyMenu';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  MarkersQuery,
  SnuberMarker,
  useCreateMarkerMutation,
  useMarkersQuery
} from '../generated/graphql';
import NightMap from '../utils/styles/customMapStyleNight.json';

const Map = styled(MapView)`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height - 90}px;
`;

const RootFlex = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DELTA = 0.003;

export const MapScreen: React.FC = ({}) => {
  const [location, setLocation] = useState<Region | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const { data: markersData, loading } = useMarkersQuery({
    fetchPolicy: 'network-only'
  });
  const [emergencyMenuOpen, setEmergencyMenuOpen] = useState(false);

  const openEmergencyMenu = () => {
    setEmergencyMenuOpen(!emergencyMenuOpen);
  };

  const closeEmergencyMenu = () => {
    setEmergencyMenuOpen(false);
  };

  useEffect(() => {
    (async () => {
      await watchPositionAsync(
        { accuracy: LocationAccuracy.High },
        ({ coords: { latitude, longitude } }) => {
          setLocation({
            latitude,
            longitude,
            longitudeDelta: DELTA,
            latitudeDelta: DELTA
          });
        }
      );
    })();
  }, []);

  if (!location || error || !markersData?.markers) {
    return (
      <View>
        <LoadingSpinner
          visible={!location || !!error}
          text="Hämtar din plats åt Bill Gates"
        />
      </View>
    );
  }

  return (
    <RootFlex>
      <Map initialRegion={location} customMapStyle={NightMap} showsUserLocation>
        {markersData.markers.map((marker: SnuberMarker) => (
          <CustomMarker key={marker.id} marker={marker} />
        ))}
      </Map>
      {emergencyMenuOpen && (
        <EmergencyMenu
          latitude={location.latitude}
          longitude={location.longitude}
          open={emergencyMenuOpen}
          close={closeEmergencyMenu}
        />
      )}
      <BottomBar openEmergencyMenu={openEmergencyMenu} />
    </RootFlex>
  );
};
