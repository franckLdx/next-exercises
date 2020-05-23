import React, { useCallback, useMemo } from 'react';
import StyledSystem from "styled-system";
import { NavBar } from '@navigation/NavBar';
import { NavLink } from '@navigation/NavLink';
import { Image } from '@chakra-ui/core';
import { getLaunchesUrl, getRocketsUrl, getShipsUrl } from '@lib/url';
import { useRouter } from 'next/router';

const getUrlPart = (url: string, part: number) =>
  url.replace(/\?.*/g, '').split('/')[part] ?? '';

const launchesIndex = getLaunchesUrl();
const rocketsIndex = getRocketsUrl();
const shipsIndex = getShipsUrl();

export const AppNavBar: React.FunctionComponent<StyledSystem.MarginProps> = React.memo(
  ({ ...props }) => {
    const router = useRouter();
    const isActive = useCallback(
      (href: string) => getUrlPart(router.pathname, 1) === getUrlPart(href, 1)
      ,
      [router.pathname]
    );
    return (
      <NavBar {...props}>
        <Image height="25px" src="/spacex_logo_white.png" alt="SpaceX logo" />
        <NavLink key={launchesIndex} href={launchesIndex} isActive={isActive(launchesIndex)} label="Launches" />
        <NavLink key={rocketsIndex} href={rocketsIndex} isActive={isActive(rocketsIndex)} label="Rockets" />
        <NavLink key={shipsIndex} href={shipsIndex} isActive={isActive(shipsIndex)} label="Ships" />
      </NavBar>
    )
  }
);

