import React, { useContext } from 'react';
import { UserInfo } from './data'
import { ThemedBox, ThemedText, ThemedDivider, ThemedBrick, ThemedHeading } from '../../components/Themed';
import { ThemeContext } from 'styled-components';

interface UserProps {
  user: UserInfo;
}

export const User: React.FC<UserProps> = ({ user }) => {
  const { margin } = useContext(ThemeContext);
  return (
    <ThemedBox padding={2} marginBottom={margin}>
      <ThemedBrick>
        <ThemedHeading>{user.name}</ThemedHeading>
        <Bio bio={user.bio} />
      </ThemedBrick>
    </ThemedBox>
  );
}

const Bio: React.FC<{ bio: string | null }> = ({ bio }) => {
  const actualBio = bio?.trim();
  if (!actualBio) {
    return <React.Fragment />;
  }
  return <>
    <ThemedDivider />
    <ThemedText>{actualBio}</ThemedText>
  </>;
};