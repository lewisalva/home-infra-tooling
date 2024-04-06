module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'better-styled-components',
    'simple-import-sort',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'better-styled-components/sort-declarations-alphabetically': 2,
    '@typescript-eslint/ban-ts-comment': 2,
    '@typescript-eslint/ban-types': 2,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-inferrable-types': 2,
    '@typescript-eslint/no-non-null-assertion': 2,
    '@typescript-eslint/no-redeclare': 2,
    '@typescript-eslint/no-this-alias': 2,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-use-before-define': 2,
    '@typescript-eslint/no-var-requires': 2,
    'import/default': 2,
    'import/named': 1,
    'import/namespace': 2,
    'import/no-anonymous-default-export': 2,
    'import/no-duplicates': 2,
    'import/no-named-as-default-member': 2,
    'import/no-named-as-default': 1,
    'import/no-unresolved': 2,
    'jsx-a11y/anchor-is-valid': 'off',
    'no-unused-expressions': 'off',
    'no-use-before-define': 2,
    'no-var': 2,
    'prefer-const': 2,
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error'
  },
  'settings': {
    'react': {
      'version': 'detect'
    },
    'import/resolver': {
      'typescript': true,
      'node': true,
    }
  }
}
