import React, { useCallback } from "react";
import { NavPage } from "@navigation/NavPage";
import { getShipsUrl } from "@lib/url";

interface Props {
  activePage: number;
  pagesCount: number;
}

export const ShipNavPage: React.FC<Props> = ({ activePage, pagesCount }) => {
  const onClick = useCallback(getShipsUrl, []);
  return (
    <NavPage
      marginY={3}
      activePage={activePage}
      pagesCount={pagesCount}
      onPageClick={onClick}
    />
  );
}