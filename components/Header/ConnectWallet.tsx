import { useEffect, useState, useContext } from 'react';
import { Flex, Button, Text, Avatar, AvatarBadge, Menu, MenuList, MenuButton, MenuItem, Divider, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import AppContext from '@components/AppContext';
import { truncate } from '@utils/helpfulFunctions';
import { SettingsIcon } from '@chakra-ui/icons'
import { MdLogout, MdAnalytics, MdAccountCircle, MdAccountBalanceWallet } from 'react-icons/md'
import { formatBigNumber } from '@utils/helpfulFunctions'

export const ConnectWallet = () => {
  const { account, connectWallet, disconnectWallet, totalBalance } = useContext(AppContext);
  const [balance, setBalance] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      const ba = await totalBalance();
      setBalance(formatBigNumber(ba.CELO))
    };
    fetch();
  }, [account]);

  const renderConnectButton = () => {
    if (account) {
      return (
        <Menu>
          <MenuButton as={Button}>
            <Button
              width='140px'
              rightIcon={
                <Avatar size='xs'>
                  <AvatarBadge boxSize='1em' bg='green.500' />
                </Avatar>
              }
            >
              <Text>{truncate(account)}</Text>
            </Button>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={
              ()=> window.open(`https://alfajores-blockscout.celo-testnet.org/address/${account}/transactions`, "_blank")
            }>
              <Icon as={MdAnalytics} /> &nbsp; Track transactions
            </MenuItem>
            <MenuItem  onClick={() => {
                router.push(
                  `/assets`
                );
              }}
            >
              <Icon as={MdAccountCircle} />&nbsp; My assets
            </MenuItem>
            <MenuItem >
              <Icon as={MdAccountBalanceWallet} />&nbsp; Balance: {balance} CELO
            </MenuItem>
            <MenuItem onClick={
              ()=> window.open(`https://celo.org/developers/faucet`, "_blank")
            }>
              <SettingsIcon/>&nbsp; Alfajores testnet faucet
            </MenuItem>
            <Divider/>
            <MenuItem onClick={disconnectWallet}>
              <Icon as={MdLogout} /> &nbsp; Logout
            </MenuItem>
          </MenuList>
        </Menu>
      );
    } else {
      return (
        <Button onClick={connectWallet} width='140px'>
          Connect Wallet
        </Button>
      );
    }
  };
  return <Flex>{renderConnectButton()}</Flex>;
};
