import path, { resolve } from 'path'

export default {
  ssr: false,
  srcDir: 'src',
  target: 'static',
  head: {
    title: 'tw-game-editor',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vue-composition-api',
    '@/plugins/vue-awesome'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  modules: [
    '@nuxtjs/axios',
    ['nuxt-stylus-resources-loader', [
      resolve(__dirname, 'src/styles/console-mixin.styl'),
      resolve(__dirname, 'src/styles/console-detail-mixin.styl')
    ]]
  ],
  axios: {},
  build: {
    transpile: [/^element-ui/],
    extend (config) {
      config.resolve.alias['~domains'] = path.join(__dirname, 'domains')
    }
  },
  serverMiddleware: ['~~/server/']
}
