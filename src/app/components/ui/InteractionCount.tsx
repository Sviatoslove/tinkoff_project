import { AddIcon, ArrowRightIcon, SunIcon } from '@chakra-ui/icons';
import { ButtonGroup, IconButton, Tooltip } from '@chakra-ui/react';
import { useIteractionCount } from '../../hooks/useInteractionCount';

const InteractionCount = () => {
  const {handleClickCount} = useIteractionCount()

  const hover = {
    boxShadow:'3px 3px 4px 0px rgba(0, 0, 0, 0.6)', bg: 'transparent', color:'white'
  }

  return (
    <ButtonGroup
      alignItems={'center'}
      h={'min-content'}
      justifyContent={'space-evenly'}
    >
      <Tooltip hasArrow label="Оплатить" placement='right-start'>
        <IconButton _hover={hover} bg={'#52cf52'} datatype='addOperation' onClick={handleClickCount} aria-label="Оплатить" icon={<SunIcon />} />
      </Tooltip>
      <Tooltip hasArrow label="Пополнить" placement='right-start'>
        <IconButton _hover={hover} bg={'#cd748c'} datatype='topUpCount' onClick={handleClickCount} aria-label="Пополнить" icon={<AddIcon />} />
      </Tooltip>
      <Tooltip hasArrow label="Перевести" placement='right-start'>
        <IconButton _hover={hover} bg={'#7876e1'} datatype='addTranslate' onClick={handleClickCount} aria-label="Перевести" icon={<ArrowRightIcon />} />
      </Tooltip>
    </ButtonGroup>
  );
};

export default InteractionCount;