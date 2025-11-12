export type TabPosition = "top" | "bottom" | "left" | "right";
export type TabSize = "sm" | "md" | "lg";
export type TabVariant =
  | "solid" // Default muted background with shadow on active
  | "bordered" // Border around group + colored background on active
  | "pills" // Colored pills without group border
  | "pill-stroke" // Pill-style with stroke border, no background on active
  | "text" // Text color only, minimal style
  | "outline" // Outlined/stroked border on active
  | "underlined" // Underline/border-bottom style
  | "enclosed" // Browser tab style, connects to content
  | "enclosed-fill"; // Browser tab style with background on inactive tabs
export type TabColor =
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "destructive"
  | "success"
  | "warning";
export type TabOverflowMode =
  | "scroll" // Scrollable tabs when overflow
  | "dropdown" // Show only visible tabs, rest in dropdown menu
  | "fade"; // Show all tabs with fade effect and dropdown button

export interface TabItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export type TabAlignment = "start" | "center" | "end";
