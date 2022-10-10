/*const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
});*/

const path = require('path')

const publicPath = process.env.NODE_ENV === 'production'
  ? 'https://mark.findcreek.com/'
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

  pwa: {
    workboxPluginMode: 'GenerateSW',
    name: 'MARK',
    //manifestPath: '/manifest.json'
    themeColor: '#42A3FD',
    manifestOptions: {
      display: 'standalone',
      icons: [
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png"
        },
        {
          src: "/icons/icon-256x256.png",
          sizes: "256x256",
          type: "image/png"
        },
        {
          src: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "/icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png"
        }
      ]
    }
  }
}
