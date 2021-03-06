let timeStamp = new Date().getTime()
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head() {
    const script = []
    if (process.env.NODE_ENV !== 'development') {
      script.push({src: 'https://hm.baidu.com/hm.js?8cabd1fde82e8b8e04e154ec39d7d92d'})
    }

    return {
      title: '笔记网_学的不仅是实战，更是经验!',
      meta: [
        {charset: 'utf-8'},
        {
          name: 'viewport',
          content: 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0'
        },
        {hid: 'keywords', name: 'keywords', content: 'webascii,笔记,webascii.cn'},
        {hid: 'description', name: 'description', content: '笔记网(webascii.cn)，让你全面学习前端、后端、数据库等开发知识，快速掌握开发技能。'},
        {name: 'apple-mobile-web-app-capable', content: 'yes'},
        {name: 'apple-mobile-web-app-status-bar-style', content: 'black'},
        {name: 'telephone=no', content: 'format-detection'},
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        // { rel: 'stylesheet', href: '/common/common.css' }
      ],
      script,
    }
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
    // '@/plugins/lazyload'
    {
      src: '~/plugins/lazyload', ssr: false
    },
    { src: '~/plugins/ga.js', ssr: false, mode: 'client' }

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
    ['@nuxtjs/pwa', {
      // dev: false,
      // icon: false,
      meta: false,
      workbox: {
        // importScripts: [
        //   'custom-sw.js'
        // ],
        // swURL: 'static.webascii.cn/webascii/sw.js',
        // publicPath: 'https://static.webascii.cn/',
        workboxURL: 'https://static.webascii.cn/webascii/service-worker/workbox-v4.2.0/workbox-sw.js',
        cacheAssets: false,
        offline: true,
        offlinePage: false,
        config: {
          modulePathPrefix: 'https://static.webascii.cn/webascii/service-worker/workbox-v4.2.0',
          debug: false
        },
        cachingExtensions: '@/plugins/workbox-range-request.js',
      }
    }]
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
      target: process.env.NODE_ENV == 'development' ? 'http://localhost:2020' : 'https://v2.api.webascii.cn', // api主机
      changeOrigin: true,
      pathRewrite: {'^/api': '/api'}
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    // extractCSS: {allChunks: true},
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
    },
    vendor:['vue-lazyload'],
  },
  router: {
    middleware: 'redirect',
  }
}
