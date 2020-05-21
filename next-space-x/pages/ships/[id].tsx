import React, { useMemo } from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import NextError from "next/error";
import { getShipIds, ShipDetail, getShip } from "@services/ships";
import { getShipUrl, getLaunchUrl } from "@lib/url";
import { MyHead } from "@components/MyHead";
import { Heading, Image, List, ListItem } from "@chakra-ui/core";
import { StatProps, InlineStats } from "@components/InlineStats";
import { Separator } from "@components/Separator";
import { MyNextLink } from "@components/MyNextLink";

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

const separatorSize_sm = "2";
const separatorSize_xl = "4";

const Ship: React.FC<PageProps> = ({ ship }) => {
  if (!ship) {
    return <NextError statusCode={404} />;
  }
  const firstLine = useMemo(
    (): Array<StatProps> => {
      const stats = [
        { id: "Port", label: 'Home port', data: ship.home_port },
      ];
      if (ship.weight_kg) {
        stats.push({ id: "Weight", label: "Weight", data: `${ship.weight_kg}kg` })
      }
      return stats;
    },
    [ship]
  );
  return (<>
    <MyHead title={ship.name} />
    <Heading as="h1" marginBottom={separatorSize_xl}>{ship.name} -- A {ship.type} of {ship.year_built}</Heading>
    <Image src={ship.image} alt={`A ${ship.name} photo`} marginBottom={separatorSize_xl} />
    <InlineStats stats={firstLine} />
    <Separator>Roles</Separator>
    <List styleType="disc" marginTop={separatorSize_sm} marginBottom={separatorSize_xl}>
      {ship.roles.map(role => <ListItem key={role}>{role}</ListItem>)}
    </List>
    <Separator>Launches</Separator>
    <List styleType="disc" marginTop={separatorSize_sm}>
      {ship.missions.map(mission =>
        <ListItem key={mission.flight}>
          <MyNextLink href={getLaunchUrl(mission.flight)}>{mission.name}</MyNextLink>
        </ListItem>
      )}
    </List>
  </>);
}

export default Ship;