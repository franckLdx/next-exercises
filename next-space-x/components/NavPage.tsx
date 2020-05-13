import React, { useMemo } from "react";
import { ButtonGroup, Button, Flex } from "@chakra-ui/core";
import StyledSystem from "styled-system";
import { useCursor } from "../lib/useCursor";

export type NavPageProps = StyledSystem.MarginProps & {
  pagesCount: number;
  activePage: number;
  onPageClick: (pageNumber: number) => void
}
export const NavPage: React.FC<NavPageProps> = React.memo(({ pagesCount, activePage, onPageClick, ...props }) => {
  const pages = useMemo(
    () => Array.from(Array(pagesCount).keys()),
    [pagesCount]
  );
  const [cursor, _] = useCursor("pointer");
  return (
    <Flex flexWrap="wrap" justify="center" {...props}>
      <ButtonGroup>
        {pages.map(i =>
          <Button
            cursor={cursor}
            variant="solid"
            key={i}
            isDisabled={activePage === i + 1}
            onClick={() => onPageClick(i + 1)}>
            {i + 1}
          </Button>
        )}
      </ButtonGroup>
    </Flex>
  )
});