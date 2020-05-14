import React from 'react';
import { AppProps } from 'next/app'
import { ThemeProvider, CSSReset, ColorModeProvider, Divider, PseudoBox, Box } from "@chakra-ui/core";
import { useCursor } from '@lib/useCursor';
import { customTheme } from '@components/_theme';
import { SetColorTheme } from '@components/SetColorTheme';
import { Nav } from '@components/Nav';
import { Loading } from '@components/Loading';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [cursor, _] = useCursor("pointer");
  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <CSSReset />
        <SetColorTheme color="dark" />
        <Box marginTop={4} paddingBottom={1} marginBottom={2} borderBottom="2px solid white">
          <Nav marginBottom={2} />
          <Loading />
        </Box>
        <Box cursor={cursor}>
          <Component {...pageProps} />
        </Box>
      </ColorModeProvider>
    </ThemeProvider >
  )
}
