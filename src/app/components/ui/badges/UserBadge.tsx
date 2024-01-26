import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react';
import { IUser } from '../../../../models';

interface IUserProps {
  user: IUser;
}

const UserBadge = ({ user }: IUserProps) => {
  return (
    <Flex
      bg="yellow"
      px="10px"
      py="7px"
      alignItems={'center'}
      borderRadius={'10px'}
      w={'fit-content'}
      mt={2}
    >
      <Avatar
        name={user.name}
        src={user.icon}
        size="lg"
        borderColor={'#06ff06'}
        borderWidth={3}
        borderInline={'ActiveBorder'}
        boxShadow={
          '0px 0px 10px 2px rgb(0 255 184), 0px 0px 0px 2px rgb(0 0 0) inset'
        }
        bg={'#d7dbe6'}
        p={1}
      />
      <Box ml="3">
        <Text fontWeight="bold" fontSize={'20px'} lineHeight={'20px'}>
          {user.name}
        </Text>
        <Badge
          bg={'black'}
          color={'white'}
          borderRadius={'10px'}
          px={'2px'}
          py={0}
          borderWidth={3}
          borderColor={'#06ff06'}
          fontSize={'8px'}
          letterSpacing={'1px'}
          boxShadow={'0px 0px 10px 2px rgb(0 255 184)'}
        >
          Pro
        </Badge>
      </Box>
    </Flex>
  );
};

export default UserBadge;
