import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import { Button } from '../Button';
import { Modal } from './Modal';
import { TextField } from '../TextField';
import { useSendFriendRequestMutation } from '../../generated/graphql';

interface AddFriendModalProps {
  close(): void;
}

export const AddFriendModal: React.FC<AddFriendModalProps> = ({ close }) => {
  const [sendFriendRequest, { data, loading }] = useSendFriendRequestMutation();

  return (
    <Modal title="Lägg till vän" close={close}>
      <Formik
        initialValues={{ username: '' }}
        onSubmit={async (values, { setErrors }) => {
          if (values.username) {
            const res = await sendFriendRequest({
              variables: { username: values.username }
            });
            if (res.data?.sendFriendRequest) {
              return close();
            }
            setErrors({ username: 'Användarnamn existerar inte' });
          }
        }}
      >
        {({ handleBlur, handleSubmit, values, setFieldValue, errors }) => (
          <View>
            <TextField
              label="Användarnamn"
              field="username"
              setValue={setFieldValue}
              onBlur={handleBlur('username')}
              value={values['username']}
              error={errors.username}
            />
            <Button onPress={handleSubmit}>Skicka</Button>
          </View>
        )}
      </Formik>
    </Modal>
  );
};
