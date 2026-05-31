import prettier from 'eslint-config-prettier';
import nextTs from 'eslint-config-next/typescript';
import perfectionist from 'eslint-plugin-perfectionist';
import unusedImports from 'eslint-plugin-unused-imports';
import {defineConfig, globalIgnores} from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    plugins: {
      'unused-imports': unusedImports,
      perfectionist
    },
    rules: {
      'no-console': ['warn', {allow: ['warn', 'error']}],
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],

      'perfectionist/sort-imports': [
        'error',
        {
          type: 'line-length',
          order: 'asc',
          newlinesBetween: 0,

          groups: [['type-import', 'value-import']]
        }
      ],

      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'line-length',
          order: 'asc'
        }
      ]
    }
  },
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts'
  ])
]);
