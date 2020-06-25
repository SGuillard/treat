module.exports =  {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
  "extends": "airbnb",
  "env": {
    "jest": true,
    "browser": true
  },
  "rules": {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    'import/no-extraneous-dependencies': ['error',
      {
        'devDependencies': ['**/*.test.ts', '**/*.test.tsx', '.storybook/**',
          'stories/**']
      }],
    "react/jsx-filename-extension": [2, { "extensions": [".jsx" , ".tsx", ".js"]}],
    "import/prefer-default-export": "off",
    "object-shorthand": "off",
    "object-curly-newline": "off",
    "max-len": "warn",
    "no-underscore-dangle": "off",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "complexity": ["warn", 5],
    "max-nested-callbacks": ["warn", 2],
    "max-depth": ["warn", 3],
    "max-params": ["warn", 2],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  "plugins": [
    "react-hooks",
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".stories.jsx"]
      }
    }
  }
}
