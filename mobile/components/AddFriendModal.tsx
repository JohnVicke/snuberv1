import { Formik } from 'formik';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from './Button';
import { Modal } from './Modal';
import { TextField } from './TextField';

interface AddFriendModalProps {
  close(): void;
}

export const AddFriendModal: React.FC<AddFriendModalProps> = ({ close }) => {
  return (
    <Modal title="Lägg till vän" close={close}>
      <Formik
        initialValues={{ username: '' }}
        onSubmit={async (values, { setErrors }) => {
          const user = {
            title: values.username
          };
          console.log(user);
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
