<template>
	<!--  <div class="container">-->
	<!--    <NavBar></NavBar>-->
	<!--    <div>-->
	<!--      <logo />-->
	<!--      <h1 class="title">-->
	<!--        nuxt-seo-website-->
	<!--      </h1>-->
	<!--      <h2 class="subtitle">-->
	<!--        ssr note web-->
	<!--      </h2>-->
	<!--      <div class="links">-->
	<!--        <a-->
	<!--          href="https://nuxtjs.org/"-->
	<!--          target="_blank"-->
	<!--          class="button&#45;&#45;green"-->
	<!--        >-->
	<!--          Documentation-->
	<!--        </a>-->
	<!--        <a-->
	<!--          href="https://github.com/nuxt/nuxt.js"-->
	<!--          target="_blank"-->
	<!--          class="button&#45;&#45;grey"-->
	<!--        >-->
	<!--          GitHub-->
	<!--        </a>-->
	<!--      </div>-->
	<!--    </div>-->
	<!--  </div>-->
	<div>
		<navBar></navBar>
		<div class="collection">
			<div class="row">
				<div class="row-left">
					<keep-alive>
						<Slide></Slide>
					</keep-alive>
					<keep-alive>
						<recommendContent></recommendContent>
					</keep-alive>
				</div>
				<div class="row-right">
					<keep-alive>
						<recommend-collection></recommend-collection>
					</keep-alive>
					<count-down></count-down>
				</div>
			</div>
		</div>
		<bottomFooter></bottomFooter>
	</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Logo from '~/components/Logo.vue'
  import NavBar from "~/components/NavBar.vue";
  import Slide from "~/components/Slide.vue";
  import bottomFooter from '~/components/Footer.vue'
  import recommendCollection from '~/components/RecommendCollection.vue'
  import recommendContent from '~/components/RecommendContent.vue'
  import CountDown from '~/components/CountDown.vue'

  export default Vue.extend({
    components: {
      Logo,
      NavBar,
      Slide,
      bottomFooter,
      recommendCollection,
      recommendContent,
      CountDown,
    },
    async asyncData({store, route, params, redirect, $axios}) {
      const [
        bannerList,
        recommendCategoryList,
        // articleList,
      ] = await Promise.all([
        $axios.get('/api/biji/banner/list', {
          params: {
            imageMogr2: true
          }
        }),
        $axios.get('/api/biji/category/list', {
          params: {
            type: 'hot'
          }
        }),
        // $axios.get('/api/biji/article/list', {
        //   params: {
        //     pageSize: 20,
        //     pageNum: 1
        //   }
        // }),
      ])
      if (bannerList.status === 200) {
        store.commit('global/setBannerList', bannerList.data.list)
      }
      if (recommendCategoryList.status === 200) {
        store.commit('global/setRecommendCategoryList', recommendCategoryList.data.list)
      }
      // if(articleList.status === 200) {
      //   store.commit('article/setArticleList', articleList.data.list)
      // }
      await store.dispatch('article/getList')
      // console.log(res)
    }
  })
</script>

<style lang="less">
	.collection {
		width: 1200px;
		margin: 0 auto;
		padding-top: 46px;

		.row {
			padding-top: 30px;

			&:after {
				content: "";
				display: table;
				clear: both;
			}

			.row-left {
				float: left;
				width: 840px;
			}

			.row-right {
				float: right;
				width: 340px;
			}
		}
	}
</style>
