import { DefaultTheme } from "styled-components";
import { BoxProps } from "gestalt";

export const theme: DefaultTheme = {
  box: {
    color: 'orchid',
    shape: "rounded",
  },
}

declare module 'styled-components' {
  export interface DefaultTheme {
    box: Pick<BoxProps, 'color' | 'shape'>;
  }
}