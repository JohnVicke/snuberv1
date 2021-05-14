import { LocationAccuracy, watchPositionAsync } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { BottomBar } from '../components/BottomBar';
import { EmergencyMenu } from '../components/EmergencyMenu';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MarkerState } from '../redux/reducers/markerReducer';
import { UserState } from '../redux/reducers/userReducers';
import { RootState } from '../redux/store';
import DayMap from '../utils/styles/customMapStyleDay.json';
import NightMap from '../utils/styles/customMapStyleNight.json';
import { SnuberMarker } from '../utils/types/Snuber';

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

  const darkTheme = useSelector<RootState, UserState['darkTheme']>(
    (state: RootState) => state.user.darkTheme
  );

  const { userMarker, friendMarkers } = useSelector<RootState, MarkerState>(
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

  if (!location || error) {
    return (
      <View>
        <LoadingSpinner
          visible={!location || !!error}
          text="Hämtar din plats åt bill gates"
        />
      </View>
    );
  }

  return (
    <RootFlex>
      <Map
        initialRegion={location}
        customMapStyle={darkTheme ? NightMap : DayMap}
        showsUserLocation
      >
        {friendMarkers &&
          friendMarkers.map((marker: SnuberMarker, index: number) => {
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />;
          })}

        {userMarker && (
          <Marker
            key={1000}
            coordinate={userMarker.latlng}
            title={userMarker.title}
            description={userMarker.description}
          />
        )}
      </Map>
      {emergencyMenuOpen && (
        <EmergencyMenu open={emergencyMenuOpen} close={closeEmergencyMenu} />
      )}
      <BottomBar openEmergencyMenu={openEmergencyMenu} />
    </RootFlex>
  );
};
