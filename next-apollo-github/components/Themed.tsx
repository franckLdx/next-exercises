import React from 'react';

import styled from 'styled-components';
import { Box, Heading, Text, Card, Touchable, TouchableProps } from 'gestalt';

export const ThemedBox = styled(Box).attrs(({ theme, ...ownedProps }) => {
  return { ...theme.box, ...ownedProps };
})``;

export const ThemedBrick = styled(Box).attrs(({ theme, ...ownedProps }) => {
  return { ...theme.brick, ...ownedProps };
})``;

export const ThemedHeading = styled(Heading).attrs(({ theme, ...ownedProps }) => {
  return { ...theme.header, ...ownedProps };
})``;

export const ThemedDivider = styled(Box).attrs(({ theme, ...ownedProps }) => {
  return { ...theme.divider, ...ownedProps };
})``;

export const ThemedBadge: React.FC<{ text: string }> = ({ text }) =>
  <Box paddingX={1}>
    <Card>
      <ThemedText>{text}</ThemedText>
    </Card>
  </Box>

export const ThemedBadges: React.FC<{ text: string[] }> = ({ text }) =>
  <>{text.map(t => <ThemedBadge key={t} text={t} />)}</>

export const ThemedText = Text;

export const ThemedTouchable: React.FC<TouchableProps> = ({ children, ...touchableProps }) => (
  <Card>
    <Touchable {...touchableProps}>
      {children}
    </Touchable>
  </Card >
);