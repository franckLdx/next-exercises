import React from "react";
import { ShipResult } from "@services/ships";
import { Text, Heading, Image } from "@chakra-ui/core";
import { LinkCard } from "@components/LinkCard";
import { getShipUrl } from "@lib/url";

interface Props {
  ship: ShipResult;
}
export const Ship: React.FC<Props> = ({ ship }) => {
  return (<>
    <LinkCard href={getShipUrl(ship.id)}>
      <Heading as="h1" size="md">{ship.name}</Heading>
      <Image src={ship.image} size="sm" objectFit="cover" marginTop="sm" />
    </LinkCard>
  </>);
}