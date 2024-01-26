import { Badge, Flex, Text } from '@chakra-ui/react';
import ChartRound from '../../common/charts/ChartRound';
import { IDataAnalytics, useAnalytics } from '../../../context/useAnalytics';
import { RubIcon1 } from '../../../../assets/currency';

const ChartsBadge = ({ view, bg }: { view?: string; bg?: string }) => {
  const {getCategoriesBalances,
    getIncomeExpenses, handleDivideCategories } = useAnalytics();
  const title = !view ? 'Доходы минус расходы' : 'Расходы по категориям';
  const width = !view ? 'min-content' : 'fit-content';
  const data = !view ? getIncomeExpenses() : getCategoriesBalances(view)

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
        <Flex flexWrap={'wrap'}>
          {view &&
            data.slice(1).map(({ bgColor, name, value, categoryId }) => (
              <Badge
                bg={bgColor}
                key={name}
                borderRadius={15}
                mb={1}
                mr={1}
                w={'fit-content'}
                px={'4px'}
                display={'flex'}
                onClick={()=>handleDivideCategories(categoryId)}
                role='button'
              >
                <Text w={'fit-content'} color={'white'}>
                  {name}
                </Text>
                <Text w={'fit-content'} color={'black'} ml={2}>
                  {value}
                </Text>
                <img src={RubIcon1} width={'10px'} />
              </Badge>
            ))}
        </Flex>
      </Flex>
      <ChartRound data={data} />
    </Flex>
  );
};

export default ChartsBadge;
