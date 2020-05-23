import React from "react";
import { ShipsResult_Detail } from "@services/ships";
import { Text, Heading, Image } from "@chakra-ui/core";
import { LinkCard } from "@components/LinkCard";
import { getShipUrl } from "@lib/url";
import { SkeletonOnLoading } from "@components/SkeletonOnLoading";

interface Props {
  ship: ShipsResult_Detail;
}
export const Ship: React.FC<Props> = ({ ship }) => {
  return (<>
    <LinkCard href={getShipUrl(ship.id)}>
      <SkeletonOnLoading>
        <Heading as="h1" size="md">{ship.name}</Heading>
        <Image src={ship.image} size="sm" objectFit="scale-down" marginX="auto" />
      </SkeletonOnLoading>
    </LinkCard>
  </>);
}