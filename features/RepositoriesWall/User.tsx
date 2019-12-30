import React, { useContext } from 'react';
import { UserInfo } from './data'
import { ThemedBox, ThemedText, ThemedDivider, ThemedBrick, ThemedHeading } from '../../components/Themed';
import { ThemeContext } from 'styled-components';


export const User: React.FC<UserInfo> = ({ name, bio }) => {
  const { margin } = useContext(ThemeContext);
  return (
    <ThemedBox padding={2} marginBottom={margin}>
      <ThemedBrick padding={2}>
        <ThemedHeading>{name}</ThemedHeading>
        <Bio bio={bio} />
      </ThemedBrick>
    </ThemedBox >
  );
}

const Bio: React.FC<{ bio: string }> = ({ bio }) => {
  const actualBio = bio.trim();
  if (!actualBio) {
    return <React.Fragment />;
  }
  return <>
    <ThemedDivider />
    <ThemedText>{actualBio}</ThemedText>
  </>;
};