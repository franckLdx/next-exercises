import { gql } from 'apollo-boost';
import { client } from './client';

export interface ShipResult {
  id: string;
  name: string;
  image: string;
}

const GET_SHIPS_COUNT = gql`
  {
    shipsResult {
      result {
        totalCount
      }
    }
  }
`;
export async function getShipsCount(): Promise<number> {
  const response = await client.query({ query: GET_SHIPS_COUNT });
  return response.data.shipsResult.result.totalCount;
}

const GET_SHIPS = gql`
query($limit: Int!, $offset: Int!) {
  shipsResult(limit: $limit, offset: $offset, order: "asc", sort: "name") {
    data {
      id
      name
      image
    }
    result {
      totalCount
    }
  }
}`;
type ShipsResult = {
  ships: Array<ShipResult>;
  totalCount: number;
}
export async function getShips(pageNumber: number, pageSize: number): Promise<ShipsResult> {
  const limit = pageSize;
  const offset = (pageNumber - 1) * pageSize;
  const response = await client.query({
    query: GET_SHIPS,
    variables: { limit, offset }
  });
  return {
    ships: response.data.shipsResult.data,
    totalCount: response.data.shipsResult.result.totalCount
  };
}

interface ShipDetail {
  id: string;
  name: string;
  type: string;
  year_built: string;
  image: string;
  weight_kg: string;
  url: string;
  home_port: string;
  roles: string;
  missions: {
    flight: string;
    name: string;
  }
}

const GET_SHIP = gql`
query($shipId: ID!) {
  shipsResult(find: { id: $shipId }) {
    data {
      id
      name
      type
      year_built 
      image
      weight_kg
      url
      home_port
      roles
      missions {
        flight
        name
      }
    }
  }
}`;
export async function getShip(shipId: string): Promise<ShipDetail> {
  const response = await client.query({
    query: GET_SHIP,
    variables: { shipId }
  });
  return response.data.shipsResult.data[0];
}