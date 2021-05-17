import { LocationAccuracy, watchPositionAsync } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { BottomBar } from '../components/BottomBar';
import { CustomMarker } from '../components/CustomMarker';
import { EmergencyMenu } from '../components/EmergencyMenu';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SnuberMarker, useMarkersQuery } from '../generated/graphql';
import {
  AddMarker,
  PopulateMarkersFromStore
} from '../redux/actions/markerActions';
import { MarkerState } from '../redux/reducers/markerReducer';
import { UserState } from '../redux/reducers/userReducers';
import { RootState } from '../redux/store';
import DayMap from '../utils/styles/customMapStyleDay.json';
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
  const [emergencyMenuOpen, setEmergencyMenuOpen] = useState(false);
  const { data, loading } = useMarkersQuery();

  const dispatch = useDispatch();

  const darkTheme = useSelector<RootState, UserState['darkTheme']>(
    (state: RootState) => state.user.darkTheme
  );

  const { markers } = useSelector<RootState, MarkerState>(
    (state: RootState) => state.markers
  );

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

  useEffect(() => {
    if (!!data?.markers) {
      const action: PopulateMarkersFromStore = {
        type: 'POPULATE_MARKERS_FROM_STORE',
        payload: data.markers as SnuberMarker[]
      };
      dispatch(action);
    }
  }, [!!data?.markers]);

  if (!location || error) {
    return (
      <View>
        <LoadingSpinner
          visible={!location || !!error}
          text="Hämtar din plats åt Bill Gates"
        />
      </View>
    );
  }

  const addUserMarkerCallback = (title: string) => {
    const marker = {
      latLng: { latitude: location.latitude, longitude: location.longitude },
      title
    };
    const action: AddMarker = {
      type: 'ADD_MARKER',
      payload: marker
    };
    dispatch(action);
  };

  return (
    <RootFlex>
      <Map
        initialRegion={location}
        customMapStyle={darkTheme ? NightMap : DayMap}
        showsUserLocation
      >
        {markers.map((marker: SnuberMarker) => (
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
