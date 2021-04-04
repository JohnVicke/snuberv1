import { Box } from '@chakra-ui/react';
import React from 'react';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = '' }) => {
  const getMaxW = (): string | number => {
    switch (variant) {
      case 'small':
        return 400;
      case 'regular':
        return 800;
      default:
        return '100%';
    }
  };

  return (
    <Box mx="auto" maxW={getMaxW()} w="100%" mt={8}>
      {children}
    </Box>
  );
};
