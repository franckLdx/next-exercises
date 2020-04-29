import React from "react";
import { NextPage, NextPageContext } from "next";
import { getLaunch, LaunchResult } from "../../services/launches";
import { MyHead } from "../../components/MyHead";

export async function getServerSideProps(context: NextPageContext): Promise<{ props: LaunchResult }> {
  const id = Number(context.query.id);
  if (isNaN(id)) {
    throw new Error("Bad parameters");
  }
  const launchResult = await getLaunch(id);
  return { props: launchResult };
}

const Launch: NextPage<LaunchResult> = launchResult => {
  return (
    <>
      <MyHead title={launchResult.mission_name} />
      <div>{launchResult.mission_name}</div>
    </>
  );
}

export default Launch;