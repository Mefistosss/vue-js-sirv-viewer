const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: false,
  pages: {
    index: {
      entry: 'src/index.js'
    }
  },
  configureWebpack: {
		output: {
			filename: '[name].js',
			chunkFilename: '[name].js',
		}
	},
  chainWebpack: config => {
    config.plugins.delete('html-index');
    config.plugins.delete('html');
    // config.plugins.delete('preload');
    // config.plugins.delete('prefetch');
  }
})
