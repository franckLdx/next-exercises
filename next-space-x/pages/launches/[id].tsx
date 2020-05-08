import React, { useMemo } from "react";
import { NextPage, NextPageContext } from "next";
import Error from "next/error";
import { Heading, Box } from "@chakra-ui/core";
import { getLaunch, LaunchResult } from "../../services/launches";
import { MyHead } from "../../components/MyHead";
import { getRocketUrl } from "../../lib/url";
import { Carousel } from "../../components/Carousel";
import { MyNextLink } from "../../components/MyNextLink";
import { Description } from "../../components/launch/Description";
import ReactPlayer from 'react-player'

type Props =
  { launchResult: LaunchResult, statusCode: null } |
  { launchResult: null, statusCode: number };

export async function getServerSideProps(context: NextPageContext): Promise<{ props: Props }> {
  const id = Number(context.query.id);
  if (isNaN(id)) {
    console.error("Bad parameters");
    return { props: { launchResult: null, statusCode: 400 } };
  }
  try {
    const launchResult = await getLaunch(id);
    return { props: { launchResult, statusCode: null } };
  } catch (err) {
    console.error(err);
    return { props: { launchResult: null, statusCode: 503 } };
  }
}

const Launch: NextPage<Props> = ({ launchResult, statusCode }) => {
  const rocketUrl = useMemo(
    () => launchResult ? getRocketUrl(launchResult.rocket.rocket.id) : "",
    [launchResult]
  );
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }
  return <>
    <MyHead title={launchResult.mission_name} />
    <Heading as="h1" size="xl" display="flex">
      <MyNextLink href={rocketUrl} >
        {launchResult.mission_name} -- A {launchResult.rocket.rocket_name} mission
      </MyNextLink>
    </Heading>
    <Description launchResult={launchResult} marginBottom="10" />
    <Carousel
      marginBottom="10"
      size={"2xl"}
      images={launchResult.links.flickr_images}
      alt="Mission images"
    />
    <Box size={"2xl"}>
      <ReactPlayer
        url={launchResult.links.video_link}
        controls={true}
        width="100%"
        height="100%"
      />
    </Box>
  </>
}

export default Launch;