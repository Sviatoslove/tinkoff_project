import { Badge, Text } from '@chakra-ui/react';
import { useFilters } from '../../../context/useFilters';
import { IDataForChart } from '../../../hooks/useAnalytics';
import { RubIcon1 } from '../../../../assets/currency';

const CategoryBadge = ({ bgColor, name, value, categoryId }: IDataForChart) => {
  const { searchCategory, handleDividerCategory } = useFilters();
  const activeBadge =
    '0px 0px 0px 4px rgb(255 219 0 / 62%), 0px 0px 4px 3px rgb(0 255 10)';

  return (
    <Badge
      bg={bgColor}
      borderRadius={15}
      mb={2}
      mr={2}
      w={'fit-content'}
      px={'4px'}
      display={'flex'}
      onClick={() => handleDividerCategory(categoryId)}
      role="button"
      shadow={
        searchCategory === categoryId
          ? activeBadge
          : '0px 0px 8px 2px rgb(0 0 0), 0px 0px 8px 6px rgb(255 255 255)'
      }
    >
      <Text w={'fit-content'} color={'white'}>
        {name}
      </Text>
      <Text w={'fit-content'} color={'gold'} ml={2}>
        {value}
      </Text>
      <img src={RubIcon1} width={'10px'} />
    </Badge>
  );
};

export default CategoryBadge;
