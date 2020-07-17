<template>
	<div class="page">
		<NavBar></NavBar>
		<div class="content">
			<div class="left-area">
				<div class="user-info">
					<div class="info">
						<div class="head-img">
							<img v-lazy="info.headImg" class="lazy-img-fadein" :alt="info.nickname">
						</div>
						<div class="base-info">
							<div class="nickname">{{ info.nickname }}</div>
							<div class="intro">
								<i class="iconfont icon-ziwojieshao-copy"></i>
								<span>{{ info.intro ? info.intro : '暂无' }}</span>
							</div>
						</div>
						<div class="edit-button">
							编辑个人资料
						</div>
					</div>
				</div>
			</div>
			<div class="right-area">
				<div class="other-info">
					<div class="item">
						<span>加入于</span>
						<span>{{ info.cTime | Format('yyyy-MM-dd') }}</span>
					</div>
					<div class="item">
						<span>文章数</span>
						<span>{{ info.articleCount}}</span>
					</div>
					<div class="item">
						<span>今日浏览量</span>
						<span>{{ info.todayViews}}</span>
					</div>
					<div class="item">
						<span>昨日浏览量</span>
						<span>{{ info.yesterdayViews}}</span>
					</div>
					<div class="item">
						<span>总浏览量</span>
						<span>{{ info.allViews}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import NavBar from '~/components/NavBar.vue'
  export default {
    name: "index",
    async asyncData({store, route, params, redirect, $axios}) {
      const res = await $axios.get('/api/user/baseInfo')
			// console.log(res)
      return {
        info: res.data.info
			}
    },
		components: {
      NavBar
		}
  }

</script>

<style scoped lang="less">
	.page {
		min-height: 100vh;
		background: #f4f5f5;
		.content {
			padding-top: 66px;
			width: 960px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.left-area {
				.user-info {
					width: 700px;
					border-radius: 2px;
					box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
					background: #ffffff;
					padding: 25px;
					.info {
						display: flex;
						position: relative;
						.head-img {
							width: 90px;
							height: 90px;
							margin-right: 20px;
							background: rgba(234, 234, 234, 0.6);
							box-shadow: 0 2px 2px 2px rgba(0, 34, 77, 0.1);
							border-radius: 90px;
							img {
								width: 90px;
								height: 90px;
								border-radius: 90px;
							}
						}
						.base-info {
							.nickname {
								margin: 0;
								padding: 0;
								font-size: 22px;
								font-weight: 600;
								color: #000;
								font-family: -apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
								text-rendering: optimizeLegibility;
							}
							.intro {
								margin-top: 10px;
								display: flex;
								i {
									font-size: 16px;
									margin-right: 10px;
									color: #72777b;
									line-height: 22px;
								}
								span {
									color: #72777b;
									font-size: 14px;
									max-width: 300px;
									line-height: 20px;
								}
							}
						}
						.edit-button {
							position: absolute;
							right: 0;
							bottom: 0;
							width: 118px;
							height: 34px;
							border: 1px solid #ea6f5a;
							background-color: #fff;
							border-radius: 4px;
							color: #ea6f5a;
							display: flex;
							justify-content: center;
							align-items: center;cursor: pointer;
							transition: all .3s;
							&:hover {
								background-color: hsla(0, 0%, 94.9%, 0.5);
							}
						}
					}

				}
			}
			.right-area {
				.other-info {
					width: 240px;
					/*border-radius: 2px;*/
					/*box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);*/
					/*background: #ffffff;*/
					.item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #000;
						border-bottom: 1px solid rgba(230,230,231,.5);
						height: 50px;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>
