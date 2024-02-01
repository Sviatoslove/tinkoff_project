import { Flex, Text, useStyleConfig } from '@chakra-ui/react';
import ChartRound from '../../common/charts/ChartRound';
import { IDataForChart, useAnalytics } from '../../../hooks/useAnalytics';
import CategoryBadge from './CategoryBadge';
import EmptyBadge from './EmptyBadge';

const ChartsBadge = ({ view}: { view?: string }) => {
  const data = useAnalytics(view);
  const FlexBadge = useStyleConfig('FlexBadge', { variant: view ? 'chartAll' : 'chartCategory' });
  // const data = [
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  //   {name: 'Еда', value: 2000, bgColor: '#6f42c1', categoryId: 'fOvwf0dgM804h2ixnLUjg'},
  // ]
  const emptyChart = !data.length;
  const title = view ? 'Доходы минус расходы' : 'Расходы по категориям';

  return (
    <Flex
      __css={FlexBadge}
    >
      <Flex
        flexDirection={'column'}
        h={'100%'}
        alignContent={'start'}
        flexGrow={1}
      >
        <Text
          fontWeight={'bold'}
          lineHeight={'15px'}
          mb={2}
          alignSelf="start"
          w={view ? 'min-content':'fit-content'}
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
