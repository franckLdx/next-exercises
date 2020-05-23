import { ShipDetail } from "@services/ships";
import StyledSystem from "styled-system";

export interface Props {
  ship: ShipDetail
  marginBottom?: StyledSystem.ResponsiveValue<string | number>
}