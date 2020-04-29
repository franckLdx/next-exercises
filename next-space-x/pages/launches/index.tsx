import React from 'react';
import { NextPage } from 'next';
import { SimpleGrid } from '@chakra-ui/core';
import { LaunchesResult, getLaunches } from '../../services/launches';
import { MyHead } from '../../components/MyHead';
import { Launch } from '../../components/launches/launch';


export async function getServerSideProps(): Promise<{ props: LaunchesResult }> {
  const launchesResult = await getLaunches(1, 9);
  return { props: launchesResult };
}

const Launches: NextPage<LaunchesResult> = ({ launches }) => (
  <>
    <MyHead title="Launches" />
    <section>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        {launches.map(launch => <Launch key={launch.id} launch={launch} />)}
      </SimpleGrid>
    </section>
  </>
);


export default Launches;