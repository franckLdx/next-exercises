import React, { useMemo } from "react";
import { PseudoBox } from "@chakra-ui/core";
import { MyNextLink } from "./MyNextLink";

interface Props {
  href: string;
}

export const LinkCard: React.FC<Props> = ({ href, children }) => {
  const hoverStyle = useMemo(
    () => ({ border: "2px solid", borderColor: "white" }),
    []
  );
  return (
    <PseudoBox
      border="1px solid"
      borderColor="whiteAlpha.900"
      padding={2}
      _hover={hoverStyle}
    >
      <article>
        <MyNextLink href={href}>
          {children}
        </MyNextLink>
      </article>
    </PseudoBox>
  );
}