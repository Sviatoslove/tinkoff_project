import {
  Badge,
  Flex,
  Text,
  useStyleConfig,
} from '@chakra-ui/react';
import { IUser } from '../../../../models';
import ThemeSwitch from '../../common/form/ThemeSwitch';
import { NavLink } from 'react-router-dom';
import UserAvatar from '../../common/UserAvatar';
import { useAppSelector } from '../../../hooks/hooks';
import { selectDataLoadedOperations } from '../../../store/operationsSlice';

interface IUserProps {
  user: IUser | null;
}

const UserBadgeForMain = ({ user }: IUserProps) => {
  const FlexBadge = useStyleConfig('FlexBadge', { variant: 'user' });
  const operationsIsLoaded = useAppSelector(selectDataLoadedOperations());

  return (
    <Flex __css={FlexBadge}>
      <Flex flexDirection={operationsIsLoaded ? 'column' : 'row'} flexGrow={{base: 0 ,'2sm':1}} alignItems={'center'}>

        <UserAvatar user={user} size={{base: 'lg' ,'2sm': operationsIsLoaded ? '2xl' : 'lg'}} />

        <Flex flexDirection={'column'} ml="3" justifyContent={'center'} w={'fit-content'}>
          <NavLink to={`/${user?.id}`}>
            <Text
              fontWeight="bold"
              fontSize={'20px'}
              lineHeight={'20px'}
              mt={2}
            >
              {user?.name}
            </Text>
            <Badge
              bg={'black'}
              color={'white'}
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
          </NavLink>
        </Flex>
      </Flex>
      <ThemeSwitch />
    </Flex>
  );
};

export default UserBadgeForMain;
