import {
  Flex,
  Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { selectUser } from '../store/userSlice';
import { IUser } from '../../models';
import { selectIsLoadingOperations } from '../store/operationsSlice';
import UserPageSkeletonUserBadge from '../components/common/skeletons/UserPageSkeletonUserBadge';
import UserBadgeForUser from '../components/ui/badges/UserBadgeForUser';

const UserPage = () => {
  const user: IUser = useAppSelector(selectUser())!;
  const isLoading = useAppSelector(selectIsLoadingOperations());
  return (
    <Flex shadow={'forContainersWhite'} borderRadius={10} p={10}>
      {user && (
        <UserBadgeForUser user={user}/>
      )}
      {isLoading && <UserPageSkeletonUserBadge />}
      <Flex></Flex>
    </Flex>
  );
};

export default UserPage;
