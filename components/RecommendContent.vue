<template>
	<div class="list-container">
		<ul class="note-list">
			<li v-for="item in article.articleList" :key="item.id" :class="{'have-img' : !!item.articleImageView != false}">
				<a :href="'/article/' + item._id + '/'" class="wrap-img" v-if="!!item.articleImageView != false">
					<img v-lazy="item.articleImageView2" :alt="item.title" class="img-blur-done lazy-img-fadein">
				</a>
				<div class="content">
					<a :href="'/article/' + item._id + '/'" class="title tof">{{ item.title }}</a>
					<!--<div class="author">-->
					<!--<a class="avatar">-->
					<!--<img :src="item.headImg" alt="">-->
					<!--</a>-->
					<!--<div class="info">-->
					<!--<a class="nickname">{{item.authorName}}</a>-->
					<!--<span class="time">{{item.cTime | format('yyyy-MM-dd hh:mm')}}</span>-->
					<!--</div>-->
					<!--</div>-->

					<div class="abstract wrap">
						{{item.articleDescribe}}
					</div>
				</div>
				<div class="meta">
					<router-link :to="'/category/' + item.levelFirst.seo + '/' + item.levelSecond.seo + '/'" class="collection-tag">
						{{ item.levelSecond.title }}
					</router-link>
					<a class="num">
						<i class="iconfont icon-browse"></i>
						{{item.views}}
					</a>
					<div class="author">
						<a class="avatar">
							<img v-lazy="item.author.headImg" :alt="item.author.nickname">
						</a>
						<div class="info">
							<a class="nickname">{{ item.author.nickname }}</a>
							<span class="time" :data-origin-time="item.cTime">{{item.simplifyCTime}}</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<!-- 加载中骨架图 -->
		<IndexArticleList v-show="isLoading && article.more"></IndexArticleList>
		<a class="jb-all load-more bg-cb" v-show="!isLoading && article.more && article.pageNum >= 5" @click="loadMore">
			<span>阅读更多</span>
		</a>
		<div class="article-empty" v-show="!article.more && !article.loading">
			<i class="iconfont icon-kong"></i>
			<span>暂无更多~</span>
		</div>
	</div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import IndexArticleList from '~/components/skeleton/IndexArticleList.vue'


  export default {
    name: 'recommend-content',
    data() {
      return {
        isLoading: false
			}
    },
    components: {
      IndexArticleList
		},
    computed: {
      ...mapState(['article']),
    },
    mounted() {
      // console.log(this.article)
      this.isLoading = false
			// return
      window.onscroll = () => {
        // console.log(123123)
        // 距离底部200px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - this.scrollTop() - window.innerHeight <= 200
        if (bottomOfWindow && this.isLoading === false && this.article.more && this.article.pageNum < 5) {
          this.isLoading = true
          this.page++
          setTimeout(async () => {
            // console.log('load')
            await this.$store.dispatch('article/getList')
            this.isLoading = false
          }, 300)
        }
      }
    },
    methods: {
      async loadMore() {
        // console.log(123123123)
        this.isLoading = true
        setTimeout(async () => {
          console.log('load')
          await this.$store.dispatch('article/getList')
          this.isLoading = false
        }, 300)
        // await this.$store.dispatch('article/getList')
      }
    }
  }
</script>

<style scoped lang="less">
	.article-empty {
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: #999;

		> i {
			font-size: 26px;
			margin-right: 10px;
			color: #999;
		}

		> span {
			padding-top: 5px;
		}
	}
	.list-container {
		.note-list {
			margin: 0;
			padding: 0;
			list-style: none;
			display: block;

			li {
				position: relative;
				width: 100%;
				margin: 0 0 17px;
				padding: 0 2px 17px 0;
				border-bottom: 1px solid #f0f0f0;
				word-wrap: break-word;
				line-height: 20px;
			}

			li.have-img {
				min-height: 140px;

				.wrap-img {
					position: absolute;
					top: 50%;
					margin-top: -68px;
					right: 0;
					width: 160px;
					height: 90px;
          background: rgba(234,234,234, .6);
          box-shadow: 0 2px 2px 2px rgba(0, 34, 77, 0.1);
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;

					img {
						/*width: 100%;*/
						/*height: 100%;*/
            width: 160px;
            height: 90px;
						border-radius: 4px;
						/*border: 1px solid #f0f0f0;*/
						vertical-align: middle;
					}
				}
			}

			.have-img > div {
				padding-right: 170px;
			}

			.title {
				margin: -7px 0 4px;
				display: inherit;
				font-size: 18px;
				font-weight: 700;
				line-height: 1.5;
				color: #333;
			}

			.title:hover {
				text-decoration: underline;
				cursor: pointer;
			}

			.title:visited {
				color: #969696;
			}

			.abstract {
				margin: 0 0 8px;
				font-size: 13px;
				line-height: 24px;
				/*min-height: 24px;*/
				max-height: 72px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
				min-height: 70px;
			}

			.meta {
				padding-right: 0 !important;
				font-size: 12px;
				font-weight: 400;
				line-height: 20px;

				a.num {
					transition: .1s ease-in;
					-webkit-transition: .1s ease-in;
					-moz-transition: .1s ease-in;
					-o-transition: .1s ease-in;
					-ms-transition: .1s ease-in;
					/*margin-right: 10px;*/
					margin-left: 10px;
					color: #b4b4b4;

					i {
						font-size: 12px;
					}
				}

				a:hover {
					color: #333333;
					cursor: pointer;
				}

				.collection-tag {
					display: inline-block;
					padding: 3px 6px;
					margin-top: -1px;
					max-width: 200px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					line-height: 1;
					vertical-align: middle;
					color: #ea6f5a !important;
					border: 1px solid rgba(236, 97, 73, .7);
					border-radius: 3px;

					transition: .1s ease-in;
					-webkit-transition: .1s ease-in;
					-moz-transition: .1s ease-in;
					-o-transition: .1s ease-in;
					-ms-transition: .1s ease-in;
				}

				.collection-tag:hover {
					cursor: pointer;
					color: #ec6149 !important;
					background-color: rgba(236, 97, 73, .05);
					border-color: #ec6149
				}

				.author {
					float: right;

					.avatar {
						display: inline-block;
						vertical-align: middle;
						width: 20px;
						height: 20px;
						cursor: pointer;

						img {
							width: 100%;
							height: 100%;
							border: 1px solid #ddd;
							border-radius: 50%;
						}
					}

					.info {
						display: inline-block;
						vertical-align: middle;
						margin-left: 10px;

						.nickname {
							vertical-align: middle;
							color: #969696;
						}

						span.time {
							display: inline-block;
							padding-left: 3px;
							color: #969696;
							vertical-align: middle;
							margin-left: 10px;
						}
					}
				}
			}
		}

		.load-more {
			cursor: pointer;
			height: 40px;
			margin: 30px auto 60px;
			padding: 10px 15px;
			font-size: 15px;
			color: #ea6f5a;
			font-weight: bold;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			width: 180px;
			border-radius: 5px;
			background-color: #ffffff;
			box-shadow: 0 0.0625rem 0.1875rem 0 rgba(0, 34, 77, .3);

			z-index: 2;
			&:hover {
				color: #fff;
				/*background-color: #9b9b9b;*/
				cursor: pointer;
			}

			&:before {
				background: #ea6f5a;
				border-radius: 5px;
			}
		}
	}
</style>
