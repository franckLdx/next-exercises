import { RocketDetail } from "@services/rockets";
import StyledSystem from "styled-system";

export type SubComponentProps = StyledSystem.MarginProps & {
  rocket: RocketDetail;
}