module.exports = {
    root: true,

    env: {
        browser: true,
        node: true
    },

    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],

    ignorePatterns: ['**/*.js.snap'],

    rules: {
        indent: ['error', 4],
        'vue/html-indent': ['error', 4],
        'max-len': ['error', { code: 160 }],
        'vue/no-duplicate-attributes': [
            'error',
            {
                allowCoexistClass: true,
                allowCoexistStyle: true
            }
        ],
        'vue/no-v-html': 0,
        'vue/no-use-v-if-with-v-for': [
            'warn',
            {
                allowUsingIterationVar: true
            }
        ],
        'vue/html-closing-bracket-newline': [
            'warn',
            {
                singleline: 'never',
                multiline: 'always'
            }
        ],
        'vue/max-attributes-per-line': ['error', {
            singleline: 1,
            multiline: {
                max: 1,
                allowFirstLine: true
            }
        }],
        'vue/no-multiple-template-root': 'off',
        'vue/attributes-order': ['error', {
            order: [
                'DEFINITION',
                'LIST_RENDERING',
                'CONDITIONALS',
                'RENDER_MODIFIERS',
                'GLOBAL',
                ['UNIQUE', 'SLOT'],
                'TWO_WAY_BINDING',
                'OTHER_DIRECTIVES',
                'OTHER_ATTR',
                'CONTENT',
                'EVENTS'
            ],
            alphabetical: false
        }],
        'vue/require-default-prop': 'warn',
        'import/extensions': [
            'error',
            'never',
            {
                js: 'never',
                ts: 'never',
                mjs: 'never',
                jsx: 'never',
                tsx: 'never',
                vue: 'ignorePackages'
            }
        ],
        // 'sort-imports': ['error', {
        //     ignoreCase: true,
        //     ignoreDeclarationSort: true,
        //     ignoreMemberSort: true,
        //     memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        //     allowSeparatedGroups: true
        // }],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': 0,
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'import/no-cycle': 'off',
        'no-underscore-dangle': 'off',
        'prefer-const': 'off',
        'global-require': 'off',
        'no-use-before-define': 'off',
        'no-useless-escape': 'off',
        'no-trailing-spaces': 'warn',
        'no-undef': 'warn',
        'no-unused-vars': 'warn',
        semi: 'warn',
        'import/no-extraneous-dependencies': [
            0,
            {
                devDependencies: false,
                optionalDependencies: false,
                peerDependencies: false
            }],
        allowImportExportEverywhere: 0,
        'import/no-dynamic-import': 'off',
        'func-names': 'off',
        'object-curly-newline': 'off',
        camelcase: [
            0,
            {
                properties: 'never', // does not check property names
                ignoreDestructuring: true, // does not check destructured identifiers (but still checks any use of those identifiers later in the code)
                ignoreImports: true, // does not check ES2015 imports (but still checks any use of the imports later in the code except function arguments)
                ignoreGlobals: true // does not enforce camelcase style for global variables
            }
        ],
        'nuxt/no-env-in-hooks': 'off',
        'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
        'no-plusplus': ['error',
            { allowForLoopAfterthoughts: true }
        ],
        'arrow-body-style': ['error', 'as-needed'],
        'no-shadow': 'off',
        'no-param-reassign': 'warn',
        'no-return-await': 'warn',
        'comma-dangle': 'off'
    },

    parserOptions: {
        parser: '@typescript-eslint/parser'
    },

    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        },
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        },
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        },
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
};
