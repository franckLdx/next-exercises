import React, { useCallback } from "react";
import { NavPage } from "@navigation/NavPage";
import { getShipsUrl } from "@lib/url";
import { useRouter } from "next/router";

interface Props {
  activePage: number;
  pagesCount: number;
}

export const ShipNavPage: React.FC<Props> = ({ activePage, pagesCount }) => {
  const router = useRouter()
  const onClick = useCallback((pageNumber: number) => {
    const href = getShipsUrl(pageNumber);
    router.push(href);
  }, []);
  return (
    <NavPage
      marginY={3}
      activePage={activePage}
      pagesCount={pagesCount}
      onPageClick={onClick}
    />
  );
}