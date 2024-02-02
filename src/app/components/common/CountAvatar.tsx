import { Flex } from '@chakra-ui/react';

const CountAvatar = ({
  position,
  icon,
}: {
  position: string | any;
  icon: string;
}) => {
  return (
    <Flex
      position={{
        base: undefined,
        '2sm': position,
        '2md': undefined,
        '2lg': position,
      }}
      top={1}
      left={1}
      
      mx={'auto' }
      maxW={{ base: '100px', '2sm': '60px', '2md': '200px', '2lg': '100px' }}
      w={'100%'}
    >
      <img className="imgCount" src={icon} />
    </Flex>
  );
};

export default CountAvatar;
