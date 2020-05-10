import React, { useMemo } from "react";
import { ButtonGroup, Button, Flex } from "@chakra-ui/core";
import StyledSystem from "styled-system";

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
  return (
    <Flex flexWrap="wrap" justify="center" {...props}>
      <ButtonGroup>
        {pages.map(i =>
          <Button
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