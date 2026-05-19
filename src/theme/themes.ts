import { colors } from './colors';
import { elevation } from './elevation';
import { gradients } from './gradients';
import { motion } from './motion';
import { radii } from './radii';
import { spacing } from './spacing';
import { typography } from './typography';
import { zIndex } from './z-index';

export const darkTheme = {
  color: colors.dark,
  elevation,
  gradients,
  motion,
  radii,
  spacing,
  typography,
  zIndex
} as const;

export const lightTheme = {
  color: colors.light,
  elevation,
  gradients,
  motion,
  radii,
  spacing,
  typography,
  zIndex
} as const;

export type AppTheme = typeof darkTheme;
export type ResolvedThemeMode = 'dark' | 'light';
export type ThemePreference = ResolvedThemeMode | 'system';
