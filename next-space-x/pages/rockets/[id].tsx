import React from "react";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import NextError from "next/error";
import { getRockets, RocketsList, getRocket, RocketDetail } from "@services/rockets";
import { NavRockets } from "@components/rockets/RocketNavBar";
import { Heading } from "@chakra-ui/core";
import { FirstStage } from "@components/rockets/FirstStage";
import { Description } from "../../components/rockets/Description";
import { Payload } from "@components/rockets/Payload";
import { SecondStage } from "@components/rockets/SecondStage";

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
      <FirstStage firstStage={rocket.first_stage} />
      <SecondStage secondStage={rocket.second_stage} />

      {/* 
      <Launches {launches} /> */}

    </>
  );
}

export default Rockets;
