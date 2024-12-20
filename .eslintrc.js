// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    // Aquí puedes agregar otras reglas personalizadas
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
