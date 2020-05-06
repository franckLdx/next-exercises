import React, { useMemo } from "react";
import { NextPage, NextPageContext } from "next";
import Error from "next/error";
import { Heading, Box, Text } from "@chakra-ui/core";
import { getLaunch, LaunchResult } from "../../services/launches";
import { MyHead } from "../../components/MyHead";
import Link from "next/link";
import { getRocketUrl } from "../../lib/url";
import { Carousel } from "../../components/Carousel";

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
      <Link href={rocketUrl} >
        <Text cursor="pointer">{launchResult.mission_name} -- A {launchResult.rocket.rocket_name} mission</Text>
      </Link>
    </Heading>
    <Carousel marginTop={"sm"} size={["2xl"]} images={launchResult.links.flickr_images} />
  </>
}
//     <YouTubeReader
//       class="ml-8 mb-10 border border-white"
//       videoLink={launch.links.video_link} />
//     <Ships class="ml-8" ships={launch.ships} /> */}


export default Launch;