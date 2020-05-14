import React, { useMemo } from 'react';
import { PseudoBox, Flex, Image } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { getLaunchesUrl, getRocketsUrl, getShipsUrl } from '../lib/url';
import { MyNextLink } from './MyNextLink';
import StyledSystem from "styled-system";

export const Nav: React.FunctionComponent<StyledSystem.MarginProps> = React.memo(
  ({ ...props }) => (
    <Flex flexWrap={"wrap"} {...props}>
      <Image height="25px" src="spacex_logo_white.png" alt="SpaceX logo" />
      <NavItem href={getLaunchesUrl()} label="Launches" />
      <NavItem href={getRocketsUrl()} label="Rockets" />
      <NavItem href={getShipsUrl()} label="Ships" />
    </Flex>
  )
);

interface NavItemProps {
  href: string;
  label: string;
}

const getBaseUrl = (url: string) => url.replace(/\?.*/g, '').toLowerCase()

const NavItem: React.FC<NavItemProps> = React.memo(
  ({ href, label }) => {
    const router = useRouter();
    const borderBottom = useMemo(
      () => {
        const baseHref = getBaseUrl(href);
        const baseCurrent = getBaseUrl(router.pathname);
        return baseCurrent === baseHref ? "4px solid" : undefined
      },
      [router.pathname, href]
    );
    return (
      <PseudoBox color="whiteAlpha.900" marginLeft={4} paddingBottom={1} borderBottom={borderBottom} _hover={{ color: "white" }}>
        <MyNextLink href={href}>
          {label}
        </MyNextLink>
      </PseudoBox>
    );
  }
)