import React from "react";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import Error from "next/error";
import { LaunchDetail, getLaunch } from "@services/launches";
import { MyHead } from "@components/MyHead";
import { Carousel } from "@components/Carousel";
import { VideoPlayer } from "@components/VideoPlayer";
import { Head } from "@launch/Head";
import { Description } from "@launch/Description";
import { Ships } from "@launch/Ships";

const separatorHeight = "10px";
const imageSize = ["sm", "2xl"];

type Props =
  { launchResult: LaunchDetail, statusCode: null } |
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
      marginBottom={separatorHeight}
    />
    <Carousel
      marginBottom={separatorHeight}
      size={["sm", "2xl"]}
      images={launchResult.links.flickr_images}
      alt="Mission images"
    />
    <VideoPlayer
      href={launchResult.links.video_link}
      marginBottom={separatorHeight}
      size={["sm", "2xl"]}
    />
    <Ships
      launchResult={launchResult}
      size={imageSize}
    />
  </>
}

export default Launch;