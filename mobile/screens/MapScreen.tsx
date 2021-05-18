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

const GET_ALL_MARKERS = gql`
  query Markers {
    markers {
      latLng {
        latitude
        longitude
      }
      title
      updatedAt
      creatorId
      id
    }
  }
`;

export const MapScreen: React.FC = ({}) => {
  const [location, setLocation] = useState<Region | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const { data: markersData, loading } = useMarkersQuery({
    fetchPolicy: 'network-only'
  });
  const [addMarker] = useCreateMarkerMutation({
    update(cache, { data }) {
      const newMarkerFromRes = data?.createMarker.marker;
      const existingMarkers = cache.readQuery<MarkersQuery>({
        query: GET_ALL_MARKERS
      });

      if (existingMarkers && newMarkerFromRes) {
        cache.writeQuery({
          query: GET_ALL_MARKERS,
          data: {
            markers: [...existingMarkers.markers, newMarkerFromRes]
          }
        });
      }
    }
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

  const addUserMarkerCallback = async (title: string) => {
    const marker = {
      latitude: location.latitude,
      longitude: location.longitude,
      title
    };
    // Merge cache instead of refetching!!
    const res = await addMarker({
      variables: marker
    });
  };

  return (
    <RootFlex>
      <Map initialRegion={location} customMapStyle={NightMap} showsUserLocation>
        {markersData.markers.map((marker: SnuberMarker) => (
          <CustomMarker key={marker.id} marker={marker} />
        ))}
      </Map>
      {emergencyMenuOpen && (
        <EmergencyMenu
          open={emergencyMenuOpen}
          close={closeEmergencyMenu}
          addUserMarker={addUserMarkerCallback}
        />
      )}
      <BottomBar openEmergencyMenu={openEmergencyMenu} />
    </RootFlex>
  );
};
