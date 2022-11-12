import { useEffect, useContext, useState } from 'react';
import { Flex, Heading, SimpleGrid, Center, Spinner, Divider } from '@chakra-ui/react';

import AppContext from '@components/AppContext';
import { ExploreNFTCard } from './ExploreNFTCard';
import { MotionChakraImage } from '@components/Animated/MotionChakraImage';

export const ExploreNFTsBody = () => {
  const { account, getOwnerNFT } = useContext(AppContext);
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    const fetch = async() => {
      const nfts = await getOwnerNFT();
      const sortDateNfts = await nfts.reverse((a, b) => {return a.index - b.index});
      setMarketItems(sortDateNfts)
    };
    fetch();
  }, []);

  const renderMarketItems = () => {
    if (marketItems.length === 0) {
      return (
        <Center width='100vw' my='48'>
          <Spinner />
        </Center>
      );
    } else {
      return (
        <Flex m='16'>
          <SimpleGrid columns={5} spacing={6}>
            {marketItems.map((nft) => {
              console.log(nft)
              return (
                <ExploreNFTCard key={nft.index} nft={nft} />
              );
            })}
          </SimpleGrid>
        </Flex>
      );
    }
  };

  return (
    <Flex flexDir='column' alignItems='center' mx='8' my='8'>
      <SimpleGrid columns={2} spacing={12} my='6' height='140px' minChildWidth="10%">
        <Flex
          overflow='hidden'
          justifyContent='center'
          alignItems='center'
          borderTopRadius='lg'
          borderWidth='thin'
          shadow='lg'
          className='animate-on-hover'
        >
          <MotionChakraImage
            src='/celopunk_banner.png'
            alt='Collection banner'
          />
        </Flex>
        <Flex
          overflow='hidden'
          justifyContent='center'
          alignItems='center'
          borderTopRadius='lg'
          borderWidth='thin'
          shadow='lg'
          className='animate-on-hover'
        >
          <MotionChakraImage
            src='/moopunk_banner.png'
            alt='Collection banner'
          />
        </Flex>
      </SimpleGrid>
      <Divider />
      <Heading>Browse All NFTs</Heading>
      {renderMarketItems()}
    </Flex>
  );
};
