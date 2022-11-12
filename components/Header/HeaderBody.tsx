import { useState, useEffect } from 'react';
import {
  HStack,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { ColorModeToggle } from './ColorModeToggle';
import { LogoButton } from './LogoButton';
import { Search } from './Search';
import { ConnectWallet } from './ConnectWallet';

export const HeaderBody = () => {
  const router = useRouter();

  return (
    <HStack p='4' spacing='4'>
      <LogoButton />
      <Spacer />
      <Search />

      <Button
        onClick={() => {
          router.push('/explore-nfts');
        }}
      >
        Explore
      </Button>

      <Button
        onClick={() => {
          router.push('/assets');
        }}
      >
        My Assets
      </Button>
      <Button
        onClick={() => {
          router.push('/mint-nft');
        }}
      >
        Mint NFT
      </Button>
      <ColorModeToggle />
      <ConnectWallet />
    </HStack>
  );
};
