import { gql } from 'apollo-boost';
import { client } from "./client";

const GET_ROCKETS = gql`{
  rockets(limit: 1000) {
    id, name
  }
}`;

export async function getRockets() {
  const response = await client.query({
    query: GET_ROCKETS,
  });
  const rockets = response.data.rockets.sort(
    (rocket1, rocket2) => {
      if (rocket1.name < rocket2.name) {
        return -1
      }
      if (rocket1.name > rocket2.name) {
        return 1
      }
      return 0
    }
  );
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