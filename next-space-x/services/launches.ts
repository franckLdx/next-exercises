import { gql } from "apollo-boost";
import { client } from "./client";
import { sortByLaunchDate } from "@lib/misc";
import { string } from "prop-types";

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

export interface LaunchItem {
  id: string;
  mission_name: string;
  launch_date_utc: string;
  launch_site: {
    site_name_long: string;
  }
  rocket: {
    rocket_name: string;
  }
  links: {
    flickr_images: string[];
  }
}

export interface LaunchesList {
  launches: LaunchItem[];
  totalCount: number;
}

export async function getLaunches(pageNumber: number, pageSize: number): Promise<LaunchesList> {
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


const GET_LAUNCH = gql`
query($id: ID!) {
  launch(id: $id) {
    id
    mission_name
    details
    launch_date_utc
    launch_site {
      site_name_long
    }
    links {
      mission_patch
      flickr_images
      mission_patch_small
      wikipedia
      video_link
    }
    rocket {
      rocket_name
      rocket_type
      rocket {
        id
      }
    }
    ships {
      id
      name
      model
      image
    }
  }
}`;

export interface LaunchDetail_Ship {
  id: string;
  name: string;
  model: string;
  image: string;
}
export interface LaunchDetail {
  id: string;
  mission_name: string;
  details: string;
  launch_date_utc: string;
  launch_site: {
    site_name_long: string;
  }
  links: {
    mission_patch: string;
    flickr_images: string[];
    wikipedia: string;
    video_link: string;
  }
  rocket: {
    rocket_name: string;
    rocket_type: string;
    rocket: {
      id: string;
    }
  }
  ships: LaunchDetail_Ship[]
}

export async function getLaunch(id: number): Promise<LaunchDetail> {
  const response = await client.query({
    query: GET_LAUNCH,
    variables: { id }
  });
  return response.data.launch;
}


export interface LaunchRocketResult {
  id: string
  launch_date_utc: string
  mission_name: string
}

const GET_ROCKET_LAUNCHES = gql`
query ($rocketId: String!) {
  launches(find: {rocket_id: $rocketId}, order:"launch_date_utc", sort:"desc") {
    id
    launch_date_utc
    mission_name
  }
}`;

export async function getRocketLaunches(rocketId: string): Promise<Array<LaunchRocketResult>> {
  const response = await client.query({
    query: GET_ROCKET_LAUNCHES,
    variables: { rocketId }
  });
  return response.data.launches.sort(
    sortByLaunchDate
  ) as Array<LaunchRocketResult>;
}