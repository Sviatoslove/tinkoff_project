import {
  Button,
  Flex,
  Icon,
  Image,
  Text,
  useColorMode,
  useMediaQuery,
  useStyleConfig,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/hooks';
import { selectCounts } from '../../../store/countsSlice';
import { AddIcon } from '@chakra-ui/icons';
import InteractionCount from '../InteractionCount';
import { useIteractionCount } from '../../../hooks/useInteractionCount';
import { selectOperations } from '../../../store/operationsSlice';
import { getDivideMoney } from '../../../utils/getDivideMoney';
import UserBadgeForMain from './UserBadgeForMain';
import { selectUser } from '../../../store/userSlice';

const CountsBadge = () => {
  const [isLessThan671] = useMediaQuery('(max-width: 671px)');
  const FlexBadge = useStyleConfig('FlexBadge', { variant: 'counts' });
  const user = useAppSelector(selectUser());
  const counts = useAppSelector(selectCounts());
  const operations = useAppSelector(selectOperations());
  const { handleClickCount } = useIteractionCount();
  const position = operations ? 'absolute' : undefined;
  const marginBottom = position ? 4 : 1;

  return (
    <Flex __css={FlexBadge}>
      <Flex
        position={'relative'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={2}
        w={'100%'}
        h={'100%'}
        data-countid={counts && counts[0].id}
        data-balance={counts && counts[0].balance}
      >
        {isLessThan671 && <UserBadgeForMain user={user} />}
        {counts && (
          <>
            {!isLessThan671 && (
              <Flex
                position={{ base: position, '2md': undefined, '2lg': position }}
                top={1}
                left={1}
                maxW={{ base: '60px', '2md': '200px', '2lg': '100px' }}
                w={'100%'}
              >
                <img className="imgCount" src={counts[0].icon} />
              </Flex>
            )}

            <Flex
              alignSelf={'end'}
              fontWeight={'bold'}
              justifyContent={'end'}
              mb={marginBottom}
              flexGrow={1}
              display={{ base: 'flex', '2sm': 'grid', '2lg': 'flex' }}
              flexDirection={'column'}
              h={{base: '100%', '2sm':100}}
              w={'100%'}
              fontSize={{ base: '20px', '2sm': '40px', '2lg': '20px' }}
            >
              {isLessThan671 && (
                <Flex
                  position={{
                    base: undefined,
                    '2sm': position,
                    '2md': undefined,
                    '2lg': position,
                  }}
                  top={1}
                  left={1}
                  m={{base: '0 4px', '1sm': '0 auto'}}
                  maxW={{ base: '100px', '2sm': '60px', '2md': '200px', '2lg': '100px' }}
                  w={'100%'}

                >
                  <img className="imgCount" src={counts[0].icon} />
                </Flex>
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
              >
                <Text
                  fontSize={22}
                  lineHeight={'20px'}
                  mr={1}
                  whiteSpace={'nowrap'}
                >
                  {getDivideMoney(counts[0].balance)}
                </Text>
                <Image src={counts[0].currency} w={22} />
              </Flex>
            </Flex>
          </>
        )}

        {!counts && (
          <Text fontWeight={'bold'} alignSelf={'end'} whiteSpace={'nowrap'}>
            Добавьте свой первый счёт
          </Text>
        )}

        <Button
          datatype="countsCreate"
          alignSelf={'start'}
          borderRadius={100}
          p={1}
          w={'32px'}
          h={'32px'}
          borderWidth={3}
          borderColor={'#06ff06'}
          boxShadow={
            '0px 0px 10px 2px rgb(228 255 0), 0px 0px 0px 2px rgb(0 0 0) inset'
          }
          _hover={{
            boxShadow:
              '0px 0px 0px 2px rgb(0 0 0), 0px 0px 15px 2px #06ff06 inset',
            color: 'red',
            borderWidth: 0,
          }}
          _active={{
            borderWidth: 10,
            color: 'white',
          }}
          onClick={handleClickCount}
        >
          <Icon as={AddIcon} />
        </Button>
      </Flex>
      {counts && <InteractionCount />}
    </Flex>
  );
};

export default CountsBadge;
