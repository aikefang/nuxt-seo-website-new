import Vue from "vue"
import VueLazyload from 'vue-lazyload'
console.log(123, process)
if (process.browser) {
  console.log(1111222)
}
Vue.use(VueLazyload, {
  // preLoad: 1.77777,
  error: '//static.webascii.cn/webascii/files/404-98vo2le3tzkb.jpg?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/160/h/90',
  // loading: '//static.webascii.cn/webascii/files/loading-sboylu27z9ga.svg',
  attempt: 1
})
