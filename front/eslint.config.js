const nextPlugin = require('@next/eslint-plugin-next');
const reactRecommended = require('eslint-plugin-react/configs/recommended.js');
const tseslint = require('typescript-eslint');
const globals = require('globals');

module.exports = tseslint.config(
  // 1. グローバルな無視設定
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'build/',
      'public/',
      'next-env.d.ts',
    ],
  },

  // 2. TypeScriptの基本的な推奨設定を適用
  ...tseslint.configs.recommended,

  // 3. Reactの推奨設定を適用
  {
    ...reactRecommended,
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.browser, // ブラウザ環境のグローバル変数を有効にする
      },
    },
    // Reactのバージョンを自動で検知するように設定
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactRecommended.rules,
      // 最新のNext.jsでは不要なルールを無効化
      'react/react-in-jsx-scope': 'off',
    },
  },

  // 4. Next.jsの推奨設定を適用
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      // ESLint v9との互換性バグでクラッシュするため、このルールを一時的に無効化
      '@next/next/no-duplicate-head': 'off',
    },
  },

  // 5. ESLint設定ファイル自身へのルールを定義
  {
    files: ['eslint.config.js'],
    rules: {
      // 設定ファイル内ではrequire()を許可する
      '@typescript-eslint/no-require-imports': 'off',
    },
  }
);

