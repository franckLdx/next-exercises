import React from "react";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import NextError from "next/error";
import { getRockets, RocketsList, getRocket, RocketDetail } from "@services/rockets";
import { getRocketLaunches, LaunchRocketResult } from "@services/launches";
import Heading from "@chakra-ui/core/dist/Heading";
import { Description } from "@rocket/Description";
import { NavRockets } from "@rocket/RocketNavBar";
import { Payload } from "@rocket/Payload";
import { FirstStage } from "@rocket/FirstStage";
import { SecondStage } from "@rocket/SecondStage";
import { Launches } from "@rocket/Launches";

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
  launches: Array<LaunchRocketResult>
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }: GetStaticPropsContext<UrlParams>) => {
  if (!params.id) {
    throw new Error("Wrong id parameters");
  }
  const [rockets, rocket, launches] = await Promise.all([
    getRockets(),
    getRocket(params.id),
    getRocketLaunches(params.id)
  ]);
  if (!rockets || !rockets.length || !rocket || !launches) {
    throw new Error("Unable to get rockets data");
  }
  return { props: { rockets, rocket, launches } };
}

const Rockets: React.FC<PageProps> = ({ rockets, rocket, launches }) => {
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
      <Payload marginTop={10} rocket={rocket} />
      <FirstStage marginTop={10} firstStage={rocket.first_stage} />
      <SecondStage marginTop={10} secondStage={rocket.second_stage} />
      <Launches marginTop={10} launches={launches} />
    </>
  );
}

export default Rockets;
