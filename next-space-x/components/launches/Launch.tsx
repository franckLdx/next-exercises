import React, { useMemo } from "react";
import { LaunchItem } from "@services/launches";
import { Heading } from "@chakra-ui/core";
import { getLaunchUrl } from "@lib/url";
import { distanceDate } from "@lib/misc";
import { Carousel } from "@components/Carousel";
import { LinkCard } from "@components/LinkCard";
import { SkeletonOnLoading } from "@components/SkeletonOnLoading";

interface LaunchProps {
  launch: LaunchItem;
}

export const Launch: React.FC<LaunchProps> = ({ launch }) => {
  const now = useMemo(() => Date.now(), []);
  return (
    <LinkCard href={getLaunchUrl(launch.id)}>
      <SkeletonOnLoading>
        <Heading as="h1" size="md">{launch.mission_name} -- {launch.rocket.rocket_name}</Heading>
        {distanceDate(launch.launch_date_utc, now)} ago from {launch.launch_site.site_name_long}
        <Carousel marginTop="sm" size="sm" marginX="auto" images={launch.links.flickr_images} />
      </SkeletonOnLoading>
    </LinkCard>
  );
};
