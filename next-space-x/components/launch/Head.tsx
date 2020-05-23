import React, { useMemo } from "react";
import { MyNextLink } from "@components/MyNextLink";
import { LaunchDetail } from "@services/launches";
import { getRocketUrl } from "@lib/url";
import { Heading } from "@chakra-ui/core";

interface HeadProps {
  launchResult: LaunchDetail
}

export const Head: React.FC<HeadProps> = ({ launchResult }) => {
  const rocketUrl = useMemo(
    () => launchResult ? getRocketUrl(launchResult.rocket.rocket.id) : "",
    [launchResult]
  );
  return (
    <Heading as="h1" size="xl" display="flex">
      <MyNextLink href={rocketUrl} >
        {launchResult.mission_name} -- A {launchResult.rocket.rocket_name} mission
      </MyNextLink>
    </Heading>);
}