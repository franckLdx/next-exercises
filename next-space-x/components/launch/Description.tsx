import React, { useMemo } from "react";
import { LaunchResult } from "../../services/launches";
import { MediaDescription } from "../MediaDescription";
import { distanceDate } from "../../lib/misc";
import { Box, Link, BoxProps } from "@chakra-ui/core";

type Props = BoxProps & {
  launchResult: LaunchResult
}

export const Description: React.FC<Props> = ({ launchResult, ...boxProps }) => {
  const distanceMsg = useMemo(
    () => `${distanceDate(launchResult.launch_date_utc, Date.now())} ago from ${launchResult.launch_site.site_name_long}`,
    [launchResult]
  );
  const details = useMemo(
    () => {
      if (!launchResult.details) {
        return <>Sorry, description not yet provided !</>
      }
      return (
        <Box>
          {launchResult.details} (<Link href={launchResult.links.wikipedia} isExternal>Related wikipedia article</Link>,&nbsp;
          <Link href={launchResult.links.video_link} isExternal>Related video article</Link>)
        </Box>
      );
    },
    [launchResult]
  );
  return (
    <MediaDescription
      imgUrl={launchResult.links.mission_patch}
      altImg="mission patch logo">
      <Box marginBottom="5px">
        {distanceMsg}
      </Box>
      <div>
        {details}
      </div>
    </MediaDescription>
  );
};