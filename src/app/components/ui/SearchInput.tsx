import { Search2Icon } from '@chakra-ui/icons';
import { Icon, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { useFilters } from '../../context/useFilters';

const SearchInput = () => {
  const { handleChangeSearchQuery } = useFilters();
  return (
    <InputGroup size="sm" mt={2}>
      <Input
        placeholder="Выписка по счёту"
        borderRadius={10}
        shadow={'lg'}
        onChange={handleChangeSearchQuery}
      />
      <InputRightAddon
        borderTopRightRadius={10}
        borderBottomRightRadius={10}
        shadow={'lg'}
      >
        <Icon as={Search2Icon} />
      </InputRightAddon>
    </InputGroup>
  );
};

export default SearchInput;
