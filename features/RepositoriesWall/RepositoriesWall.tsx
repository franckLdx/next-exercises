import React, { useCallback } from 'react';
import { Repository } from './data';
import { RepositoryBrick } from './RepositoryBrick';
import { Masonry } from 'gestalt';
import { ThemedBox } from '../../components/Themed';

interface ReporitoryWallPprops {
  repositories: Repository[];
}

export const RepositoriesWall: React.FC<ReporitoryWallPprops> = ({ repositories }) => {
  const render = useCallback(
    ({ data }: any) => <RepositoryBrick data={data} />,
    []
  );
  return <>
    <ThemedBox paddingY={2}>
      <Masonry
        comp={render}
        items={repositories}
        minCols={1}
        gutterWidth={6}
      />
    </ThemedBox>
  </>;
};

