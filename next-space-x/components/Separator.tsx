import React from "react";
import { Heading } from "@chakra-ui/core";
import StyledSystem from "styled-system";

export const Separator: React.FC<StyledSystem.MarginTopProps> = ({ children, marginTop }) =>
  <Heading
    as="h2"
    size="xl"
    borderTop="2px solid white"
    marginTop={marginTop}
  >
    {children}
  </Heading>