const tokens = require('./design-tokens.json');

const colorVar = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;
const pxScale = (scale) =>
  Object.fromEntries(Object.entries(scale).map(([key, value]) => [key, `${value}px`]));
const fontScale = Object.fromEntries(
  Object.entries(tokens.typography.fontSize).map(([key, value]) => [
    key,
    [
      `${value}px`,
      {
        lineHeight: `${tokens.typography.lineHeight[key]}px`,
        letterSpacing: '0px'
      }
    ]
  ])
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: colorVar('background'),
        foreground: colorVar('foreground'),
        surface: colorVar('surface'),
        'surface-elevated': colorVar('surface-elevated'),
        card: colorVar('card'),
        'card-foreground': colorVar('card-foreground'),
        muted: colorVar('muted'),
        'muted-foreground': colorVar('muted-foreground'),
        border: colorVar('border'),
        input: colorVar('input'),
        ring: colorVar('ring'),
        primary: colorVar('primary'),
        'primary-foreground': colorVar('primary-foreground'),
        secondary: colorVar('secondary'),
        'secondary-foreground': colorVar('secondary-foreground'),
        accent: colorVar('accent'),
        'accent-foreground': colorVar('accent-foreground'),
        success: colorVar('success'),
        warning: colorVar('warning'),
        danger: colorVar('danger'),
        'danger-foreground': colorVar('danger-foreground'),
        glass: colorVar('glass'),
        overlay: colorVar('overlay'),
        skeleton: colorVar('skeleton-base'),
        'skeleton-highlight': colorVar('skeleton-highlight'),
        rank: {
          bronze: '#B87333',
          silver: '#C0C7D1',
          gold: '#FFD166',
          platinum: '#7DD3FC',
          elite: '#A78BFA',
          champion: '#FF3B5C'
        }
      },
      spacing: pxScale(tokens.spacing),
      borderRadius: pxScale(tokens.radii),
      fontFamily: tokens.typography.fontFamily,
      fontSize: fontScale,
      fontWeight: tokens.typography.fontWeight,
      boxShadow: {
        sm: '0 4px 10px rgba(0, 0, 0, 0.14)',
        md: '0 10px 18px rgba(0, 0, 0, 0.2)',
        glow: '0 12px 22px rgba(47, 128, 255, 0.28)'
      },
      transitionDuration: Object.fromEntries(
        Object.entries(tokens.motion.duration).map(([key, value]) => [key, `${value}ms`])
      ),
      zIndex: tokens.zIndex
    }
  },
  plugins: []
};
