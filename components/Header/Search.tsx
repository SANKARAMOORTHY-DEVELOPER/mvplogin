import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export const Search = () => {
  return (
    <Flex width='lg'>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <FiSearch color='gray' />
        </InputLeftElement>

        <Input
          placeholder='Collection, item or user'
          size='md'
          _focus={{ shadow: 'lg' }}
        />
      </InputGroup>
    </Flex>
  );
};
