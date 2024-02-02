import {
  Button,
  Flex,
  Icon,
  Image,
  Text,
  useMediaQuery,
  useStyleConfig,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/hooks';
import { selectCounts } from '../../../store/countsSlice';
import { AddIcon } from '@chakra-ui/icons';
import InteractionCount from '../InteractionCount';
import { useIteractionCount } from '../../../hooks/useInteractionCount';
import { selectOperations } from '../../../store/operationsSlice';
import UserBadgeForMain from './UserBadgeForMain';
import { selectUser } from '../../../store/userSlice';
import CountAvatar from '../../common/CountAvatar';
import CountBody from '../../common/CountBody';

const CountsBadge = () => {
  const [isLessThan671] = useMediaQuery('(max-width: 671px)');
  const { handleClickCount } = useIteractionCount();
  const FlexBadge = useStyleConfig('FlexBadge', { variant: 'counts' });
  const user = useAppSelector(selectUser());
  const counts = useAppSelector(selectCounts());
  const operations = useAppSelector(selectOperations());
  const position = operations ? 'absolute' : undefined;

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
              <CountAvatar position={position} icon={counts[0].icon} />
            )}
            <CountBody
              position={position}
              counts={counts}
              isLessThan671={isLessThan671}
            />
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
