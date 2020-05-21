import { gql } from 'apollo-boost';
import { client } from './client';

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

export interface ShipsResult_Detail {
  id: string;
  name: string;
  image: string;
}
type ShipsResult = {
  ships: Array<ShipsResult_Detail>;
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

export interface ShipDetail {
  id: string;
  name: string;
  type: string;
  year_built: string;
  image: string;
  weight_kg: string;
  url: string;
  home_port: string;
  roles: string[];
  missions: {
    flight: string;
    name: string;
  }[]
}

const GET_SHIP = gql`
query($shipId: ID!) {
  ship(id: $shipId) {
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
}`;
export async function getShip(shipId: string): Promise<ShipDetail> {
  const response = await client.query({
    query: GET_SHIP,
    variables: { shipId }
  });
  const ship = response.data.ship;
  if (!ship) {
    throw new Error("Unable to get a ship " + shipId)
  }
  return ship;
}

const GET_SHIP_IDS = gql`
  query{
    ships {
    id
  }
  }
`;
export async function getShipIds(): Promise<Array<SHIP_ID>> {
  const response = await client.query({
    query: GET_SHIP_IDS,
  });
  return response.data.ships;
}
export interface SHIP_ID {
  id: string
}