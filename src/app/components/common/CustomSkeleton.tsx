import { Box, Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const CustomSkeleton = () => {
  return (
    <>
      <SkeletonText
        mt="2"
        noOfLines={1}
        spacing="4"
        skeletonHeight="8"
        boxShadow="lg"
      />
      <Flex>
      <Flex
        padding="2"
        boxShadow="lg"
        bg="white"
        mt={2}
        w={'200px'}
        borderRadius={'10px'}
      >
        <SkeletonCircle size="60px" />
        <SkeletonText
          mt="2"
          ml={3}
          noOfLines={2}
          spacing="2"
          skeletonHeight="4"
          w={'80px'}
        />
      </Flex>
      <Flex
        padding="2"
        boxShadow="lg"
        bg="white"
        mt={2}
        ml={2}
        w={'fit-content'}
        borderRadius={'10px'}
        justifyContent={'space-between'}
      >
        <SkeletonText
          mb={2}
          noOfLines={1}
          spacing="2"
          skeletonHeight="4"
          w={'210px'}
          alignSelf={'end'}
        />
        <SkeletonCircle size="30px"   />
      </Flex>
      </Flex>
    </>
  );
};

export default CustomSkeleton;
