import React, { useMemo } from "react";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import Error from "next/error";
import { Heading, Box, Link, Image, Flex, FlexProps } from "@chakra-ui/core";
import { getLaunch, LaunchResult, LaunchResult_Ship } from "../../services/launches";
import { MyHead } from "../../components/MyHead";
import { getRocketUrl, getShipUrl } from "../../lib/url";
import { Carousel } from "../../components/Carousel";
import { MyNextLink } from "../../components/MyNextLink";
import { MediaDescription } from "../../components/MediaDescription";
import { distanceDate } from "../../lib/misc";
import { VideoPlayer } from "../../components/VideoPlayer";
import StyledSystem from "styled-system";

const separatorSize_xl = "10px";
const separatorSize_sm = "5px";

const imageSize = "2xl";

type Props =
  { launchResult: LaunchResult, statusCode: null } |
  { launchResult: null, statusCode: number };

export const getServerSideProps: GetServerSideProps<Props> = async (context: GetServerSidePropsContext) => {
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
  if (statusCode !== null) {
    return <Error statusCode={statusCode} />;
  }
  return <>
    <MyHead title={launchResult.mission_name} />
    <Head launchResult={launchResult} />
    <Description
      launchResult={launchResult}
      marginBottom={separatorSize_xl}
    />
    <Carousel
      marginBottom={separatorSize_xl}
      size={imageSize}
      images={launchResult.links.flickr_images}
      alt="Mission images"
    />
    <VideoPlayer
      href={launchResult.links.video_link}
      size={imageSize}
      marginBottom={separatorSize_xl}
    />
    <Ships
      launchResult={launchResult}
    />
  </>
}

export default Launch;

interface HeadProps {
  launchResult: LaunchResult
}
const Head: React.FC<HeadProps> = ({ launchResult }) => {
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

type DescriptionProps = StyledSystem.MarginProps & {
  launchResult: LaunchResult
}

const Description: React.FC<DescriptionProps> = ({ launchResult, ...props }) => {
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
      {...props}
      imgUrl={launchResult.links.mission_patch}
      altImg="mission patch logo">
      <Box marginBottom={separatorSize_sm}>
        {distanceMsg}
      </Box>
      {details}
    </MediaDescription>
  );
};

type ShipsProps = StyledSystem.MarginProps & {
  launchResult: LaunchResult
}
const Ships: React.FC<ShipsProps> = ({ launchResult, ...props }) => {
  if (launchResult.ships.length === 0) {
    return <Box />;
  }
  return (
    <Box {...props}>
      Ships involed by this mission:
      {launchResult.ships.map(ship =>
        <Ship
          key={ship.id}
          ship={ship}
          marginBottom={separatorSize_sm}
        />)}
    </Box>
  );
}

type ShipProps = Omit<FlexProps, 'display' | 'flexWrap' | 'direction' | 'alignItems' | 'justifyContent'> & {
  ship: LaunchResult_Ship;
}
const Ship: React.FC<ShipProps> = ({ ship: { id, image, name }, ...flexProps }) =>
  <MyNextLink href={getShipUrl(id)}>
    <Flex {...flexProps} flexWrap="wrap" direction="row">
      {image &&
        <Image
          src={image}
          alt="Ship's photo"
          size={imageSize}
          marginRight={separatorSize_sm}
        />}
      {name}
    </Flex>
  </MyNextLink>