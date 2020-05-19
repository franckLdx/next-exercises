import React from "react";
import { Heading } from "@chakra-ui/core";

export const Separator: React.FC = ({ children }) =>
  <Heading
    as="h2"
    size="xl"
    borderTop="2px solid white"
    marginTop="3"
  >
    {children}
  </Heading>