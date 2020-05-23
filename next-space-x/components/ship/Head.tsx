import React, { useMemo } from "react";
import { Heading, Image } from "@chakra-ui/core";
import { SkeletonOnLoading } from "@components/SkeletonOnLoading";
import { InlineStats, StatProps } from "@components/InlineStats";
import { Props } from "./Props";

export const Head: React.FC<Props> = ({ ship, marginTop }) => {
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
    <SkeletonOnLoading>
      <Heading
        as="h1"
        marginTop={marginTop}
      >
        {ship.name} -- A {ship.type} of {ship.year_built}
      </Heading>
    </SkeletonOnLoading>
    <SkeletonOnLoading>
      <Image
        src={ship.image}
        alt={`A ${ship.name} photo`}
        marginBottom={4}
      />
    </SkeletonOnLoading>
    <SkeletonOnLoading>
      <InlineStats stats={firstLine} />
    </SkeletonOnLoading>
  </>)
}