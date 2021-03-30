import React from 'react';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';

export type NavLink = {
  active: boolean;
  Icon?: React.FC;
  text: string;
};

interface SidenavLinkProps {
  sidenavLink: NavLink;
}

export const SidenavLink: React.FC<SidenavLinkProps> = ({
  sidenavLink: { active, Icon, text }
}) => {
  console.log(active);
  return (
    <Flex>
      {Icon && <Icon />}
      <Text>{text}</Text>
    </Flex>
  );
};
