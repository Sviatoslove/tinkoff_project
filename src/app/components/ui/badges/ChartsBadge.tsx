import { Flex, Text } from '@chakra-ui/react';
import ChartRound from '../../common/charts/ChartRound';
import { IDataForChart, useAnalytics } from '../../../hooks/useAnalytics';
import CategoryBadge from './CategoryBadge';
import EmptyBadge from './EmptyBadge';

const ChartsBadge = ({ view, bg }: { view?: string; bg?: string }) => {
  const data = useAnalytics(view);
  const emptyChart = !data.length;
  const title = view ? 'Доходы минус расходы' : 'Расходы по категориям';
  const width = view ? 'min-content' : 'fit-content';

  return (
    <Flex
      bg={bg}
      px="10px"
      py="7px"
      alignItems={'center'}
      borderRadius={'10px'}
      flexGrow={view ? 0 : 1}
      mt={2}
      ml={2}
    >
      <Flex
        flexDirection={'column'}
        h={'100%'}
        alignContent={'flex-start'}
        flexGrow={1}
      >
        <Text
          fontWeight={'bold'}
          lineHeight={'15px'}
          mb={2}
          alignSelf="start"
          w={width}
        >
          {title}
        </Text>
        <Flex
          flexWrap={'wrap'}
          w={'100%'}
          justifyContent={emptyChart ? 'center' : 'start'}
        >
          {!view &&
            !emptyChart &&
            data.map((category: IDataForChart) => (
              <CategoryBadge {...category} key={category.name} />
            ))}
          {!data.length && <EmptyBadge />}
        </Flex>
      </Flex>
      <ChartRound data={data} />
    </Flex>
  );
};

export default ChartsBadge;
