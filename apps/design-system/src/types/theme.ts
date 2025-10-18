export interface ThemeVariable {
  name: string;
  cssVar: string;
  description: string;
  category: "color" | "size" | "other";
  group: "base" | "brand" | "state" | "surface" | "chart" | "sidebar";
}

export interface ThemeValues {
  [key: string]: string;
}
