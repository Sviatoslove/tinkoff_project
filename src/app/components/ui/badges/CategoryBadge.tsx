import { Badge, Text } from '@chakra-ui/react';
import { useFilters } from '../../../context/useFilters';
import { IDataForChart } from '../../../hooks/useAnalytics';
import { RubIcon1 } from '../../../../assets/currency';

const CategoryBadge = ({ bgColor, name, value, categoryId }: IDataForChart) => {
  const { searchCategory, handleDividerCategory } = useFilters();

  return (
    <Badge
      bg={bgColor}
      role="button"
      onClick={() => handleDividerCategory(categoryId)}
      variant={searchCategory === categoryId ? 'activeCategory' : 'category'}
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
