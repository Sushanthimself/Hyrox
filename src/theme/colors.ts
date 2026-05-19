import { tokens } from './tokens';

export const palette = tokens.palette;
export const colors = tokens.semanticColors;
export const colorValues = tokens.colorValues;

export type ThemeColorScheme = keyof typeof colors;
export type SemanticColorName = keyof typeof colors.dark;
