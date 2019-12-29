import React, { useContext } from 'react'
import 'gestalt/dist/gestalt.css';
import { NextPage, NextPageContext } from 'next';
import AppHead from '../components/AppHead'
import { Box } from 'gestalt';
import { ThemeContext } from 'styled-components';
import { ApolloClient, gql } from 'apollo-boost';

const Index: NextPage = (data: any) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <AppHead />
      {data.data.rates.map((d: any) => <Box
        key={d.currency}
        {...theme.box}
        paddingX={3}
        marginBottom={3}
        color="lightGray"
      >
        {d.currency}
      </Box>)
      }
    </>
  );
};

Index.getInitialProps = async (ctx: NextPageContext & { apolloClient: ApolloClient<any> }) => {
  console.log("loading");
  const result = await ctx.apolloClient
    .query({
      query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `
    });
  return result;
}

export default Index;