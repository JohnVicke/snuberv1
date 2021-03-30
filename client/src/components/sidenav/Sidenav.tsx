import { Box, Flex, Heading } from '@chakra-ui/layout';
import React from 'react';
import { NavLink } from './SidenavLink';
import { SidenavLinkList } from './SidenavLinkList';

interface SidenavProps {}

const links: NavLink[] = [
  {
    active: false,
    text: 'Dashboard'
  },
  {
    active: false,
    text: 'Users'
  }
];

export const Sidenav: React.FC<SidenavProps> = ({}) => {
  return (
    <Flex
      position="sticky"
      bg="gray.900"
      maxW={250}
      padding={4}
      height="100vh"
      direction="column"
      align="center"
    >
      <Heading mt={20} fontSize="5xl" letterSpacing={4} color="red.400">
        snuber
      </Heading>
      <Box mt={40}>
        <SidenavLinkList links={links} />
      </Box>
    </Flex>
  );
};
