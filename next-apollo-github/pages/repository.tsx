import React, { useMemo, useContext } from 'react';
import 'gestalt/dist/gestalt.css';
import { NextPage } from "next";
import { gql } from 'apollo-boost';
import AppHead from '../components/AppHead';
import { useRouter } from 'next/router';
import { Repository } from '../features/Repository/data';
import { LanguageInfo } from '../features/Repository/Languages';
import { ThemedBox, ThemedBrick, ThemedHeading, ThemedText, ThemedDivider } from '../components/Themed';
import { GraphQLError } from 'graphql';
import { ThemeContext } from 'styled-components';

interface RepositoryProps {
  loading: boolean,
  error?: readonly GraphQLError[];
  data: Repository;
}

const RepositoryPage: NextPage<RepositoryProps> = ({ data }) => {
  const { margin } = useContext(ThemeContext);
  return <>
    <RepoHead />
    <ThemedBox padding={2}>
      <ThemedBrick marginBottom={margin}>
        <ThemedHeading>{data.name}</ThemedHeading>
        <ThemedDivider />
        <ThemedText>{data.description}</ThemedText>
      </ThemedBrick>
      <ThemedBrick display="flex" marginBottom={margin}>
        <LanguageInfo mainLanguage={data.primaryLanguage} languages={data.languages} />
      </ThemedBrick>
      <ThemedBrick>
        <ThemedText>{data.licenseInfo?.body}</ThemedText>
      </ThemedBrick>
    </ThemedBox >
  </>;
}

const RepoHead = () => {
  const router = useRouter();
  const title = useMemo(
    () => {
      const { name, owner } = getQueryParameters(router);
      return `${name} Repository of ${owner}`;
    },
    [router]
  );
  return <AppHead title={title} />;
}

RepositoryPage.getInitialProps = async (ctx: any) => {
  const result = await ctx.apolloClient.query({
    query: GET_REPOSITORY,
    variables: getQueryParameters(ctx),
  });
  return {
    loading: result.loading,
    errors: result.errors,
    data: result.data.repository
  };
}

const GET_REPOSITORY = gql`
query ($name: String!, $owner: String!) {
      repository(name: $name, owner: $owner) {
      name
    description
    languages(first: 50) {
      nodes {
      name
    }
    }
    licenseInfo {
      body
    }
    }
  }
  `;

function getQueryParameters(routeCtx: any) {
  return {
    name: routeCtx?.query?.name,
    owner: routeCtx?.query?.owner,
  }
}

export default RepositoryPage;