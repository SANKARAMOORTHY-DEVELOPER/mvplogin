import { Flex, HStack, Heading, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { MarketplaceAnimation } from './MarketplaceAnimation';

export const HeroBody = () => {
  const router = useRouter();

  return (
    <Flex mx='auto' mt='16'>
      <Flex
        flexDir='column'
        flex={1}
      >
        <Heading>Discover, collect, and sell extraordinary NFTs</Heading>
        <Heading as='h2' fontSize='xl' fontWeight='medium' mt={8} mb={4}>
          <Text as={'span'} color={'green.400'}
          fontWeight={800}
          >CeloPunk Auction</Text> is the first CryptoPunk marketplace on Celo chain. 
          *Dacade.org demo*
        </Heading>
          *Support alfajores celo testnet. ChainId: 44787
        <HStack alignSelf='flex-start' mt='16' spacing='4'>
          <Button
            size='lg'
            shadow='lg'
            variant='solid'
            colorScheme='messenger'
            onClick={() => {
              router.push('/explore-nfts');
            }}
          >
            Explore
          </Button>
          <Button
            size='lg'
            onClick={() => {
              router.push('/mint-nft');
            }}
          >
            Create
          </Button>
        </HStack>
      </Flex>

      <Flex flex={1} justifyContent='center'>
        <MarketplaceAnimation />
      </Flex>
    </Flex>
  );
};
