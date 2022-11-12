import { Image } from '@chakra-ui/react';

export const Logo = () => {
  return (
    <Image
      src='/celo_logo.svg'
      alt='Logo of CeloPunk NFT Auction'
      width={30}
      height={30}
      rounded='lg'
    />
  );
};
