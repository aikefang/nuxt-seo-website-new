<template>
	<div class="list-container">
		<ul class="note-list">
			<li v-for="item in article.articleList" :key="item.id" :class="{'have-img' : !!item.articleImageView != false}">
				<a :href="'/article/'+item._id" class="wrap-img" v-if="!!item.articleImageView != false">
					<img :src="item.articleImageView2" alt="" class="img-blur-done">
				</a>
				<div class="content">
					<a :href="'/article/'+item._id" class="title tof">{{item.title}}</a>
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
					<router-link :to="'/category/'+item.levelFirst.seo+'/'+item.levelSecond.seo + '/'" class="collection-tag">
						{{ item.levelSecond.title }}
					</router-link>
					<a class="num">
						<i class="iconfont icon-browse"></i>
						{{item.views}}
					</a>
					<div class="author">
						<a class="avatar">
							<img :src="item.author.headImg" alt="">
						</a>
						<div class="info">
							<a class="nickname">{{item.author.nickname}}</a>
							<span class="time" :data-origin-time="item.cTime">{{item.simplifyCTime}}</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<a class="load-more" v-show="!article.loading && article.more" @click="loadMore">阅读更多</a>
		<a class="load-more no-click" v-show="article.loading && article.more">加载中...</a>
		<a class="load-more no-click" v-show="!article.more && !article.loading">暂无更多</a>
	</div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'recommend-content',
    data() {
      return {}
    },
    components: {},
    computed: {
      ...mapState(['article']),
    },
    mounted() {
      // console.log(this.article.articleList)
    },
    methods: {
      async loadMore() {
        await this.$store.dispatch('article/getList')
      }
    }
  }
</script>

<style scoped lang="less">
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

					img {
						width: 100%;
						height: 100%;
						border-radius: 4px;
						border: 1px solid #f0f0f0;
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

				/*&.author {*/
				/*margin-bottom: 14px;*/
				/*font-size: 13px;*/
				/**/
				/*a {*/
				/*color: #333;*/
				/*cursor: pointer;*/
				/*}*/
				/*}*/
			}
		}

		.load-more {
			cursor: pointer;
			height: 40px;
			margin: 30px auto 60px;
			padding: 10px 15px;
			text-align: center;
			font-size: 15px;
			color: #fff;
			display: block;
			width: 100%;
			border-radius: 20px;
			background-color: #a5a5a5;

			&:hover {
				color: #fff;
				background-color: #9b9b9b
			}

			&.no-click {
				cursor: not-allowed;
			}
		}
	}
</style>
