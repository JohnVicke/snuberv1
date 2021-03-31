import { Box, Flex, Heading } from '@chakra-ui/layout';
import React from 'react';
import { DashBoardIcon } from '../../icons/DashboardIcon';
import { UsersIcon } from '../../icons/UsersIcon';
import { NavLink } from './SidenavLink';
import { SidenavLinkList } from './SidenavLinkList';

interface SidenavProps {
  active: string;
}

const links: NavLink[] = [
  {
    active: false,
    text: 'Dashboard',
    Icon: DashBoardIcon,
    href: '/dashboard'
  },
  {
    active: false,
    text: 'Users',
    Icon: UsersIcon,
    href: '/users'
  }
];

export const Sidenav: React.FC<SidenavProps> = ({ active }) => {
  links.map((link) =>
    link.href === '/' + active ? (link.active = true) : link
  );

  return (
    <Flex
      position="sticky"
      bg="gray.900"
      maxW={250}
      padding={4}
      width="100%"
      height="100vh"
      direction="column"
      align="center"
    >
      <Heading mt={10} fontSize="5xl" color="red.400" fontWeight="regular">
        snuber
      </Heading>
      <Box mt={40}>
        <SidenavLinkList links={links} />
      </Box>
    </Flex>
  );
};
