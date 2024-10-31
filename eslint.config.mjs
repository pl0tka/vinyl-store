import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import tseslint from 'typescript-eslint';
import typescriptParser from '@typescript-eslint/parser';

export default tseslint.config(
    ...tseslint.configs.recommended,
    {
        ignores: ['dist/**', 'eslint.config.mjs', 'coverage/**'],
    },
    {
        languageOptions: {
            globals: globals.node,
            parser: typescriptParser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                project: ['./tsconfig.json'],
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
        },
        rules: {
            indent: ['error', 4],
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'prefer-const': 'error',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-extraneous-class': 'off',
            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
    prettier,
    pluginJs.configs.recommended
);
