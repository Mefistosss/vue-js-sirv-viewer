const config = {
  bail: true,
  verbose: true,
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest"
  }
};

module.exports = config;
