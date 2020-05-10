import React, { useMemo, useCallback } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Error from "next/error";
import { SimpleGrid, PseudoBox, Heading } from '@chakra-ui/core';
import { getLaunches, LaunchItemResult } from '../../services/launches';
import { MyHead } from '../../components/MyHead';
import { getLaunchUrl, getLaunchesUrl } from '../../lib/url';
import { distanceDate } from '../../lib/misc';
import { Carousel } from '../../components/Carousel';
import { MyNextLink } from '../../components/MyNextLink';
import { NavPage, NavPageProps } from '../../components/NavPage';

const pageSize = 9;

type PageProps = {
  statusCode: number,
  launches: null,
  totalCount: null,
  activePage: null,
} | {
  statusCode: null;
  launches: LaunchItemResult[];
  totalCount: number;
  activePage: number;
}
export async function getServerSideProps(context: NextPageContext): Promise<{ props: PageProps }> {
  const activePage = Number(context.query.page);
  if (isNaN(activePage)) {
    console.error("Bad parameters");
    return {
      props: {
        statusCode: 400,
        launches: null,
        totalCount: null,
        activePage: null
      }
    };
  }
  const LaunchesResult = await getLaunches(activePage, pageSize);
  return {
    props: {
      launches: LaunchesResult.launches,
      totalCount: LaunchesResult.totalCount,
      activePage,
      statusCode: null,
    }
  };
}

const Launches: NextPage<PageProps> = ({ launches, activePage, totalCount, statusCode }) => {
  if (statusCode !== null) {
    return <Error statusCode={statusCode} />;
  }
  return (
    <>
      <MyHead title="Launches" />
      <section>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
          {launches.map(launch => <Launch key={launch.id} launch={launch} />)}
        </SimpleGrid>
      </section>
      <NavBar marginY={3} activePage={activePage} totalCount={totalCount} />
    </>
  );
}
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

type NavBarProps = Omit<NavPageProps, 'pagesCount' | 'onPageClick'> & {
  totalCount: number;
}
const NavBar: React.FC<NavBarProps> = ({ totalCount, ...props }) => {
  const pagesCount = useMemo(() => Math.round(totalCount / pageSize), [totalCount]);
  const router = useRouter()
  const onPageClick = useCallback(
    pageNumber => {
      router.push(getLaunchesUrl(pageNumber));
    },
    []
  );
  return <NavPage {...props} pagesCount={pagesCount} onPageClick={onPageClick} />
}