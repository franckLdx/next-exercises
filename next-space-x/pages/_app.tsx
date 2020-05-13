import React from 'react';
import { AppProps } from 'next/app'
import { Nav } from '../components/Nav'
import { ThemeProvider, CSSReset, ColorModeProvider, Divider, PseudoBox, Box } from "@chakra-ui/core";
import { customTheme } from '../components/_theme'
import { Loading } from '../components/Loading';
import { SetColorTheme } from '../components/SetColorTheme';
import { useCursor } from '../lib/useCursor';

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
