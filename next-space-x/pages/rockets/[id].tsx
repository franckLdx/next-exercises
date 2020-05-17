import React, { useMemo } from "react";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import NextError from "next/error";
import { getRockets, RocketsList, getRocket, RocketDetail } from "@services/rockets";
import { NavRockets } from "@components/rockets/RocketNavBar";
import { Heading, Link, Text, SimpleGrid, Stack, Box, StatNumber, StatLabel, Stat } from "@chakra-ui/core";
import { MediaDescription } from "@components/MediaDescription";
import { getRocketsImage } from "@lib/url";
import StyledSystem from "styled-system";

type UrlParams = { id: string }

export const getStaticPaths: GetStaticPaths<UrlParams> = async () => {
  const rockets = await getRockets();
  if (!rockets || !rockets.length) {
    throw new Error("Unable go get rockets");
  }
  const paths = rockets.map(({ id }) => { return { params: { id } } });
  return {
    paths,
    fallback: true
  }
}

interface PageProps {
  rockets: RocketsList
  rocket: RocketDetail;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }: GetStaticPropsContext<UrlParams>) => {
  if (!params.id) {
    throw new Error("Wrong id parameters");
  }
  const [rockets, rocket] = await Promise.all([
    getRockets(),
    getRocket(params.id)
  ]);
  if (!rockets || !rockets.length || !rocket) {
    throw new Error("Unable to get rockets");
  }
  return { props: { rockets, rocket } };
}

const Rockets: React.FC<PageProps> = ({ rockets, rocket }) => {
  if (!rockets || !rockets.length) {
    return <NextError statusCode={500} />;
  }
  return (
    <>
      <NavRockets rockets={rockets} />
      <Heading as="h1" size="2xl">
        {rocket.name}
      </Heading>
      <Description rocket={rocket} />
      <Payload rocket={rocket} />

      {/* 
      <FirstStage {rocket} />
      <SecondStage {rocket} />
      <Launches {launches} /> */}

    </>
  );
}

export default Rockets;

const Seprarator: React.FC = ({ children }) =>
  <Heading
    as="h2"
    size="xl"
    borderTop="2px solid white"
    marginTop="3"
  >
    {children}
  </Heading>

interface SubComponentProps {
  rocket: RocketDetail;
}

const Description: React.FC<SubComponentProps> = ({ rocket }) => {
  const imageUrl = useMemo(() => getRocketsImage(rocket.id), []);
  return (
    <MediaDescription imgUrl={imageUrl} altImg="A rocket image">
      <Text marginBottom='4'>
        {rocket.description}
      </Text>
      <Text marginBottom='4'>
        A launch costs {rocket.cost_per_launch}${rocket.success_rate_pct > 0 ? <> and the success rate is around {rocket.success_rate_pct}%</> : ""}
      </Text>
      <Text marginBottom='4'>
        It has a height of {rocket.height.meters}m and a diameter of {rocket.diameter.meters}m
      for a mass of {rocket.mass.kg}kg.
    </Text>
      <Link href={rocket.wikipedia}>Related wikipedia article</Link>
    </MediaDescription>
  );
}

const Payload: React.FC<SubComponentProps> = ({ rocket }) => {
  return (
    <>
      <Seprarator>Payload</Seprarator>
      <SimpleGrid marginTop="3" columns={{ sm: 2, md: 2, lg: 3, xl: 4 }} spacing={2} maxWidth="1500px">
        {rocket.payload_weights.map(
          payload => (
            <Stat key={payload.id}>
              <StatLabel>{payload.name}</StatLabel>
              <StatNumber >{payload.kg} kg</StatNumber>
            </Stat>)
        )}
      </SimpleGrid>
    </>
  );
}

