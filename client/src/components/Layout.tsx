import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Sidenav } from './sidenav/Sidenav';
import { Wrapper, WrapperVariant } from './Wrapper';

interface LayoutProps {
  variant?: WrapperVariant;
  active: string;
}

const Layout: React.FC<LayoutProps> = ({ active, variant, children }) => {
  return (
    <Flex>
      <Sidenav active={active} />
      <Box m={12} flex="1">
        <Wrapper variant={variant}>{children}</Wrapper>
      </Box>
    </Flex>
  );
};

export default Layout;
