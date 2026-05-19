import { vars } from 'nativewind';

import { colorValues, type ThemeColorScheme } from './colors';

const variableNames = {
  background: '--color-background',
  foreground: '--color-foreground',
  surface: '--color-surface',
  surfaceElevated: '--color-surface-elevated',
  card: '--color-card',
  cardForeground: '--color-card-foreground',
  muted: '--color-muted',
  mutedForeground: '--color-muted-foreground',
  border: '--color-border',
  input: '--color-input',
  ring: '--color-ring',
  primary: '--color-primary',
  primaryForeground: '--color-primary-foreground',
  secondary: '--color-secondary',
  secondaryForeground: '--color-secondary-foreground',
  accent: '--color-accent',
  accentForeground: '--color-accent-foreground',
  success: '--color-success',
  warning: '--color-warning',
  danger: '--color-danger',
  dangerForeground: '--color-danger-foreground',
  glass: '--color-glass',
  overlay: '--color-overlay',
  skeletonBase: '--color-skeleton-base',
  skeletonHighlight: '--color-skeleton-highlight'
} as const;

export function createThemeVariables(scheme: ThemeColorScheme) {
  const values = colorValues[scheme];

  return vars(
    Object.fromEntries(
      Object.entries(variableNames).map(([semanticName, variableName]) => [
        variableName,
        values[semanticName as keyof typeof values]
      ])
    )
  );
}
