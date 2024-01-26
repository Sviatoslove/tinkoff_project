import { Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/hooks';
import { selectCounts } from '../../../store/countsSlice';
import { AddIcon } from '@chakra-ui/icons';
import InteractionCount from '../InteractionCount';
import { useIteractionCount } from '../../../hooks/useInteractionCount';

const CountsBadge = () => {
  const counts = useAppSelector(selectCounts());
  const { handleClickCount } = useIteractionCount();

  return (
    <Flex
      direction={'column'}
      bg="#00ffff"
      px="10px"
      py="7px"
      borderRadius={'10px'}
      w={'fit-content'}
      mt={2}
      ml={2}
    >
      <Flex
        alignItems={'center'}
        mb={2}
        h={'100%'}
        data-countid={counts && counts[0].id}
        data-balance={counts && counts[0].balance}
      >
        {counts && (
          <>
            <img
              className="imgCount"
              src={counts[0].icon}
              width={100}
              height={100}
            />
            <Flex direction={'column'} alignSelf={'end'} fontWeight={'bold'}>
              <Text textAlign={'center'} mb={1}>
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
