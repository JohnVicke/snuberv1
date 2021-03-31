import React from 'react';
import { ComponentWithAs, IconProps, Text, Link } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import NextLink from 'next/link';

export type NavLink = {
  active: boolean;
  Icon?: ComponentWithAs<'svg', IconProps>;
  text: string;
  href: string;
};

interface SidenavLinkProps {
  sidenavLink: NavLink;
}

export const SidenavLink: React.FC<SidenavLinkProps> = ({
  sidenavLink: { active, Icon, text, href }
}) => {
  return (
    <NextLink href={href}>
      <Link>
        <Flex alignItems="center" py={2}>
          {Icon && <Icon mr={2} />}
          <Text>{text}</Text>
        </Flex>
      </Link>
    </NextLink>
  );
};
