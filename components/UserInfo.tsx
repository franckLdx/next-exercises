import react from 'react';

export interface UserInfoProps {
  name: string;
  bio: string;
}

export const UserInfo: react.FC<UserInfoProps> = ({ name, bio }) => {
  return (
    <>
      {name}
      {bio}
    </>
  );
}
