import React, { useCallback } from "react";
import { NavPage } from "@navigation/NavPage";
import { useRouter } from "next/router";
import { getLaunchesUrl } from "@lib/url";

interface Props {
  activePage: number;
  pagesCount: number;
}

export const LaunchNavBar: React.FC<Props> = ({ activePage, pagesCount }) => {
  const router = useRouter()
  const onPageClick = useCallback(
    (pageNumber: number) => {
      const href = getLaunchesUrl(pageNumber);
      router.push(href)
    },
    []
  );
  return (
    <NavPage
      marginTop="3"
      activePage={activePage}
      pagesCount={pagesCount}
      onPageClick={onPageClick}
    />
  );
}