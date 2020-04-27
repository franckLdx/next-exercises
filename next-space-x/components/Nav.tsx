import React from 'react';
import Link from 'next/link'
import { PseudoBox, Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import styled from '@emotion/styled'
import { space } from 'styled-system'

const StyledNav = styled.nav`
  ${space}
`;

interface Props {
  marginBottom: number;
}
export const Nav: React.FunctionComponent<Props> = React.memo(
  ({ marginBottom }) => (
    <StyledNav marginBottom={marginBottom}>
      <Flex flexWrap={"wrap"}>
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
      <PseudoBox color="gray.200" marginLeft={4} paddingBottom={1} borderBottom={borderBottom} _hover={{ color: "white" }}>
        <Link href={href}>
          <a>
            {label}
          </a>
        </Link>
      </PseudoBox>
    );
  }
)