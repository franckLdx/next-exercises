import React, { useMemo } from 'react';
import { PseudoBox } from '@chakra-ui/core';
import { MyNextLink } from '@components/MyNextLink';

interface Props {
  href: string;
  label: string;
  isActive?: boolean;
}

export const NavLink: React.FC<Props> = React.memo(({ href, label, isActive }) => {
  const borderBottom = useMemo(() => {
    return isActive ? "4px solid" : undefined;
  }, [isActive]);
  return (
    <PseudoBox
      color="whiteAlpha.900"
      marginLeft={4}
      paddingBottom={1}
      borderBottom={borderBottom}
      _hover={{ color: "white" }}
    >
      <MyNextLink href={href}>
        {label}
      </MyNextLink>
    </PseudoBox>
  );
});
