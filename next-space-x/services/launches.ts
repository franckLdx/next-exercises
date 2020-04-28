import { gql } from "apollo-boost";
import { client } from "./client";

const LAST_LAUNCHES = gql`
query($limit: Int!, $offset: Int!) {
  launchesPastResult(limit: $limit, offset: $offset, order:"launch_date_utc", sort:"desc") {
    data {
      id
      mission_name
      launch_date_utc
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
      links {
        flickr_images
      }
    }
    result {
      totalCount
    }
  }
}`;

export interface LaunchesResult {
  launches: any[];
  totalCount: number;
}

export async function getLaunches(pageNumber: number, pageSize: number): Promise<LaunchesResult> {
  const limit = pageSize;
  const offset = (pageNumber - 1) * pageSize;
  const response = await client.query({
    query: LAST_LAUNCHES,
    variables: { limit, offset }
  });
  return {
    launches: response.data.launchesPastResult.data,
    totalCount: response.data.launchesPastResult.result.totalCount
  };
}
