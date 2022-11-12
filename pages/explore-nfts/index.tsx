import { useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import { ExploreNFTsBody } from '@components/ExploreNFTs/ExploreNFTsBody';
import { WrongNetworkMessage } from '@components/WrongNetworkMessage';
import { ConnectWalletMessage } from '@components/ConnectWalletMessage';
import AppContext from '@components/AppContext';

export default function ExploreNFTsPage() {
  const { account } = useContext(AppContext);

  if (!account) return <ConnectWalletMessage />;

  return (
    <Flex>
      <ExploreNFTsBody />
    </Flex>
  );
}
