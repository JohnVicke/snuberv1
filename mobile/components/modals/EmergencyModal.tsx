import { launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';
import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { Formik } from 'formik';

import { Colors } from '../../utils/styles/colors';
import { Fonts } from '../../utils/styles/fonts';
import { Modal } from './Modal';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { MarkersQuery, useCreateMarkerMutation } from '../../generated/graphql';
import { gql } from '@apollo/client';

const marginBottom = '10px';

const ImagePickingArea = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  border-radius: 10px;
  background-color: ${Colors.darkBlue};
  margin-bottom: ${marginBottom};
  margin-top: 10px;
`;

const PickedImage = styled.Image`
  margin-bottom: ${marginBottom};
  width: 100%;
  height: 200px;
  border-radius: 10px;
`;

const ImagePickerIcon = styled(Icon)`
  margin-bottom: ${marginBottom};
  color: ${Colors.snuberRed};
`;

const ImagePickerText = styled.Text`
  font-family: ${Fonts.PoppinsRegular};
  color: ${Colors.snuberRed};
  letter-spacing: 1px;
`;

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

interface EmergencyModalProps {
  close(): void;
  latitude: number;
  longitude: number;
}

export const EmergancyModal: React.FC<EmergencyModalProps> = ({
  close,
  latitude,
  longitude
}) => {
  const [reason, setReason] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const onChangeReason = (text: string) => setReason(text);

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

  const pickImage = async () => {
    const result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Modal title="Nödanrop!" close={close}>
      <Formik
        initialValues={{ title: '' }}
        onSubmit={async (values, { setErrors }) => {
          const marker = {
            latitude,
            longitude,
            title: values.title
          };
          const res = await addMarker({
            variables: marker
          });
          close();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue
        }) => (
          <View>
            <TextField
              label="Varför har du slut igen??"
              field="title"
              setValue={setFieldValue}
              onBlur={handleBlur('password')}
              value={values['title']}
            />
            {!image ? (
              <ImagePickingArea onPress={pickImage}>
                <ImagePickerIcon name="upload" size={50} />
                <ImagePickerText>Välj en bild...</ImagePickerText>
              </ImagePickingArea>
            ) : (
              <PickedImage source={{ uri: image }} />
            )}
            <Button onPress={handleSubmit}>Skicka</Button>
          </View>
        )}
      </Formik>
    </Modal>
  );
};
