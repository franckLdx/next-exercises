import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { token } from "../.token"

export default withApollo(
  ({ initialState }) => new ApolloClient({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache().restore(initialState || {}),
    headers: { authorization: `Bearer ${token}` },
  })
);
