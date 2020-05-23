import { ShipDetail } from "@services/ships";
import StyledSystem from "styled-system";

export type Props = StyledSystem.MarginTopProps & {
  ship: ShipDetail
}