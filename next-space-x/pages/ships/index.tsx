import React from "react";
import { useRedirect } from "@lib/useRedirect";
import { getShipsUrl } from "@lib/url";

const Ships: React.FC = () => {
  useRedirect(getShipsUrl());
  return (<>Loading, Please wait...</>);
}

export default Ships;