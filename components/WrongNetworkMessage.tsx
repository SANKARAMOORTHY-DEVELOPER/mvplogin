import { Center, Text, VStack, Heading, Button } from '@chakra-ui/react';

export const WrongNetworkMessage = () => {
  return (
    <Center height='100vh'>
      <VStack spacing='4'>
        <Heading>Wrong Network.</Heading>
        <Text>You are not on Celo alfajores Network.</Text>
        <Button variant='solid'>Change Network</Button>
      </VStack>
    </Center>
  );
};
