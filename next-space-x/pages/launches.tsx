import React from 'react';
import { MyHead } from '../components/MyHead'
import { getLaunches, LaunchesResult } from '../services/launches';
import { NextPage } from 'next';
import { SimpleGrid, Box } from '@chakra-ui/core';
import { Launch } from '../components/launches/launch';


export async function getServerSideProps(): Promise<{ props: LaunchesResult }> {
  const launchesResult = await getLaunches(0, 0);
  return { props: launchesResult };
}

const Launches: NextPage<LaunchesResult> = ({ launches }) => (
  <>
    <MyHead title="Launches" />
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
      {launches.map(launch => <Launch key={launch.id} launch={launch} />)}
    </SimpleGrid>
  </>
);


export default Launches;