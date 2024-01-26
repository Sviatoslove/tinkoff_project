import { Flex } from '@chakra-ui/react';
import ChartRound from '../../common/charts/ChartRound';

const ChartsBadge = ({ view }: { view?: string }) => {
  const title = view ? 'Доходы минус расходы' : 'Расходы по категориям' 
  return (
    <Flex
      bg="yellow"
      px="10px"
      py="7px"
      alignItems={'center'}
      borderRadius={'10px'}
      w={'fit-content'}
      mt={2}
      ml={2}
    >
      <ChartRound title={title} view={view} />
    </Flex>
  );
};

export default ChartsBadge;
