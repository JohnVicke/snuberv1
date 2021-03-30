import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { NavLink, SidenavLink } from './SidenavLink';

interface SidenavLinkListProps {
  links: NavLink[];
}

export const SidenavLinkList: React.FC<SidenavLinkListProps> = ({ links }) => {
  return (
    <Flex direction="column">
      {links.map((link: NavLink) => (
        <SidenavLink sidenavLink={link} />
      ))}
    </Flex>
  );
};
