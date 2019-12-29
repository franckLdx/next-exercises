import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      // uri: "https://api.github.com/graphql",
      uri: 'https://48p1r2roz4.sse.codesandbox.io',
      cache: new InMemoryCache().restore(initialState || {})
    })
);