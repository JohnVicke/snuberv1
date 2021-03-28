import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useEffect } from 'react';
import { InputField } from '../components/InputField';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import Layout from '../components/Layout';

const CreatePost: React.FC<{}> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace('/login');
    }
  }, [fetching, data, router]);

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', type: '' }}
        onSubmit={async (values) => {
          const { error } = await createPost({ options: values });
          if (!error) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />
            <Box mt={4}>
              <InputField name="type" placeholder="Type" label="Type" />
            </Box>
            <Button
              mt={4}
              type="submit"
              variant="solid"
              background="teal"
              isLoading={isSubmitting}
            >
              Create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
