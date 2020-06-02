
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ea6f5a' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  // axios: {
  //   proxy: true
  // },
  proxy: {
    // '/v2/api': {
    //   target: process.env.NODE_ENV == 'development' ? 'http://localhost:2020' : 'https://new.api.webascii.cn', // api主机
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/v2/api': process.env.NODE_ENV == 'development' ? '/api' : '/v2/api'
    //   }
    // },
    '/api': {
      target: process.env.NODE_ENV == 'development' ? 'http://localhost:2020' : 'https://new.api.webascii.cn', // api主机
      changeOrigin: true,
      pathRewrite: {'^/api': '/api'}
    },
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
