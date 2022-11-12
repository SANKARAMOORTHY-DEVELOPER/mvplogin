import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Logo } from './Logo';

export const LogoButton = () => {
  const router = useRouter();

  return (
    <Flex alignItems='center'>
      <Logo />
      <Button
        onClick={() => {
          router.push('/');
        }}
        variant='unstyled'
        marginX='2'
        fontSize='2xl'
        fontWeight='extrabold'
      >
        CeloPunk Auction
      </Button>
    </Flex>
  );
};
