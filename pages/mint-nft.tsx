import { useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import AppContext from '@components/AppContext';
import { ConnectWalletMessage } from '@components/ConnectWalletMessage';
import { MintNFTBody } from '@components/MintNFT/MintNFTBody';

export default function MintNFTPage() {
  const { account } = useContext(AppContext);

  if (!account) return <ConnectWalletMessage />;

  return (
    <Flex>
      <MintNFTBody />
    </Flex>
  );
}
