import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const TabHeader = ({ tabLabel, tabName }) => {
  const router = useRouter();
  const { query } = router;
  const { tab = 'myassets' } = query;

  return (
    <Flex
      flexDir='column'
      cursor='pointer'
      p='4'
      onClick={() => {
        router.push(
          { pathname: '/assets', query: { tab: tabName } },
          undefined,
          { shallow: true }
        );
      }}
    >
      <Text fontWeight={tab === tabName ? 'medium' : 'normal'} fontSize='lg'>
        {tabLabel}
      </Text>
      {tab === tabName && (
        <Flex height='3px' bgColor='brand.500' borderRadius='lg' />
      )}
    </Flex>
  );
};
