import Vue from "vue"
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // preLoad: 1.77777,
  error: '//static.webascii.cn/webascii/files/404-98vo2le3tzkb.jpg?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/160/h/90',
  loading: '//static.webascii.cn/webascii/files/loading-sboylu27z9ga.svg',
  attempt: 1
})
Vue.mixin({
  methods: {
    goTop() {
      let target = 1000
      clearInterval(timer);
      let timer = setInterval(function () {
        target = document.documentElement.scrollTop || document.body.scrollTop
        target -= Math.ceil(target / 10)// 做减速运动
        window.scrollTo(0, target)
        if (target === 0) {
          clearInterval(timer);
        }
      }, 10)
    },
    // 高度
    scrollTop() {
      return Math.max(
        // chrome
        document.body.scrollTop,
        // firefox/IE
        document.documentElement.scrollTop
      )
    }
  }
})
