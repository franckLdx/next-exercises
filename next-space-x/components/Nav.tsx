import React from 'react';
import Link from 'next/link'
import { PseudoBox, Flex, Image } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import styled from '@emotion/styled'
import { space } from 'styled-system'

const StyledNav = styled.nav`
  ${space}
`;

interface Props {
  marginTop?: number;
  marginBottom: number;

}
export const Nav: React.FunctionComponent<Props> = React.memo(
  ({ marginTop, marginBottom }) => (
    <StyledNav marginTop={marginTop} marginBottom={marginBottom}>
      <Flex flexWrap={"wrap"}>
        <Image height="25px" src="spacex_logo_white.png" alt="SpaceX logo" />
        <NavItem href="/launches" label="Launches" />
        <NavItem href="/rockets" label="Rockets" />
      </Flex>
    </StyledNav >
  )
);

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = React.memo(
  ({ href, label }) => {
    const router = useRouter();
    const borderBottom = router.pathname === href ? "4px solid" : undefined;
    return (
      <PseudoBox color="whiteAlpha.900" marginLeft={4} paddingBottom={1} borderBottom={borderBottom} _hover={{ color: "white" }}>
        <Link href={href}>
          <a>
            {label}
          </a>
        </Link>
      </PseudoBox>
    );
  }
)