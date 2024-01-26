import { Flex } from '@chakra-ui/react';
import ListOper from './ListOper';
import { useAppSelector } from '../../hooks/hooks';
import { selectDates } from '../../store/operationsSlice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const OperationsHistory = () => {
  const dates: any = useAppSelector(selectDates());

  return (
    <Flex
      mt={2}
      h={'100dvh'}
      borderRadius={15}
      shadow={'dark-lg'}
      alignItems={'center'}
      bg={'#2828283b'}
      p={2}
      direction={'column'}
      scrollBehavior={'auto'}
      overflowY={'auto'}
    >
      {!dates.length && <h1>У вас нет трат в этом месяце</h1>}
      <TransitionGroup className="listOperGroup">
        {!!dates.length &&
          dates.map((date: any) => (
            <CSSTransition key={date} timeout={1100} classNames="listOper">
              <ListOper date={date} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </Flex>
  );
};

export default OperationsHistory;
