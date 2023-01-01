module.exports = {
  plugins: [
    'babel'
  ],
  ignorePatterns: ['dist/', 'node_modules/', '*.config.js', '.eslintrc.js'],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/typescript/recommended'
  ],
  parser: 'vue-eslint-parser',
  rules: {
    'semi': ['error', 'never'],
    'no-console': 'warn',
    'max-len': [
      'error',
      {
        code: 160
      }
    ],
    '@typescript-eslint/indent': ['warn', 2],
    'no-unexpected-multiline': 'error',
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'vue/script-setup-uses-vars': 'error',
    // 'sort-imports': ['error', {
    //   'ignoreCase': false,
    //   'ignoreDeclarationSort': false,
    //   'ignoreMemberSort': false,
    //   'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
    //   'allowSeparatedGroups': false
    // }],
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true,
        'avoidEscape': true
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        'varsIgnorePattern': '^_',
        'argsIgnorePattern': '^_'
      }
    ],
    '@typescript-eslint/triple-slash-reference': ['off'],
    '@typescript-eslint/ban-ts-comment': ['warn'],
    'object-curly-spacing': ['error', 'always']
  }
}