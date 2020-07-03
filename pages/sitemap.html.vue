<template>
  <div>
    <a v-for="(item, index) in list" :href="host + item.link" :title="item.title">{{ item.title }}</a>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    title: 'sitemap',
    head() {
      return {
        title: `sitemap - webascii.cn`,
      }
    },
    components: {
    },
    async asyncData({req, store, route, params, redirect, $axios}) {
      const res = await $axios.get('/api/biji/sitemap/map', {})
      return {
        host: 'https://' + req.headers.host,
        list: res.data.list
      }
    }
  })
</script>

<style scoped lang="less">

</style>
