<template>
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
		<div class="flex-menu-right">
			<ul>
				<li class="jb-all bg-cb top no-number" @click="goTop">
					<i class="iconfont icon-huidaodingbu"></i>
					<span class="name">Top</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
  import Vue from 'vue'
  import Logo from '~/components/Logo.vue'
  import NavBar from "~/components/NavBar.vue";
  import Slide from "~/components/Slide.vue";
  import bottomFooter from '~/components/Footer.vue'
  import recommendCollection from '~/components/RecommendCollection.vue'
  import recommendContent from '~/components/RecommendContent.vue'
  import CountDown from '~/components/CountDown.vue'

  export default Vue.extend({
    head() {
      return {
        title: `笔记网_学的不仅是实战，更是经验!`,
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: `笔记网,技术社区,技术文档,javascript,vue,react,jquery,html,css,nuxtjs,electron,小程序,flutter,service worker,dart,webpack,性能优化,nodejs,java,php,python,nginx,正则表达式,mongodb,mysql,centos,linux,git`
          },
          {
            hid: 'description',
            name: 'description',
            content: '笔记网(webascii.cn)，让你全面学习前端、后端、数据库等开发知识，快速掌握开发技能。'
          }
        ]
      }
    },
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
      store.commit('global/setNavStatus', 'index')
      const [
        bannerList,
        recommendCategoryList
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
        })
      ])
      if (bannerList.status === 200) {
        store.commit('global/setBannerList', bannerList.data.list)
      }
      if (recommendCategoryList.status === 200) {
        store.commit('global/setRecommendCategoryList', recommendCategoryList.data.list)
      }
      await store.dispatch('article/getList')
    }
  })
</script>

<style scoped lang="less">
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
