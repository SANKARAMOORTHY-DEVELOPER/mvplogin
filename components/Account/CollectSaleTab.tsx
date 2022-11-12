import { useContext, useEffect, useState } from 'react';
import {
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Button
} from '@chakra-ui/react';
import { MdAccountBalanceWallet } from 'react-icons/md'
import { formatPrice } from '@utils/helpfulFunctions'
import AppContext from '@components/AppContext';


export const CollectSaleTab = () => {
  const { userFund, claimFunds } = useContext(AppContext);
  const [fund, setFund] = useState();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetch = async () => {
      let money = await userFund();
      setFund(formatPrice(money).toFixed(2))
    };
    fetch();
  }, [userFund]);

  const claimFundHandler = async() => {
    setIsLoading(true);
    await claimFunds();
    setIsLoading(false);
  }

  const Feature = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };


  return (
    <Flex m='16'>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Vault
          </Text>
          <Heading>Collect your money</Heading>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
            <Feature
              icon={
                <Icon as={MdAccountBalanceWallet} color={'green.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={"Your sale balance: " + fund + " Celo"}
            />
            <Button colorScheme='blue' variant='solid' size='sm' maxWidth={100}
                isLoading={isLoading}
                onClick={claimFundHandler}
                >
            Claim fund
          </Button>
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src='./collect-vault.jpeg'
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};
