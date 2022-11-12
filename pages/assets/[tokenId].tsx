import { useContext } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { NFTDetailsBody } from '@components/NFTDetails/NFTDetailsBody';
import { WrongNetworkMessage } from '@components/WrongNetworkMessage';
import { ConnectWalletMessage } from '@components/ConnectWalletMessage';
import AppContext from '@components/AppContext';

export default function NFTPage() {
  const { account } = useContext(AppContext);

  if (!account) return <ConnectWalletMessage />;

  return (
    <Flex>
      <NFTDetailsBody />
    </Flex>
  );
}
