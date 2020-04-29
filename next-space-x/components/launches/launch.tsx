import React, { useMemo } from "react";
import { PseudoBox, Heading, Link } from "@chakra-ui/core";
import { LaunchItemResult } from "../../services/launches";
import { distanceDate } from "../../lib/misc";
import { Carousel } from "../Carousel";

interface Props {
  launch: LaunchItemResult;
}

export const Launch: React.FC<Props> = ({ launch }) => {
  const now = useMemo(() => Date.now(), []);
  return (
    <PseudoBox
      border="1px solid" borderColor="whiteAlpha.900" padding={2}
      _hover={{ border: "2px solid", borderColor: "white" }}>
      <article>
        <Link href={`/launches/${launch.id}`}>
          <Heading as="h2" size="md">{launch.mission_name} -- {launch.rocket.rocket_name}</Heading>
          {distanceDate(launch.launch_date_utc, now)} ago from {launch.launch_site.site_name_long}
          <Carousel marginTop={"sm"} images={launch.links.flickr_images} size="sm" />
        </Link>
      </article>
    </PseudoBox >
  );
};