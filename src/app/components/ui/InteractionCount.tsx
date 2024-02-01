import { AddIcon, ArrowRightIcon, SunIcon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { useIteractionCount } from '../../hooks/useInteractionCount';

const InteractionCount = () => {
  const { colorMode } = useColorMode();
  const { handleClickCount } = useIteractionCount();

  const hover = {
    boxShadow: '3px 3px 4px 0px rgba(0, 0, 0, 0.6)',
    bg: 'transparent',
    color: 'white',
    borderWidth: '2px',
  };

  return (
    <ButtonGroup
      alignItems={'center'}
      h={'min-content'}
      w={'100%'}
      justifyContent={'space-evenly'}
    >
      <Tooltip hasArrow label="Оплатить" placement="right-start">
        <IconButton
          _hover={hover}
          maxW={{base: '100px', '2lg': '40px'}}
          w={'100%'}
          bg={'colorBtnAddOperation.' + colorMode}
          datatype="addOperation"
          onClick={handleClickCount}
          aria-label="Оплатить"
          icon={<SunIcon />}
        />
      </Tooltip>
      <Tooltip hasArrow label="Пополнить" placement="right-start">
        <IconButton
          _hover={hover}
          maxW={{base: '100px', '2lg': '40px'}}
          w={'100%'}
          bg={'colorBtnTopUpCount.' + colorMode}
          datatype="topUpCount"
          onClick={handleClickCount}
          aria-label="Пополнить"
          icon={<AddIcon />}
        />
      </Tooltip>
      <Tooltip hasArrow label="Перевести" placement="right-start">
        <IconButton
          _hover={hover}
          maxW={{base: '100px', '2lg': '40px'}}
          w={'100%'}
          bg={'colorBtnAddTranslate.' + colorMode}
          datatype="addTranslate"
          onClick={handleClickCount}
          aria-label="Перевести"
          icon={<ArrowRightIcon />}
        />
      </Tooltip>
    </ButtonGroup>
  );
};

export default InteractionCount;
