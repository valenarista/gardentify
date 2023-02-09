const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: ['gardentify'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
});
