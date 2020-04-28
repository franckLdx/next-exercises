import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

export const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
  fetch
});
