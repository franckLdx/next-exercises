import React from "react";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import NextError from "next/error";
import { getRockets, RocketResults, getRocket } from "@services/rockets";
import { NavRockets } from "@components/rockets/RocketNavBar";

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
  rockets: RocketResults
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }: GetStaticPropsContext<UrlParams>) => {
  const [rockets, rocket] = await Promise.all([
    getRockets(),
    getRocket(params.id)
  ]);
  if (!rockets || !rockets.length || !rocket) {
    throw new Error("Unable go get rockets");
  }
  console.log("====>", rocket.name);
  return { props: { rockets } };
}

const Rockets: React.FC<PageProps> = ({ rockets }) => {
  if (!rockets || !rockets.length) {
    return <NextError statusCode={500} />;
  }
  return (
    <>
      <NavRockets rockets={rockets} />
      <>LOADED</>
    </>
  );
}

export default Rockets; 