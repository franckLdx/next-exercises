import React from "react";
import Link, { LinkProps } from "next/link";
import { Box } from "@chakra-ui/core";

export const MyNextLink: React.FC<LinkProps> = ({ children, ...linkProps }) =>
  <Link {...linkProps}>
    <Box cursor="pointer">
      {children}
    </Box>
  </Link>