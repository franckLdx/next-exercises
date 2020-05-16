import { gql } from 'apollo-boost';
import { client } from "./client";
import { number } from 'prop-types';

export interface RocketItem {
  id: string;
  name: string;
}
export type RocketsList = Array<RocketItem>;

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

export async function getRockets(): Promise<RocketsList> {
  const response = await client.query({
    query: GET_ROCKETS,
  });
  const rockets: RocketsList = response.data.rockets.sort(sortByName);
  return rockets;
}

export interface RocketDetail {
  id: string;
  name: string;
  description: string;
  wikipedia: string;
  cost_per_launch,
  diameter: { meters: number },
  height: { meters: number },
  mass: { kg: string },
  payload_weights: { id: string, name: string, kg: number },
  success_rate_pct: number,
  first_stage: {
    burn_time_sec: number,
    engines: number,
    fuel_amount_tons: number,
    reusable: boolean,
    thrust_sea_level: {
      kN: number
    },
    thrust_vacuum: {
      kN: number
    },
  },
  second_stage: {
    engines: number,
    burn_time_sec: number,
    fuel_amount_tons: number,
    thrust: {
      kN: number
    }
  }
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
export async function getRocket(id: string): Promise<RocketDetail> {
  const response = await client.query({
    query: GET_ROCKET,
    variables: { id }
  });
  return response.data.rocket;
}