import type { ViewStyle } from 'react-native';

import { tokens } from './tokens';

export const elevation = tokens.elevation;

export type ElevationToken = keyof typeof elevation;

export function getElevationStyle(token: ElevationToken = 'none'): ViewStyle {
  return elevation[token] as ViewStyle;
}
