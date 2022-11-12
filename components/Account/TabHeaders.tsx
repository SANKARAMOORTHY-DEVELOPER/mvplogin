import { Flex } from '@chakra-ui/react';
import { TabHeader } from './TabHeader';

export const TabHeaders = () => {
  return (
    <Flex flexDir='row'>
      <TabHeader tabLabel='Your available NFTS' tabName='myassets' />
      <TabHeader tabLabel='Collect sale fund' tabName='collect' />
    </Flex>
  );
};
