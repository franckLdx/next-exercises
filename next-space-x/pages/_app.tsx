import React from 'react';
import { AppProps } from 'next/app'
import { Nav } from '../components/Nav'
import { ThemeProvider } from "@chakra-ui/core";
import { customTheme } from './_theme'
import { Loading } from '../components/Loading';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Nav />
        <Loading />
        <Component {...pageProps} />
      </ThemeProvider>
    </>)
}
