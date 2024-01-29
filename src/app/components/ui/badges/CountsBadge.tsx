import { Button, Flex, Icon, Image, Text, useColorMode } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/hooks';
import { selectCounts } from '../../../store/countsSlice';
import { AddIcon } from '@chakra-ui/icons';
import InteractionCount from '../InteractionCount';
import { useIteractionCount } from '../../../hooks/useInteractionCount';
import { selectOperations } from '../../../store/operationsSlice';

const CountsBadge = () => {
  const { colorMode } = useColorMode();
  const counts = useAppSelector(selectCounts());
  const operations = useAppSelector(selectOperations());
  const { handleClickCount } = useIteractionCount();
  const position = operations ? 'absolute' : undefined;
  const marginBottom = position ? 4: 1;

  return (
    <Flex
      direction={'column'}
      bg={'colorBadgeCounts.' + colorMode}
      px="10px"
      py="7px"
      borderRadius={'10px'}
      w={'fit-content'}
      mt={2}
      ml={2}
    >
      <Flex
        alignItems={'center'}
        position={'relative'}
        mb={2}
        h={'100%'}
        data-countid={counts && counts[0].id}
        data-balance={counts && counts[0].balance}
      >
        {counts && (
          <>
            <Flex position={position}
            top={1} left={1}
            >
              <img
                className="imgCount"
                src={counts[0].icon}
                width={100}
                height={100}
              />
            </Flex>
            <Flex direction={'column'} alignSelf={'end'} fontWeight={'bold'} mb={marginBottom}>
              <Text textAlign={'center'} mb={1} lineHeight={'13px'}>
                {counts[0].name}
              </Text>
              <Flex justifyContent={'center'} w={100} ml={2}>
                <Text fontSize={22} lineHeight={'20px'}>
                  {counts[0].balance}
                </Text>
                <Image src={counts[0].currency} w={22} />
              </Flex>
            </Flex>
          </>
        )}

        {!counts && (
          <Text fontWeight={'bold'} alignSelf={'end'}>
            Добавьте свой первый счёт
          </Text>
        )}

        <Button
          datatype="countsCreate"
          alignSelf={'start'}
          borderRadius={100}
          p={1}
          w={'32px'}
          h={'32px'}
          borderWidth={3}
          borderColor={'#06ff06'}
          boxShadow={
            '0px 0px 10px 2px rgb(228 255 0), 0px 0px 0px 2px rgb(0 0 0) inset'
          }
          _hover={{
            boxShadow:
              '0px 0px 0px 2px rgb(0 0 0), 0px 0px 15px 2px #06ff06 inset',
            color: 'red',
            borderWidth: 0,
          }}
          _active={{
            borderWidth: 10,
            color: 'white',
          }}
          onClick={handleClickCount}
        >
          <Icon as={AddIcon} />
        </Button>
      </Flex>
      {counts && <InteractionCount />}
    </Flex>
  );
};

export default CountsBadge;
