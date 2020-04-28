import React from 'react';
import { AppProps } from 'next/app'
import { Nav } from '../components/Nav'
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { customTheme } from '../components/_theme'
import { Loading } from '../components/Loading';
import { SetColorTheme } from '../components/setColorTheme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <CSSReset />
        <SetColorTheme color="dark" />
        <Nav marginBottom={2} />
        <Loading marginBottom={2} />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  )
}
