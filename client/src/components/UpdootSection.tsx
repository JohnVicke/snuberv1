import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');

  return (
    <Flex align="center" direction="column" justifyContent="center" pr={4}>
      <IconButton
        variant="outline"
        color={post.voteStatus === 1 ? 'green.400' : undefined}
        isLoading={loadingState === 'updoot-loading'}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState('updoot-loading');
          await vote({ postId: post.id, value: 1 });
          setLoadingState('not-loading');
        }}
        aria-label="updoot"
        icon={<ChevronUpIcon />}
      />

      {post.points}

      <IconButton
        variant="outline"
        color={post.voteStatus === -1 ? 'red.400' : undefined}
        isLoading={loadingState === 'downdoot-loading'}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState('downdoot-loading');
          await vote({ postId: post.id, value: -1 });
          setLoadingState('not-loading');
        }}
        aria-label="downdoot"
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};
