import { useContext, useState } from 'react';
import { Flex, Text, VStack, Button, Badge, Divider, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CalendarIcon, StarIcon } from '@chakra-ui/icons'
import { formatDate, formatPrice } from '@utils/helpfulFunctions';
import { MdAttachMoney } from 'react-icons/md'

import AppContext from '@components/AppContext';
import { MotionChakraImage } from '@components/Animated/MotionChakraImage';

export const ExploreNFTCard = ({ nft }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { account, fillOffer, NFTMarketplaceAddress } = useContext(AppContext);

  const { name, description, image, category, dateCreated, index, owner, offer } = nft;

  const buyHandler = async() => {
    setIsLoading(true);
    await fillOffer(offer.offerId, offer.price);
    setIsLoading(false);
    setTimeout(() => {
      router.push('/assets');
    }, 1000);
  };

  return (
    <Flex
      borderRadius='lg'
      minWidth='200px'
      flexDir='column'
      borderWidth='thin'
      shadow='lg'
      alignItems='center'
    >
      <Flex overflow='hidden' height='200px' borderTopRadius='lg'
            className='animate-on-hover'>
        <MotionChakraImage
          src={`https://ipfs.infura.io/ipfs/${image}`}
          alt='nft'
          cursor='pointer'
          onClick={() => {
            router.push({
              pathname: `/explore-nfts/${index}`,
              query: {
                owner: owner,
                tokenId: index,
                name: name,
                description: description,
                image: image,
                category: category,
                dateCreated: dateCreated
              },
            });
          }}
        />
      </Flex>
      <VStack spacing={4} my={4} alignItems='left'>
        <Text fontWeight='bold'>{name}</Text>
        <Text fontWeight='thin' textAlign='left' ml='2' mr='2' >
          <StarIcon/> Category: <Badge colorScheme='green'>{category}</Badge>
        </Text>
        {owner.toUpperCase() !== NFTMarketplaceAddress.toUpperCase() ?
          <Text fontWeight='thin' textAlign='left'>
            <Badge colorScheme='yellow'>Item hasn't put an offer yet</Badge>
            <br/><br/><br/>
          </Text>:
          (offer.user.toUpperCase() === account.toUpperCase()) ?
            <Text fontWeight='thin' textAlign='left'>
              <Badge colorScheme='yellow'>This is your NFT</Badge>
              <br/><br/><br/>
            </Text>:
            <>
              <Text fontWeight='thin' textAlign='left'>
                <Icon as={MdAttachMoney} /> Price: <Badge colorScheme='red'>{formatPrice(offer.price).toFixed(2)} Celo</Badge>
              </Text>
              <Button colorScheme='blue' variant='solid' size='sm'
                      isLoading={isLoading}
                      onClick={buyHandler}
                      >
                Buy Item
              </Button>
            </>
          }
        <Divider/>
        <Text fontWeight='thin' textAlign='left' ml='2' mr='2'>
          <CalendarIcon/> Created <Badge  colorScheme='blue'>{formatDate(dateCreated)}</Badge> ago
        </Text>
        </VStack>
    </Flex>
  );
};
