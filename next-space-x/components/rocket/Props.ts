import { RocketDetail } from "@services/rockets";
import StyledSystem from "styled-system";

export type Props = StyledSystem.MarginTopProps & {
  rocket: RocketDetail;
}