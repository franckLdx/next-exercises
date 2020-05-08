import React, { useMemo } from 'react';
import { NextPage } from 'next';
import { SimpleGrid, PseudoBox, Heading, Box } from '@chakra-ui/core';
import { LaunchesResult, getLaunches, LaunchItemResult } from '../../services/launches';
import { MyHead } from '../../components/MyHead';
import Link from 'next/link';
import { getLaunchUrl } from '../../lib/url';
import { distanceDate } from '../../lib/misc';
import { Carousel } from '../../components/Carousel';
import { MyNextLink } from '../../components/MyNextLink';


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

interface LaunchProps {
  launch: LaunchItemResult;
}

const Launch: React.FC<LaunchProps> = ({ launch }) => {
  const now = useMemo(() => Date.now(), []);
  return (
    <PseudoBox
      border="1px solid" borderColor="whiteAlpha.900" padding={2}
      _hover={{ border: "2px solid", borderColor: "white" }}>
      <article>
        <MyNextLink href={getLaunchUrl(launch.id)}>
          <Heading as="h1" size="md">{launch.mission_name} -- {launch.rocket.rocket_name}</Heading>
          {distanceDate(launch.launch_date_utc, now)} ago from {launch.launch_site.site_name_long}
          <Carousel marginTop={"sm"} size="sm" images={launch.links.flickr_images} />
        </MyNextLink>
      </article>
    </PseudoBox >
  );
};