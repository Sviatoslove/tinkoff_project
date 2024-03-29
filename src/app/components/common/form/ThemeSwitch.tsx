import { Flex, Switch, extendTheme, useColorMode } from '@chakra-ui/react';

const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon =
    colorMode === 'light'
      ? 'https://img.icons8.com/stickers/24w/bright-moon.png'
      : 'https://img.icons8.com/dusk/24/sun--v1.png';

  return (
    <Flex flexDirection={'column'} 
    alignSelf={'start'} 
    height={'100%'} ml={3}>
      <img src={icon} alt="logo" />
      <Switch size="sm" mt={2} onChange={toggleColorMode} />
    </Flex>
  );
};

export default ThemeSwitch;
