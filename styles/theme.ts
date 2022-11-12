// theme.ts

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    500: '#FFD600',
  },
};

const components = {
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: 'none',
      },
    },
    defaultProps: {
      colorScheme: 'gray',
      variant: 'ghost',
    },
  },
  Input: {
    defaultProps: {
      // focusBorderColor: 'brand.500',
    },
  },
};

// 3. extend the theme
const theme = extendTheme({ config, components, colors });

export default theme;
