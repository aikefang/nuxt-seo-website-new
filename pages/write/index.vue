<template>
	<EditContent></EditContent>
</template>

<script>
  import EditContent from '~/components/edit/EditContent.vue'

  export default {
    name: 'Write',
    //预请求
    async asyncData({store, route, params, redirect, $axios}) {

    },
    // 页面进入之后 返回顶部
//    scrollToTop: true,
    data() {
      return {}
    },
    components: {
      EditContent
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {
    },
  }
</script>

