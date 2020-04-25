import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { theme } from '../lib/theme'
import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo'
import { ApolloClient } from 'apollo-boost';

class MyApp extends App<{ apollo: ApolloClient<any> }> {
  render() {
    const { Component, pageProps, apollo } = this.props
    return (
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default withApollo(MyApp);