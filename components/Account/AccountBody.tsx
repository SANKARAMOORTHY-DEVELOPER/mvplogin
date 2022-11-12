import { useContext } from 'react';
import {
  Flex,
  Text,
  Avatar,
  AvatarBadge,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import AppContext from '@components/AppContext';
import { CollectedNFTsTab } from './CollectedNFTsTab';
import { CollectSaleTab } from './CollectSaleTab';
import { TabHeaders } from './TabHeaders';
import { truncate } from '@utils/helpfulFunctions';

export const AccountBody = () => {
  const router = useRouter();
  const { query } = router;
  const { tab } = query;

  const { account } = useContext(AppContext);

  const renderTab = () => {
    if (!tab || tab === 'myassets') {
      return <CollectedNFTsTab />;
    }
    if (tab === 'collect') {
      return <CollectSaleTab />;
    }
  };

  return (
    <Flex flexDir='column' width='100vw' my='16px'>
      <Flex alignSelf='center' my='16px' flexDir='column' alignItems='center'>
        <Avatar size='lg' my='16px'>
          <AvatarBadge boxSize='1em' bg='green.500' />
        </Avatar>
        <Button variant='outline' maxWidth='300px'>
          <Text isTruncated fontSize='lg'>
            {truncate(account)}
          </Text>
        </Button>
      </Flex>

      <Flex flexDir='column'>
        <TabHeaders />
        <Divider />

        {renderTab()}
      </Flex>
    </Flex>
  );
};
