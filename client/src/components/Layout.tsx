import React from 'react';
import { Sidenav } from './sidenav/Sidenav';
import { Wrapper, WrapperVariant } from './Wrapper';

interface LayoutProps {
  variant?: WrapperVariant;
}

const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <>
      <Sidenav />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
