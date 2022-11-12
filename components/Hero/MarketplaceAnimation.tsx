import { Image } from '@chakra-ui/react'

import { Flex, Box } from '@chakra-ui/react';

export const MarketplaceAnimation = () => {
  return (
    <Flex cursor='none'>
      <Box boxSize='sm'>
        <Image src="/celobanner.gif" alt='celopunk gif' />
      </Box>
    </Flex>
  );
};
