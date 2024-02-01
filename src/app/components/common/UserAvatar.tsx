import { Avatar } from '@chakra-ui/react';
import { IUser } from '../../../models';

interface IUserAvatarProps {
  user: IUser | null;
  size: {[x:string]: string} | string;
}
const UserAvatar = ({ user, size }: IUserAvatarProps) => {
  return (
    <Avatar
      name={user?.name}
      src={user?.icon}
      size={size}
      borderColor={'#06ff06'}
      borderWidth={3}
      borderInline={'ActiveBorder'}
      boxShadow={
        '0px 0px 10px 2px rgb(0 255 184), 0px 0px 0px 2px rgb(0 0 0) inset'
      }
      bg={'#d7dbe6'}
      p={1}
    />
  );
};

export default UserAvatar;
