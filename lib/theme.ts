import { DefaultTheme } from "styled-components";
import { BoxProps, HeaderProps } from "gestalt";

type Margin = ValueOf<Pick<BoxProps, 'margin'>>;
type ValueOf<T> = T[keyof T];
type Color = ValueOf<Pick<BoxProps, 'color'>>

const margin: Margin = 2;
const mainColor: Color = "purple";
const secondaryColor: Color = "lightGray";

export const theme: DefaultTheme = {
  margin,
  box: {
    color: mainColor,
    shape: "rounded",
  },
  brick: {
    color: secondaryColor,
    shape: "rounded",
    padding: 2,
  },
  divider: {
    color: mainColor,
    height: 2,
    marginBottom: margin,
  },
  header: {
    size: "xs",
    color: mainColor,
  },
}

declare module 'styled-components' {
  export interface DefaultTheme {
    margin: Margin;
    box: Pick<BoxProps, 'color' | 'shape'>;
    brick: Pick<BoxProps, 'color' | 'shape' | 'padding'>;
    divider: Pick<BoxProps, 'color' | 'height' | 'marginBottom'>;
    header: Pick<HeaderProps, 'color' | 'size'>;
  }
}
