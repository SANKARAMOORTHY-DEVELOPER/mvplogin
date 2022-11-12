import { useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import AppContext from '@components/AppContext';
import { ConnectWalletMessage } from '@components/ConnectWalletMessage';
import { AccountBody } from '@components/Account/AccountBody';

export default function AccountPage() {
  const { account } = useContext(AppContext);

  if (!account) return <ConnectWalletMessage />;

  return (
    <Flex>
      <AccountBody />
    </Flex>
  );
}
