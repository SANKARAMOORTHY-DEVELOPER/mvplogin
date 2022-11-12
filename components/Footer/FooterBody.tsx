import { Flex, Text } from '@chakra-ui/react';

export const FooterBody = () => {
  return (
    <Flex mx='auto' mt='32' mb='8' ml='16px' alignItems='center'>
      <Text fontSize='sm' fontWeight='thin'>
        *Content displayed are mocks from real world examples and used for
        demonstrative purposes only.
      </Text>
    </Flex>
  );
};
