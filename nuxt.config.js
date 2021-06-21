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
      resolve(__dirname, 'src/styles/console-detail-mixin.styl'),
      resolve(__dirname, 'src/styles/resource-form-mixin.styl')
    ]]
  ],
  axios: {},
  build: {
    transpile: [/^element-ui/],
    extend (config) {
      config.resolve.alias['~domains'] = path.join(__dirname, 'domains')
      config.resolve.alias['~server'] = path.join(__dirname, 'server')
    }
  },
  serverMiddleware: ['~~/server/'],
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'map',
        path: '/',
        component: resolve(__dirname, 'src/pages/map.vue'),
        children: [
          {
            path: "",
            name: "map-images",
            component: resolve(__dirname, 'src/pages/map/Images.vue')
          }
        ]
      })

      const resourceTypes = ['Images', 'Tiles', 'Flags']
      resourceTypes.forEach(type => {
        const routeName = `map-${type.toLowerCase()}`
        routes.push({
          path: `/map/${type.toLowerCase()}`,
          name: routeName,
          component: resolve(__dirname, 'src/pages/map.vue'),
          children: [
            {
              path: "*",
              name: routeName,
              component: resolve(__dirname, `src/pages/map/${type}.vue`)
            }
          ]
        })
      })
    }
  }
}
