import { Divider, Flex, Text } from '@chakra-ui/react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListOperItem from './ListOperItem';
import { useFilters } from '../../context/useFilters';

const ListOper = ({ date }: { date: string }) => {
  const {filteredOperations} = useFilters()

  return (
    <Flex
      w={'100%'}
      mb={3}
      direction={'column'}
      p={2}
      shadow={
        '2px 2px 4px 0px rgb(255 255 255), 1px 1px 4px 2px rgb(251 251 251)'
      }
      borderRadius={15}
    >
      <Text ml={10} as="b" fontSize="3xl" w={'fit-content'}>
        {date}
      <Divider mb={3} borderRadius={10} shadow={
        '2px 2px 4px 0px rgb(255 255 255), 1px 1px 4px 2px rgb(251 251 251)'
      }/>
      </Text>
      <TransitionGroup>
        {filteredOperations?.map((operation) => {
          if (operation.date === date)
            return (
              <CSSTransition
                key={operation.createdAt}
                timeout={1100}
                classNames="listOperItem"
              >
                <ListOperItem operation={operation} />
              </CSSTransition>
            );
        })}
      </TransitionGroup>
    </Flex>
  );
};

export default ListOper;
