import { Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/hooks';
import { selectCounts } from '../../store/countsSlice';
import { selectOperations } from '../../store/operationsSlice';

const CustomSkeleton = () => {
  const counts = !!localStorage.getItem('count')
  const operations = !!localStorage.getItem('oper');
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
          alignItems={'center'}
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
        {!counts && (
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
            <SkeletonCircle size="30px" />
          </Flex>
        )}
        {counts && (
          <Flex
            padding="2"
            boxShadow="lg"
            bg="white"
            mt={2}
            ml={2}
            w={'fit-content'}
            borderRadius={'10px'}
            justifyContent={'space-between'}
            flexGrow={operations ? 1:0}
          >
            <Flex flexDirection={'column'}
              flexGrow={1}
            >
              <Flex 
              flexGrow={1}
              flexDirection={operations?'column':'row'}
              flexShrink={1}
              >
                <SkeletonText
                  mb={2}
                  noOfLines={1}
                  spacing="2"
                  skeletonHeight="60px"
                  w={'120px'}
                  alignSelf={'start'}
                />
                <Flex
                  flexDirection={'column'}
                  ml={4}
                  alignSelf={'center'}
                  mr={2}
                  h={'fit-content'}
                >
                  <SkeletonText
                    mb={2}
                    noOfLines={1}
                    spacing="2"
                    skeletonHeight="4"
                    w={'60px'}
                    alignSelf={'end'}
                  />
                  <SkeletonText
                    mb={2}
                    noOfLines={1}
                    spacing="2"
                    skeletonHeight="4"
                    w={'30px'}
                    alignSelf={'end'}
                  />
                </Flex>
              </Flex>
              <Flex justifyContent={'space-evenly'} justifySelf={'end'}>
                <SkeletonText
                  mb={2}
                  noOfLines={1}
                  spacing="2"
                  skeletonHeight="40px"
                  w={'40px'}
                  alignSelf={'end'}
                />
                <SkeletonText
                  mb={2}
                  noOfLines={1}
                  spacing="2"
                  skeletonHeight="40px"
                  w={'40px'}
                  alignSelf={'end'}
                />
                <SkeletonText
                  mb={2}
                  noOfLines={1}
                  spacing="2"
                  skeletonHeight="40px"
                  w={'40px'}
                  alignSelf={'end'}
                />
              </Flex>
            </Flex>
            <SkeletonCircle size="30px" />
          </Flex>
        )}

        {operations && (
          <>
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
                w={'80px'}
                alignSelf={'start'}
              />
              <SkeletonCircle size="190px" />
            </Flex>
            <Flex
              padding="2"
              boxShadow="lg"
              bg="white"
              flexGrow={1}
              mt={2}
              ml={2}
              w={'fit-content'}
              borderRadius={'10px'}
              justifyContent={'space-between'}
            >
              <SkeletonText
                mb={2}
                noOfLines={6}
                spacing="2"
                skeletonHeight="4"
                w={'200px'}
                alignSelf={'start'}
              />
              <SkeletonCircle size="190px" />
            </Flex>
          </>
        )}
      </Flex>
      <SkeletonText
        mt="2"
        noOfLines={1}
        spacing="4"
        skeletonHeight="84dvh"
        boxShadow="lg"
      />
    </>
  );
};

export default CustomSkeleton;
