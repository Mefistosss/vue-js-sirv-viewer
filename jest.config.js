const config = {
  bail: true,
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest"
  }
};

module.exports = config;
