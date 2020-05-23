import React, { useMemo } from "react";
import { ButtonGroup, Button, Flex } from "@chakra-ui/core";
import StyledSystem from "styled-system";
import { useCursor } from "@lib/useCursor";
import { useIsLoading } from "@lib/useIsLoading";

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
  const onClicks = useMemo(
    () => pages.map(i => () => onPageClick(i + 1)),
    [pagesCount]
  );
  const [cursor, _] = useCursor("pointer");
  const isLoading = useIsLoading();
  return (
    <Flex flexWrap="wrap" justify="center" {...props}>
      <ButtonGroup>
        {pages.map(i =>
          <Button
            key={i}
            cursor={cursor}
            variant="solid"
            isDisabled={activePage === i + 1}
            onClick={onClicks[i]}
            isLoading={isLoading}>
            {i + 1}
          </Button>
        )}
      </ButtonGroup>
    </Flex>
  )
});