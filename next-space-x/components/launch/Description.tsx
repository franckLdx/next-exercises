import React, { useMemo } from "react";
import { LaunchDetail } from "@services/launches";
import { distanceDate } from "@lib/misc";
import { Box, Link } from "@chakra-ui/core";
import { MediaDescription } from "@components/MediaDescription";
import StyledSystem from "styled-system";
import { SkeletonOnLoading } from "@components/SkeletonOnLoading";

type Props = StyledSystem.MarginProps & {
  launchResult: LaunchDetail
}

export const Description: React.FC<Props> = ({ launchResult, ...props }) => {
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
    <SkeletonOnLoading>
      <MediaDescription
        {...props}
        imgUrl={launchResult.links.mission_patch}
        altImg="mission patch logo">
        <Box marginBottom={3}>
          {distanceMsg}
        </Box>
        {details}
      </MediaDescription>
    </SkeletonOnLoading>
  );
};
