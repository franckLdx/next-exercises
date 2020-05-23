import React, { useMemo } from "react";
import { PseudoBox, Skeleton } from "@chakra-ui/core";
import { MyNextLink } from "./MyNextLink";
import { useIsLoading } from "@lib/useIsLoading";

interface Props {
  href: string;
}

export const LinkCard: React.FC<Props> = ({ href, children }) => {
  const hoverStyle = useMemo(
    () => ({ border: "2px solid", borderColor: "white" }),
    []
  );
  const isLoading = useIsLoading()
  return (
    <PseudoBox
      border="1px solid"
      borderColor="whiteAlpha.900"
      padding={2}
      _hover={hoverStyle}
    >
      <Skeleton isLoaded={!isLoading}>
        <article>
          <MyNextLink href={href}>
            {children}
          </MyNextLink>
        </article>
      </Skeleton>
    </PseudoBox>
  );
}