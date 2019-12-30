import React from 'react';
import { Repository } from './data';
import { ThemedHeading, ThemedText, ThemedTouchable, ThemedBrick } from '../../components/Themed';

export interface RepositoryBrickProps {
  data: Repository;
}

export const RepositoryBrick: React.FC<RepositoryBrickProps> = React.memo(({ data }) =>
  <ThemedTouchable key={data.name}>
    <ThemedBrick paddingX={3} maxWidth="18em" margin={1}>
      <ThemedHeading>{data.name}</ThemedHeading>
      <ThemedText>{data.description}</ThemedText>
      <ThemedText>License key: {data.licenseInfo?.key ?? "undefined"}</ThemedText>
    </ThemedBrick >
  </ThemedTouchable >
);
