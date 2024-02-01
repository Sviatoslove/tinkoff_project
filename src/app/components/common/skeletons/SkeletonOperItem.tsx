import { Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const SkeletonOperItem = () => {
  return (
    <Flex
      padding="2"
      boxShadow="lg"
      bg="#2828283b"
      mt={2}
      w={'100%'}
      h={'46px'}
      borderRadius={'10px'}
      justifyContent={'space-between'}
      shadow={'2px 2px 4px 0px rgb(255 209 209), 1px 1px 4px 2px rgb(255 209 209)'}
    >
      <SkeletonText
        flexGrow={1}
        startColor="#ffff00"
        endColor="#00ffff"
        noOfLines={1}
        alignSelf={'center'}
        skeletonHeight="4"
        mr={4}
      />
      <SkeletonText
        flexGrow={2}
        startColor="#ffff00"
        endColor="#00ffff"
        noOfLines={1}
        alignSelf={'center'}
        skeletonHeight="4"
        mr={4}
        w={'20%'}
      />
      <SkeletonText
        flexGrow={4}
        startColor="#ffff00"
        endColor="#00ffff"
        noOfLines={1}
        alignSelf={'center'}
        skeletonHeight="4"
        mr={4}
        w={'20%'}
      />
      <Flex flexGrow={2} justifyContent={'center'}>
        <SkeletonText
          startColor="#ffff00"
          endColor="#00ffff"
          noOfLines={1}
          alignSelf={'center'}
          skeletonHeight="4"
          w={'120px'}
        />
        <SkeletonCircle
          ml={2}
          startColor="#ffff00"
          endColor="#00ffff"
          size="30px"
        />
      </Flex>
      <SkeletonText
        startColor="#ffff00"
        endColor="#00ffff"
        noOfLines={1}
        alignSelf={'center'}
        skeletonHeight="30px"
        w={'30px'}
      />
    </Flex>
  );
};

export default SkeletonOperItem;
