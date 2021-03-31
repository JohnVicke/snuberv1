import { withUrqlClient } from 'next-urql';
import Layout from '../components/Layout';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePostsQuery } from '../generated/graphql';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout active="">
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
      <Heading>hello world</Heading>
      <Text fontFamily="PacificoRegular">Hello</Text>
      <NextLink href="/create-post">
        <Link>create post</Link>
      </NextLink>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
