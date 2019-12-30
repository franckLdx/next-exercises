import React from 'react'
import 'gestalt/dist/gestalt.css';
import { NextPage, NextPageContext } from 'next';
import { ApolloClient, gql } from 'apollo-boost';
import { Repository, UserInfo } from '../features/RepositoriesWall/data';
import { User } from '../features/RepositoriesWall/User';
import Loading from '../components/Loading';
import AppHead from '../components/AppHead';
import { GraphQLError } from 'graphql/error';
import { RepositoriesWall } from '../features/RepositoriesWall/RepositoriesWall';

interface RepositoriesData {
  repositories: {
    nodes: Array<Repository>
  }
}

interface IndexProps {
  loading: boolean,
  error?: readonly GraphQLError[];
  data: UserInfo & RepositoriesData;
}

const Index: NextPage<IndexProps> = ({ loading, error, data }: IndexProps) => {
  if (loading) {
    return <Loading />
  }
  if (error) {
    throw new Error("BOOM");
  }
  return (
    <>
      <AppHead />
      <User name={data.name} bio={data.bio} />
      <RepositoriesWall repositories={data.repositories.nodes} />
    </>
  );
};

Index.getInitialProps = async (ctx: NextPageContext & { apolloClient: ApolloClient<any> }) => {
  const result = await ctx.apolloClient.query({
    query: GET_USER_REPOSITORIES
  });
  return {
    loading: result.loading,
    errors: result.errors,
    data: result.data.user
  };
}

const GET_USER_REPOSITORIES = gql`
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
`;

export default Index;