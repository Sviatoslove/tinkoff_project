import { Divider, Flex, Text } from '@chakra-ui/react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListOperItem from './ListOperItem';
import { useFilters } from '../../context/useFilters';
import { IOperation } from '../../../models';

const ListOper = ({ date }: { date: string }) => {
  const { filteredOperations, searchCategory } = useFilters();

  const getJSXListOperItem = (operation: IOperation) => (
    <CSSTransition
      key={operation.createdAt}
      timeout={1100}
      classNames="listOperItem"
    >
      <ListOperItem operation={operation} />
    </CSSTransition>
  );

  return (
    <Flex
      w={'100%'}
      mb={3}
      direction={'column'}
      p={2}
      shadow={'forContainersWhite'}
      borderRadius={15}
    >
      <Text ml={10} as="b" fontSize="3xl" w={'fit-content'}>
        {date}
        <Divider mb={3} borderRadius={10} shadow={'forContainersWhite'} />
      </Text>
      <TransitionGroup>
        {filteredOperations?.map((operation) => {
          if (operation.date === date) {
            if (searchCategory) {
              if (operation.dataType !== 'topUpCount')
                return getJSXListOperItem(operation);
            } else return getJSXListOperItem(operation);
          }
        })}
      </TransitionGroup>
    </Flex>
  );
};

export default ListOper;
