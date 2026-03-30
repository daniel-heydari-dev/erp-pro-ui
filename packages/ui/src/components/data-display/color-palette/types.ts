export interface ColorSwatch {
  name: string;
  value: string;
  textColor?: "light" | "dark";
}

export interface ColorGroup {
  name: string;
  colors: ColorSwatch[];
}

export interface ColorPaletteProps {
  groups?: ColorGroup[];
  className?: string;
}
