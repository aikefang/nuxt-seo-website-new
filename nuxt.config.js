let timeStamp = new Date().getTime()
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '笔记网 - 学的不仅是实战，更是经验!',
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0'
      },
      {hid: 'keywords', name: 'keywords', content: 'webascii,笔记,webascii.cn'},
      {hid: 'description', name: 'description', content: '让记笔记成为一种习惯'},
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
      {name: 'telephone=no', content: 'format-detection'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      // { rel: 'stylesheet', href: '/common/common.css' }
    ],
    script: [
      {src: 'https://hm.baidu.com/hm.js?8cabd1fde82e8b8e04e154ec39d7d92d'}
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
    '@/plugins/axios',
    '@/plugins/vue-filter',
    '@/plugins/mixins',
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
    extractCSS: {allChunks: true},
    // cdn 上传路径
    publicPath: `https://static.webascii.cn/webascii/business/${timeStamp}/`,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    postcss: {
      // plugins: {
      //   // Disable `postcss-url`
      //   'postcss-url': false,
      //   // Add some plugins
      //   'postcss-nested': {},
      //   'postcss-responsive-type': {},
      //   'postcss-hexrgba': {}
      // },
      preset: {
        autoprefixer: {
          // grid: true,
          remove: false
        }
      }
    },
    filenames: {
      app: ({isDev}) => isDev ? '[name].js' : '[name]-[chunkhash:6].js',
      chunk: ({isDev}) => isDev ? '[name].js' : '[name]-[chunkhash:6].js'
    }
  },
  router: {
    middleware: 'redirect',
  }
}
