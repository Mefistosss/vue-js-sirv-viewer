const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: false,
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       plugin: path.resolve(__dirname, '../dist/index.js')
  //     },
  //     extensions: ['.js', '.vue', '.json']
  //   }
  // },
  // chainWebpack: config => {
  //   config.resolve.alias.set('plugin', path.resolve(__dirname, '../dist/index.js'));
  // }
  pluginOptions: {
    'resolve-alias': {
      symlinks: false,
      alias: {
        // plugin: path.resolve(__dirname, '../dist/index.js')
        plugin: path.resolve(__dirname, '../dist/VueJsSirvViewer.umd.js'),
        vue: path.resolve(`./node_modules/vue`)
      }
    }
  }
})
