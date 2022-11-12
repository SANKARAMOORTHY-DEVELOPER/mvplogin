import { useColorMode, IconButton } from '@chakra-ui/react';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label='color mode toggle'
      icon={colorMode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
      onClick={toggleColorMode}
    />
  );
};
