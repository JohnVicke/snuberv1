import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { NavLink, SidenavLink } from './SidenavLink';

interface SidenavLinkListProps {
  links: NavLink[];
}

export const SidenavLinkList: React.FC<SidenavLinkListProps> = ({ links }) => {
  return (
    <Flex direction="column">
      {links.map((link: NavLink, i) => (
        <SidenavLink key={`${link.href + i}`} sidenavLink={link} />
      ))}
    </Flex>
  );
};
