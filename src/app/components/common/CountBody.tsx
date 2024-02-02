import { Flex, Image, Text } from '@chakra-ui/react';
import CountAvatar from './CountAvatar';
import { ICount } from '../../../models';
import { getDivideMoney } from '../../utils/getDivideMoney';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { relative } from 'path';

const CountBody = ({
  position,
  counts,
  isLessThan671,
}: {
  position: string | any;
  counts: ICount[];
  isLessThan671: boolean;
}) => {
  const marginBottom = position ? '16px' : '4px';
  const balance = [counts[0].balance];

  return (
    <Flex
      alignSelf={'end'}
      fontWeight={'bold'}
      justifyContent={'end'}
      m={{ base: `0 4px ${marginBottom}` }}
      mb={marginBottom}
      flexGrow={1}
      display={{ base: 'flex', '2sm': 'grid', '2lg': 'flex' }}
      flexDirection={'column'}
      h={{ base: '100%', '2sm': 100 }}
      w={'100%'}
      fontSize={{ base: '20px', '2sm': '40px', '2lg': '20px' }}
    >
      {isLessThan671 && (
        <CountAvatar position={position} icon={counts[0].icon} />
      )}
      <Text
        textAlign={'center'}
        mb={1}
        lineHeight={{ base: '30px', '2sm': '60px', '2lg': '13px' }}
        alignSelf={{ base: 'center', '2sm': 'end', '2lg': 'center' }}
      >
        {counts[0].name}
      </Text>
      <Flex
        justifyContent={'center'}
        minW={{ '2lg': 100 }}
        w={'100%'}
        ml={2}
        justifySelf={'center'}
        position={'relative'}
      >
        <TransitionGroup>
        {balance.map((item) => (
          <CSSTransition key={item}
          timeout={5000}
          classNames="balance"
          >
          <Text fontSize={22} lineHeight={'20px'} mr={1} whiteSpace={'nowrap'} >
            {getDivideMoney(item)}
          </Text>
        </CSSTransition>
        ))}
        </TransitionGroup>
        <Image src={counts[0].currency} w={22} />
      </Flex>
    </Flex>
  );
};

export default CountBody;
