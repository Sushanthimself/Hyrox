module.exports = function babelConfig(api) {
  api.cache(true);

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@bootstrap': './src/bootstrap',
            '@components': './src/components',
            '@constants': './src/constants',
            '@features': './src/features',
            '@hooks': './src/hooks',
            '@lib': './src/lib',
            '@motion': './src/motion',
            '@navigation': './src/navigation',
            '@providers': './src/providers',
            '@services': './src/services',
            '@store': './src/store',
            '@theme': './src/theme',
            '@types': './src/types',
            '@utils': './src/utils'
          },
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json'
          ]
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
