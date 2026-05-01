/** @type {import('prettier').Config} */
const config = {
  singleQuote: true,
  semi: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',
    '^next',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
};

export default config;
