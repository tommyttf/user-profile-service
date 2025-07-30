import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import * as parser from '@typescript-eslint/parser';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        programs: [parser.createProgram('tsconfig.json')],
      },
      globals: {
        node: true,
        es2022: true,
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
    ignores: ['node_modules', 'dist', 'prisma', 'coverage', '*.d.ts', '*.js', '!src/**/*.ts'],
  }
);
