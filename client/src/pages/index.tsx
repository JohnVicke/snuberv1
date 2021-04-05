import { withUrqlClient } from 'next-urql';
import Layout from '../components/Layout';
import { createUrqlClient } from '../utils/createUrqlClient';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePostsQuery } from '../generated/graphql';
import { useState } from 'react';
import { UpdootSection } from '../components/UpdootSection';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as string | null
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables
  });

  if (!fetching && !data) {
    return (
      <>
        <div>Query failed</div>
        <div>{error?.message}</div>
      </>
    );
  }

  return (
    <Layout active="">
      <Flex mb={8} align="center">
        <Text fontSize="xl">Posts</Text>
        <NextLink href="/create-post">
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => (
            <Flex p={5} shadow="md" borderWidth="1px" key={p.id + p.title}>
              <UpdootSection post={p} />
              <Box>
                <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                  <Link>
                    <Heading fontSize="xl">{p.type}</Heading>
                  </Link>
                </NextLink>
                <Text>Posted by: {p.creator.username}</Text>
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            isLoading={fetching}
            m="auto"
            my={8}
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt
              })
            }
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
