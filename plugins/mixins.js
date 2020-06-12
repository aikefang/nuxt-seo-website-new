import Vue from "vue"

Vue.mixin({
  methods: {
    goTop() {
      let target = 0
      clearInterval(timer);
      let timer = setInterval(function () {
        target = document.documentElement.scrollTop || document.body.scrollTop
        target -= Math.ceil(target / 10)// 做减速运动
        window.scrollTo(0, target)
        if (target == 0) {
          clearInterval(timer);
        }
      }, 10)
    }
  }
})