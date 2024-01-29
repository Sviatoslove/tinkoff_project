import { Flex, Text } from "@chakra-ui/react";

const EmptyBadge = () => {
  return ( 
    <Flex
    justifySelf={'center'}
    flexDirection={'column'}
  >
    <Text>При добавлении покупок создайте категорию</Text>
    <img
      src="https://img.icons8.com/arcade/140/categorize.png"
      alt="categories"
      style={{margin: '0 auto'}}
    />
  </Flex>
   );
}
 
export default EmptyBadge;