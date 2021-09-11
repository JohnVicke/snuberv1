import { LocationAccuracy, watchPositionAsync } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import styled from 'styled-components/native';
import { AddFriendModal } from '../components/modals/AddFriendModal';
import { BottomBar } from '../components/BottomBar';
import { CustomMarker } from '../components/map/CustomMarker';
import { EmergancyModal } from '../components/modals/EmergencyModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Profile } from '../components/modals/ProfileModal';
import { ProfileButton } from '../components/ProfileButton';
import {
  SnuberMarker,
  useIncomingFriendRequestsQuery,
  useMarkersQuery,
  useNewMarkerSubscription
} from '../generated/graphql';
import { bottomBarHeight } from '../utils/styles/constants';
import NightMap from '../utils/styles/customMapStyleNight.json';

const Map = styled(MapView)`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height - bottomBarHeight}px;
`;

const RootFlex = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DELTA = 0.003;

const MODALS = {
  addFriend: {
    open: false
  },
  emergency: {
    open: false
  },
  profile: {
    open: false
  }
};

export const MapScreen: React.FC = ({}) => {
  const [location, setLocation] = useState<Region | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [modalStatus, setModalStatus] = useState(MODALS);
  const [combinedMarkers, setCombinedMarkers] = useState<SnuberMarker[]>([]);

  const {
    loading: newMarkerLoading,
    data: newMarkerData,
    error: newMarkerError,
    variables
  } = useNewMarkerSubscription();

  const { data: friendRequests, loading: loadingFriendRequests } =
    useIncomingFriendRequestsQuery({
      fetchPolicy: 'network-only'
    });

  const { data: markersData, loading } = useMarkersQuery({
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (markersData) {
      setCombinedMarkers(markersData.markers);
    }
  }, [markersData?.markers]);

  useEffect(() => {
    console.log('hello world');
    if (newMarkerData?.newMarker) {
      setCombinedMarkers([...combinedMarkers, newMarkerData.newMarker]);
    }
  }, [newMarkerData]);

  console.log('New marker!!', newMarkerData?.newMarker);

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
          visible={!location || !!error || loading}
          text="Hämtar din plats åt Bill Gates"
        />
      </View>
    );
  }

  const closeModal = (key: string) => {
    return () => setModalStatus({ ...modalStatus, [key]: { open: false } });
  };

  const openModal = (key: string) => {
    return () => setModalStatus({ ...modalStatus, [key]: { open: true } });
  };

  return (
    <RootFlex>
      <Map
        initialRegion={location}
        customMapStyle={NightMap}
        showsUserLocation
        showsCompass={false}
        showsMyLocationButton={false}
        followsUserLocation
      >
        {combinedMarkers.map((marker: SnuberMarker) => (
          <CustomMarker key={marker.id} marker={marker} />
        ))}
      </Map>

      {friendRequests?.incomingFriendRequests && (
        <ProfileButton
          friendRequests={
            friendRequests?.incomingFriendRequests.length > 0 &&
            friendRequests.incomingFriendRequests.length
          }
          openProfileModal={openModal('profile')}
        />
      )}

      {modalStatus.emergency.open && (
        <EmergancyModal
          latitude={location.latitude}
          longitude={location.longitude}
          close={closeModal('emergency')}
        />
      )}

      {modalStatus.addFriend.open && (
        <AddFriendModal close={closeModal('addFriend')} />
      )}

      {modalStatus.profile.open && <Profile close={closeModal('profile')} />}

      <BottomBar
        openEmergencyModal={openModal('emergency')}
        openAddFriendModal={openModal('addFriend')}
      />
    </RootFlex>
  );
};
