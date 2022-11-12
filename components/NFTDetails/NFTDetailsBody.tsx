import { useEffect, useState, useContext } from 'react';
import {
  Flex,
  Text,
  Heading,
  Badge,
  Spacer,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CalendarIcon, StarIcon } from '@chakra-ui/icons'

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';
import AppContext from '@components/AppContext';

export const NFTDetailsBody = () => {
  const router = useRouter();
  const { query } = router;
  const {
    owner,
    tokenId,
    name,
    description,
    image,
    category,
    dateCreated
  }: any = query;
  const { account, getTrack} = useContext(AppContext);
  const [assetHistory, setAssetHistory] = useState([]);

  useEffect(() => {
    async function getAssetHistory() {
        const itemHistory = await getTrack(tokenId);
        setAssetHistory(itemHistory);
    }
    getAssetHistory();
}, []);
  
  return (
    <Flex flex={1} m='8'>
      <Flex flex={5} justifyContent='center'>
        <Flex
          boxSize='600px'
          overflow='hidden'
          justifyContent='center'
          alignItems='center'
          borderRadius='lg'
          shadow='lg'
        >
          <MotionChakraImage
            src={`https://ipfs.infura.io/ipfs/${image}`}
            alt='Collection banner'
            boxSize='600px'
          />
        </Flex>
      </Flex>
      <Flex
        flex={2}
        flexDir='column'
        p='8'
        borderWidth='thin'
        shadow='lg'
        borderRadius='lg'
      >
        <Heading>{name}</Heading>
        <Text my={4}>{description}</Text>
        <Text my={4} fontSize='lg' fontWeight='medium'>
          Owned By:
        </Text>
        <Badge alignSelf='flex-start' colorScheme='red'>
          {owner}
        </Badge>
        <Text my={4} fontSize='lg' fontWeight='medium'>
          Creator:
        </Text>
        <Badge alignSelf='flex-start' colorScheme='green'>
          {assetHistory[0]}
        </Badge>
        <Text my={4} fontSize='lg' fontWeight='medium'>
          <CalendarIcon/> Created at: {new Date(dateCreated).toLocaleDateString('en-US')}
        </Text>
        <Text fontSize='lg' fontWeight='medium'>
          <StarIcon/> Category: {category}
        </Text>
        <Spacer />
      </Flex>
    </Flex>
  );
};
