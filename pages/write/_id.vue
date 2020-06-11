<template>
    <EditContent :editArticleId="editArticleId"></EditContent>
</template>

<script>
  import EditContent from '~/components/edit/EditContent.vue'
  export default {
    name: 'WriteEdit',
    // 预请求
    async asyncData({store, route, params, redirect}) {
			return {
        editArticleId: params.id
			}
    },
    data() {
      return {}
    },
    components: {
      EditContent
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {},
  }
</script>

