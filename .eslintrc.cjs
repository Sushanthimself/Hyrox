module.exports = {
  root: true,
  extends: ['expo', 'prettier'],
  ignorePatterns: ['.expo', 'node_modules', 'dist', 'build', 'coverage'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../features/*', '../../features/*'],
            message: 'Use @features/* aliases for cross-feature imports.'
          }
        ]
      }
    ]
  }
};
