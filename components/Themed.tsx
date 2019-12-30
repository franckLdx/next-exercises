import React from 'react';

import styled from 'styled-components';
import { Box, Heading, Text, Card, Touchable } from 'gestalt';

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

export const ThemedText = Text;

export const ThemedTouchable: React.FC = ({ children }) => (
  <Card>
    <Touchable onTouch={() => { }}>
      {children}
    </Touchable>
  </Card>
);