import React from "react";
import Link, { LinkProps } from "next/link";
import { Box } from "@chakra-ui/core";
import { useCursor } from "../lib/useCursor";

export const MyNextLink: React.FC<LinkProps> = ({ children, ...linkProps }) => {
  const [cursor, _] = useCursor("pointer");
  return (
    <Link {...linkProps}>
      <Box cursor={cursor}>
        {children}
      </Box>
    </Link>)
}