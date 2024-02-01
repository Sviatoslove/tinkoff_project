import { Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const UserPageSkeletonUserBadge = () => {
  return (
    <Flex
      padding="6"
      boxShadow="whiteAndLightBlue"
      bg="grey"
      borderRadius={15}
      w={'fit-content'}
    >
      <SkeletonCircle size="120px" mr={10} />
      <Flex flexDirection={'column'} h={'100%'} alignContent={'end'}>
        <SkeletonText
          display={'flex'}
          noOfLines={1}
          spacing="2"
          skeletonHeight="10"
          w={'198px'}
          flexGrow={1}
          alignContent={'center'}
          flexWrap={'wrap'}
        />
        <SkeletonText
          noOfLines={1}
          spacing="10"
          skeletonHeight="5"
          w={'57px'}
          style={{ alignSelf: 'end' }}
        />
      </Flex>
    </Flex>
  );
};

export default UserPageSkeletonUserBadge;
