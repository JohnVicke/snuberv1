import {
  ImagePickerResult,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions
} from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

import { Colors } from '../utils/styles/colors';
import { Fonts } from '../utils/styles/fonts';
import { Button } from './Button';

const marginBottom = '10px';

const MenuContainer = styled.ScrollView`
  align-self: center;
  position: absolute;
  z-index: 999;
  width: ${Dimensions.get('window').width - 20}px;
  bottom: 100px;
  background-color: ${Colors.blue};
  border-radius: 10px;
  padding: 20px;
`;

const ButtonContainer = styled.View`
  margin-bottom: ${marginBottom};
`;

const Heading = styled.Text`
  font-family: ${Fonts.PoppinsBold};
  color: ${Colors.white};
  font-size: 16px;
  letter-spacing: 1px;
  margin-bottom: ${marginBottom};
`;

const TextInput = styled.TextInput`
  letter-spacing: 1px;
  color: #fff;
  min-height: 30px;
  width: 100%;
  background-color: ${Colors.darkBlue};
  border-radius: 10px;
  padding: 10px;
  font-family: ${Fonts.PoppinsRegular};
  line-height: 20px;
  margin-bottom: ${marginBottom};
`;

const ImagePickingArea = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  border-radius: 10px;
  background-color: ${Colors.darkBlue};
  margin-bottom: ${marginBottom};
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

interface EmergencyMenuProps {
  open: boolean;
  close(): void;
}

export const EmergencyMenu: React.FC<EmergencyMenuProps> = ({ close }) => {
  const [reason, setReason] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const onChangeReason = (text: string) => setReason(text);

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
    <MenuContainer>
      <Heading>Nödanrop!</Heading>
      <TextInput
        placeholderTextColor={'rgba(255,255,255,0.2)'}
        onChangeText={onChangeReason}
        selectionColor={Colors.snuberRed}
        value={reason}
        placeholder="Varför har du slut igen??"
        multiline={true}
      />
      {!image ? (
        <ImagePickingArea onPress={pickImage}>
          <ImagePickerIcon name="upload" size={50} />
          <ImagePickerText>Välj en bild...</ImagePickerText>
        </ImagePickingArea>
      ) : (
        <PickedImage source={{ uri: image }} />
      )}
      <ButtonContainer>
        <Button onPress={close}>Skicka</Button>
      </ButtonContainer>
    </MenuContainer>
  );
};
