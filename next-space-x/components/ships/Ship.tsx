import React from "react";
import { ShipsResult_Detail } from "@services/ships";
import { Text, Heading, Image } from "@chakra-ui/core";
import { LinkCard } from "@components/LinkCard";
import { getShipUrl } from "@lib/url";

interface Props {
  ship: ShipsResult_Detail;
}
export const Ship: React.FC<Props> = ({ ship }) => {
  return (<>
    <LinkCard href={getShipUrl(ship.id)}>
      <Heading as="h1" size="md">{ship.name}</Heading>
      <Image src={ship.image} size="sm" objectFit="scale-down" />
    </LinkCard>
  </>);
}