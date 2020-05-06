import React, { useMemo } from "react";
import { LaunchResult } from "../../services/launches";
import { MediaDescription } from "../MediaDescription";
import { distanceDate } from "../../lib/misc";
import { Box, Link } from "@chakra-ui/core";

interface Props {
  launch: LaunchResult
}

export const Description: React.FC<Props> = ({ launch }) => {
  const distanceMsg = useMemo(
    () => `${distanceDate(launch.launch_date_utc, Date.now())} ago from ${launch.launch_site.site_name_long}`,
    [launch]
  );
  const details = useMemo(
    () => {
      if (!launch.details) {
        return <>Sorry, description not yet provided !</>
      }
      return (
        <>
          {launch.details} (<Link href={launch.links.wikipedia} isExternal>Related wikipedia article</Link>,&nbsp;
          <Link href={launch.links.video_link} isExternal>Related video article</Link>)
        </>
      );
    },
    [launch]
  );
  return (
    <MediaDescription
      imgUrl={launch.links.mission_patch}
      altImg="mission patch logo">
      <>
        <Box marginBottom="5px">
          {distanceMsg}
        </Box>
        <div>
          {details}
        </div>
      </>
    </MediaDescription>
  );
};