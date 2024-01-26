import { Search2Icon } from '@chakra-ui/icons';
import { Icon, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';

const SearchInput = () => {
  return (
    <InputGroup size="sm" mt={2}>
      <Input placeholder="Выписка по счёту" borderRadius={10} shadow={'lg'} />
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
