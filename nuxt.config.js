import webpack from 'webpack'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-todo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  // ssr: false,

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/style.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/vuetify',
    
  ],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/dotenv',
    ['@nuxtjs/moment', ['ja']]
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // グローバルなモジュール
        _: 'lodash',
      })
    ],
    extend (config) {
      config.performance = config.performance || {}
      config.performance.maxEntrypointSize = 3000 * 1024
      config.performance.maxAssetSize = 3000 * 1024
    },
  }
}
