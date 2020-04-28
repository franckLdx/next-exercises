import React from "react";
import { PseudoBox } from "@chakra-ui/core";

interface Props {
  launch: any;
}
export const Launch: React.FC<Props> = ({ launch }) => {
  return <PseudoBox bg="tomato" height="80px">{launch.id}</PseudoBox>
};  