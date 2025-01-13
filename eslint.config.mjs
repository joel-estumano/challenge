import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: {
		parserOptions: {
			ecmaVersion: 2020,
			sourceType: 'module'
		}
	}
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript', 'eslint:recommended', 'plugin:prettier/recommended'),
	{
		files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
		ignores: ['node_modules/'],
		rules: {
			'prettier/prettier': ['error', {}, { usePrettierrc: true }],
			'@typescript-eslint/no-unused-vars': 'off'
		},
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module'
			}
		},
		plugins: {
			prettier: eslintPluginPrettier
		}
	}
];

export default eslintConfig;
