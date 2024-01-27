import { Badge, Flex, Text } from '@chakra-ui/react';
import ChartRound from '../../common/charts/ChartRound';
import { IDataForChart, useAnalytics } from '../../../hooks/useAnalytics';
import { RubIcon1 } from '../../../../assets/currency';
import { useFilters } from '../../../context/useFilters';

const ChartsBadge = ({ view, bg }: { view?: string; bg?: string }) => {
  const data = useAnalytics(view);
  const { searchCategory, handleDividerCategory } = useFilters();
  const title = view ? 'Доходы минус расходы' : 'Расходы по категориям';
  const width = view ? 'min-content' : 'fit-content';
  const activeBadge = '0px 0px 0px 4px rgb(255 219 0 / 62%), 0px 0px 4px 3px rgb(0 255 10)'

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
          {!view &&
            data
              .slice(1)
              .map(({ bgColor, name, value, categoryId }: IDataForChart) => (
                <Badge
                  bg={bgColor}
                  key={name}
                  borderRadius={15}
                  mb={2}
                  mr={2}
                  w={'fit-content'}
                  px={'4px'}
                  display={'flex'}
                  onClick={() => handleDividerCategory(categoryId)}
                  role="button"
                  shadow={searchCategory === categoryId ? activeBadge : '0px 0px 8px 2px rgb(0 0 0), 0px 0px 8px 6px rgb(255 255 255)'}
                >
                  <Text w={'fit-content'} color={'white'}>
                    {name}
                  </Text>
                  <Text w={'fit-content'} color={'gold'} ml={2}>
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
