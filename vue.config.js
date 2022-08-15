/*const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
});*/

const path = require('path')

const publicPath = process.env.NODE_ENV === 'production'
  ? 'https://alex-chemus.github.io/mark/'
  : '/'

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '~': path.resolve(__dirname, 'node_modules/'),
      }
    }
  },

  devServer: {
    historyApiFallback: {
      index: '/index.html'
    },
    port: process.env.PORT
  },

  publicPath
}
