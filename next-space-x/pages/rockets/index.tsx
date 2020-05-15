import React from "react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { getRockets, RocketResults } from "@services/rockets";
import { NavRockets } from "@components/rockets/RocketNavBar";
import { useRedirect } from "@lib/useRedirect";
import { getRocketUrl } from "@lib/url";

interface PageProps {
  rockets: RocketResults
}

export const getStaticProps: GetStaticProps<PageProps> = async (context: GetStaticPropsContext) => {
  const rockets = await getRockets();
  return { props: { rockets } };
}

const Rockets: React.FC<PageProps> = ({ rockets }) => {
  useRedirect(getRocketUrl(rockets[0].id));
  return <NavRockets rockets={rockets} />
}

export default Rockets; 