import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { getShips, getShipsCount, ShipResult } from "@services/ships";
import { getPagesCount } from "@lib/misc";
import { SimpleGrid, Text } from "@chakra-ui/core";
import { MyHead } from "@components/MyHead";
import { ShipNavPage } from "@ships/ShipNavPage";
import { Ship } from "@components/ships/Ship";

const itemsPerPage = 9;

export const getStaticPaths: GetStaticPaths = async () => {
  const shipsCount = await getShipsCount();
  const pagesCount = getPagesCount(shipsCount, itemsPerPage);
  const paths: Array<string> = [];
  for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
    paths.push(`/ships/pages/${pageNumber}`);
  }
  return {
    paths,
    fallback: false
  }
}

interface PageProps {
  activePage: number;
  pagesCount: number;
  ships: Array<ShipResult>
}

type UrlParams = { pageNumber: string }

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }: GetStaticPropsContext<UrlParams>) => {
  if (!params?.pageNumber || isNaN(Number.parseInt(params.pageNumber))) {
    throw new Error("Wrong id parameters");
  }
  const activePage = Number.parseInt(params.pageNumber);
  const { ships, totalCount } = await getShips(activePage, itemsPerPage);
  const pagesCount = getPagesCount(totalCount, itemsPerPage);
  return { props: { activePage, pagesCount, ships } };
}

const Ships: React.FC<PageProps> = ({ activePage, pagesCount, ships }) => {
  return (<>
    <MyHead title="Launches" />
    <section>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        {ships.map(ship => <Ship key={ship.id} ship={ship} />)}
      </SimpleGrid>
    </section>
    <ShipNavPage pagesCount={pagesCount} activePage={activePage} />
  </>);
}

export default Ships;