import React from 'react';
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import Error from "next/error";
import { SimpleGrid } from '@chakra-ui/core';
import { LaunchItem, getLaunches } from '@services/launches';
import { MyHead } from '@components/MyHead';
import { LaunchNavBar } from '@launches/LaunchesNavBar';
import { Launch } from '@components/launches/Launch';
import { getPagesCount } from '@lib/misc';

const itemsPerPage = 9;

type PageProps = {
  statusCode: number,
  launches: null,
  pagesCount: null,
  activePage: null,
} | {
  statusCode: null;
  launches: LaunchItem[];
  pagesCount: number;
  activePage: number;
}
export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
  const activePage = Number(context.query.page);
  if (isNaN(activePage)) {
    console.error("Bad parameters");
    return {
      props: {
        statusCode: 400,
        launches: null,
        pagesCount: null,
        activePage: null
      }
    };
  }
  const LaunchesResult = await getLaunches(activePage, itemsPerPage);
  return {
    props: {
      launches: LaunchesResult.launches,
      pagesCount: getPagesCount(LaunchesResult.totalCount, itemsPerPage),
      activePage,
      statusCode: null,
    }
  };
}

const Launches: NextPage<PageProps> = ({ launches, activePage, pagesCount, statusCode }) => {
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
      <LaunchNavBar activePage={activePage} pagesCount={pagesCount} />
    </>
  );
}

export default Launches;