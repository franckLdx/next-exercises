import { gql } from 'apollo-boost';
import { client } from "./client";

export interface RocketResult {
  id: string;
  name: string;
}
export type RocketResults = Array<RocketResult>;

const GET_ROCKETS = gql`{
  rockets(limit: 1000) {
    id, name
  }
}`;

interface NamedRocket { name: string }
const sortByName = (rocket1: NamedRocket, rocket2: NamedRocket) => {
  if (rocket1.name < rocket2.name) {
    return -1
  }
  if (rocket1.name > rocket2.name) {
    return 1
  }
  return 0
};

export async function getRockets(): Promise<RocketResults> {
  const response = await client.query({
    query: GET_ROCKETS,
  });
  const rockets: RocketResults = response.data.rockets.sort(sortByName);
  return rockets;
}

const GET_ROCKET = gql`
query($id: ID!) {
  rocket(id: $id) {
    id, name, description, wikipedia 
    cost_per_launch,
    diameter { meters }
    height { meters }
    mass { kg }
    payload_weights { id name kg }
    success_rate_pct
    first_stage {
      burn_time_sec
      engines
      fuel_amount_tons
      reusable
      thrust_sea_level {
        kN
      }
      thrust_vacuum {
        kN
      }
    }
    second_stage {
      engines
      burn_time_sec
      fuel_amount_tons
      thrust {
        kN
      }
    }
  }
}`;
export async function getRocket(id: string) {
  const response = await client.query({
    query: GET_ROCKET,
    variables: { id }
  });
  return response.data.rocket;
}