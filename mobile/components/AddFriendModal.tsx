import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { Button } from './Button';
import { Modal } from './Modal';
import { TextField } from './TextField';
import { useSendFriendRequestMutation } from '../generated/graphql';

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
            console.log(res);
          }
          close();
        }}
      >
        {({ handleBlur, handleSubmit, values, setFieldValue }) => (
          <View>
            <TextField
              label="Användarnamn"
              field="username"
              setValue={setFieldValue}
              onBlur={handleBlur('username')}
              value={values['username']}
            />
            <Button onPress={handleSubmit}>Skicka</Button>
          </View>
        )}
      </Formik>
    </Modal>
  );
};
