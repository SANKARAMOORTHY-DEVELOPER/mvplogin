import { useContext, useState } from 'react';
import { Flex, Text, Button, Input, Stack, Badge, Divider, Icon } from '@chakra-ui/react';
import { CalendarIcon, StarIcon } from '@chakra-ui/icons'
import { MdAttachMoney } from 'react-icons/md'

import AppContext from '@components/AppContext';
import { MotionChakraImage } from '@components/Animated/MotionChakraImage';
import { formatDate } from '@utils/helpfulFunctions';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import { formatPrice } from '@utils/helpfulFunctions'
export const CollectedNFTCard = ({ nft }) => {
  const router = useRouter();
  const { account, makeOffer, cancelOffer } = useContext(AppContext);
  const [price, setPrice] = useState();
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { name, description, image, category, dateCreated, index, owner, offer } = nft;


  const makeOfferHandler = async() => {
    await setIsLoading(true);
    const enteredPrice = await Web3.utils.toWei(price, 'ether');
    await makeOffer(index, enteredPrice);
    await setIsLoading(false);
    setTimeout(() => {
      router.push('/assets');
    }, 1000);
  };

  const cancelHandler = async() => {
    setIsLoadingCancel(true);
    await cancelOffer(offer.offerId)
    await setIsLoadingCancel(false);
    setTimeout(() => {
      router.push('/assets');
    }, 1000);
  }

  return (
    <Flex
      borderRadius='lg'
      flexDir='column'
      shadow='lg'
      // alignItems='left'
      className='animate-on-hover'
      cursor='pointer'>
      <Flex overflow='hidden' height='100%' borderTopRadius='lg'
      onClick={() => {
        router.push({
          pathname: `/assets/${index}`,
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
      }}>
        <MotionChakraImage src={`https://ipfs.infura.io/ipfs/${image}`} alt='nft' />
      </Flex>
      <Stack spacing='4' my='4' alignItems='left' ml='2' mr='2'>
        <Text fontWeight='bold' fontSize='lg'>
          {name}
        </Text>
        <Text fontWeight='thin' textAlign='left' ml='2' mr='2' >
          <StarIcon/> Category: <Badge colorScheme='green'>{category}</Badge>
        </Text>
        {owner.toUpperCase() !== account.toUpperCase() ? // check if on sale
        <Stack direction='column' spacing={2} align='left'>
          <Text fontWeight='thin' textAlign='left'>
            <Icon as={MdAttachMoney} /> Price: <Badge colorScheme='red'>{formatPrice(offer.price).toFixed(2)} Celo</Badge>
          </Text>
          <Button colorScheme='red' variant='solid' size='sm'
                  onClick={cancelHandler}
                  isLoading={isLoadingCancel}
                  >
            Cancel Offer
          </Button>
        </Stack>:
        <>
        <Text fontWeight='thin' textAlign='left'>
          This is your item, you can put it on sale
        </Text>
        <Stack direction='row' spacing={2} align='center'>
          <Button colorScheme='blue' variant='solid' size='sm'
                onClick={makeOfferHandler}
                isLoading={isLoading}
                >
            Offer
          </Button>
          <Input type='tel'
                placeholder='Celo ...'
                size='sm'
                value={price}
                onChange={(event:any) => setPrice(event.target.value)}
          />
        </Stack>
        </>}
        <Divider/>
        <Text fontWeight='thin' textAlign='left' ml='2' mr='2'>
          <CalendarIcon/> Created <Badge  colorScheme='blue'>{formatDate(dateCreated)}</Badge> ago
        </Text>
      </Stack>
    </Flex>
  );
};
