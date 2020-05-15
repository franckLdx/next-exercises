import React from "react";
import StyledSystem from "styled-system";
import { Flex } from "@chakra-ui/core";

export const NavBar: React.FunctionComponent<StyledSystem.MarginProps> = React.memo(
  ({ children, ...props }) => (
    <Flex flexWrap={"wrap"} {...props}>
      {children}
    </Flex>
  )
);
