module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "no-debugger":"off",
        'indent': 'off',
        "react/react-in-jsx-scope": "off",
        "linebreak-style": 0,
        "semi": [
            "error",
            "always"
        ],
        '@typescript-eslint/ban-types': [
            'error',
            {
                extendDefaults: true,
                types: {
                    "Function": false,
                },
            },
        ],
        "@typescript-eslint/no-inferrable-types": [
            2,
            {
              "ignoreParameters": true
            }
          ],
        "no-inline-comments": "error",
        "no-console": [
            "error",
            {
              "allow": ["warn", "error"]
            }
        ],
        // "no-unused-vars": "off",
        // "@typescript-eslint/no-unused-vars": "error",
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "react/prop-types": 0,
        "react/display-name": "off",
        "no-extra-boolean-cast": 0,
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        '@typescript-eslint/no-non-null-assertion': 'off'
    }
};