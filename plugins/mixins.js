import Vue from "vue"
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
