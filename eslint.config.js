module.exports = [
  {
    ignores: ['server/node_modules/**']
  },
  {
    files: ['server/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: {
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        Promise: 'readonly',
        exports: 'readonly',
        setTimeout: 'readonly'
      }
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'off'
    }
  },
  {
    files: ['game/src/**/*.js'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      globals: {
        alert: 'readonly',
        document: 'readonly',
        io: 'readonly',
        mk: 'readonly',
        Movement: 'readonly',
        navigator: 'readonly',
        prompt: 'readonly',
        window: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly'
      }
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'off'
    }
  }
];