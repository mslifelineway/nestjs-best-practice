import js from '@eslint/js';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

const ignores = [
  'build/**/*',
  'dist/*',
  'node_modules/*',
  'coverage/**/*',
  'eslint.config.mjs',
  'src/**/*.spec.ts',
];

const languageOptions = {
  parser: typescriptEslintParser,
  parserOptions: {
    projectService: true,
  },
  globals: {
    __dirname: 'readonly',
    process: 'readonly',
    console: 'readonly',
  },
};

const rules = {
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  'no-empty-function': 'off',
  'no-unused-vars': [
    'warn',
    { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
  ],
  'no-undef': 'warn',
  'prettier/prettier': ['error', { endOfLine: 'auto' }],
  'prefer-const': 'warn',
  'no-constant-binary-expression': 'error',
  '--no-warn-ignored': 'off',
};

const plugins = {
  '@typescript-eslint': typescriptEslintPlugin,
  prettier,
};

export default [
  {
    ignores,
  },
  js.configs.recommended,
  {
    languageOptions,
    files: ['src/**/*.ts'],
    plugins,
    rules,
  },
];
