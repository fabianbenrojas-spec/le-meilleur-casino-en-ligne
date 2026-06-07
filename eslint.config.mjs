import nextConfig from 'eslint-config-next'

// eslint-config-next v16 already bundles jsx-a11y — no need to add it separately
const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },
  {
    ignores: ['node_modules/**', '.next/**', 'design_handoff_casino/**', '*.html'],
  },
]

export default eslintConfig
