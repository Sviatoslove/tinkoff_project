import { Flex, Text } from "@chakra-ui/react";
import UserAvatar from "../../common/UserAvatar";
import { NavLink } from "react-router-dom";
import { IUser } from "../../../../models";

const UserBadgeForUser = ({user}:{user:IUser}) => {
  return ( 
    <Flex
          alignItems={'center'}
          shadow={'whiteAndLightBlue'}
          borderRadius={10}
          p={5}
        >
          <UserAvatar user={user} size={'2xl'} />
          <Flex flexDirection={'column'} h={'100%'} alignContent={'end'}>
            <Text
              display={'flex'}
              flexWrap={'wrap'}
              fontWeight="bold"
              fontSize={'40px'}
              lineHeight={'20px'}
              ml={10}
              flexGrow={1}
              alignContent={'center'}
            >
              {user?.name}
            </Text>
            <Flex _hover={{textDecoration: 'underline'}} alignSelf={'end'}>
            <NavLink to="/">
              Go back
            </NavLink>
            </Flex>
          </Flex>
        </Flex>
   );
}
 
export default UserBadgeForUser;