// workbox-range-request.js
// 视频处理
// workbox.routing.registerRoute(
//   /.*\.(mp4|webm)/,
//   workbox.strategies.CacheFirst({
//     plugins: [
//       new workbox.rangeRequests.Plugin(),
//     ],
//   }),
//   'GET'
// )
// 静态资源缓存
workbox.routing.registerRoute(
  new RegExp('https://static.webascii.cn/.*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  }),
  'GET'
)

// 静态资源缓存(不包含sw.js、_nuxt、__webpack_hmr)
workbox.routing.registerRoute(
  new RegExp('/(?!.*(sw.js|__webpack_hmr|hot-update|hot-update|manifest).*).*'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'html',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  }),
  'GET'
)
