import { Heading } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import { usePostQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId == -1,
    variables: {
      id: intId
    }
  });
  if (fetching) {
    return (
      <Layout active="">
        <div>Loading...</div>
      </Layout>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  if (!data?.post) {
    return <div>no posts...</div>;
  }
  return (
    <Layout active="">
      <Heading>{data.post.creator.username}</Heading>
      {data.post.type}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
