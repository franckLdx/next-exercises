import React from 'react'
import 'gestalt/dist/gestalt.css';
import { NextPage, NextPageContext } from 'next';
import AppHead from '../components/AppHead'
import { ApolloClient, gql, NetworkStatus } from 'apollo-boost';
import { RepositoryBrick, RepositoryBrickData } from '../components/RepositoryBrick';
import { Masonry } from 'gestalt';
import { UserInfo, UserInfoProps } from '../components/UserInfo';

interface Repository {
  nodes: Array<RepositoryBrickData>
}

interface IndexProps {
  networkStatus: NetworkStatus,
  user: UserInfoProps & {
    repositories: Repository;
  }
}

const Index: NextPage<IndexProps> = ({ networkStatus, user }: IndexProps) => {
  return (
    <>
      <AppHead />
      <UserInfo
        name={user.name}
        bio={user.bio}
      />
      <Masonry
        comp={RepositoryBrick as any}
        items={user.repositories.nodes}
        minCols={1}
        gutterWidth={6}
      />
    </>
  );
};

Index.getInitialProps = async (ctx: NextPageContext & { apolloClient: ApolloClient<any> }) => {
  const result = await ctx.apolloClient
    .query({
      query: gql`
      {
        user(login: "franckLdx") {
          name
          bio
          repositories(first: 50) {
            nodes {
              name
              description
              licenseInfo {
                key, description
              }
              languages(first: 50) {
                nodes {
                  name
                }
              }
            }
            totalCount
          }
        }
      }
`
    });
  const { networkStatus, data: { user } } = result
  return { networkStatus, user };
}

export default Index;