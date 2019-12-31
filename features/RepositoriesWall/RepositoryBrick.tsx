import React from 'react';
import Router from 'next/router'
import { Repository } from './data';
import { ThemedHeading, ThemedText, ThemedTouchable, ThemedBrick } from '../../components/Themed';

export interface RepositoryBrickProps {
  data: Repository;
}

export const RepositoryBrick: React.FC<RepositoryBrickProps> = React.memo(({ data }) => {
  const onTouch = () => {
    Router.push({
      pathname: '/repository',
      query: {
        name: data.name,
        owner: data.owner.login,
      },
    })
  };
  return (
    <ThemedTouchable key={data.name} onTouch={onTouch}>
      <ThemedBrick margin={1}>
        <ThemedHeading>{data.name}</ThemedHeading>
        <ThemedText>{data.description}</ThemedText>
      </ThemedBrick >
    </ThemedTouchable>
  );
});
