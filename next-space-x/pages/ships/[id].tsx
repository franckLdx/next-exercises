import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import NextError from "next/error";
import { getShipIds, ShipDetail, getShip } from "@services/ships";
import { getShipUrl } from "@lib/url";
import { MyHead } from "@components/MyHead";
import { Head } from "@ship/Head";
import { Role } from "@ship/Role";
import { Launch } from "@ship/Launch";

export const getStaticPaths: GetStaticPaths = async () => {
  const shipIds = await getShipIds();
  const paths = shipIds.map(({ id }) => getShipUrl(id));
  return {
    paths,
    fallback: true
  }
}

type UrlParams = { id: string }

interface PageProps {
  ship?: ShipDetail
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }: GetStaticPropsContext<UrlParams>) => {
  if (!params.id) {
    throw new Error(`Missing id parameters`);
  }
  try {
    const ship = await getShip(params.id);
    return { props: { ship } };
  } catch (err) {
    return { props: { ship: null } };
  }
}

const separatorSize_xl = "4";

const Ship: React.FC<PageProps> = ({ ship }) => {
  if (!ship) {
    return <NextError statusCode={404} />;
  }
  return (<>
    <MyHead title={ship.name} />
    <Head marginBottom={separatorSize_xl} ship={ship} />
    <Role marginBottom={separatorSize_xl} ship={ship} />
    <Launch ship={ship} />
  </>);
}

export default Ship;