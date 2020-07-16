<template>
	<div>
		<div class="navbar jb-all" :class="{hidden: !navShow}">
			<div class="width-limit">
				<div class="nav-left">
					<router-link to="/" class="logo">
						<!--<img src="//static.webascii.cn/webascii/old_pictures/uploads/logo.png" alt="">-->
						<img
							v-lazy="'//static.webascii.cn/webascii/old_pictures/uploads/logo-min.png?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/100'"
							class="lazy-img-fadein" alt="logo">
					</router-link>
					<div class="container-nav">
						<div class="collapse">
							<!--type 0: 相对链接（默认）1：绝对链接-->
							<ul class="nav">
								<li class="tab" :class="{'active': active === item.urlLink}" @click="changeNav(index)"
										v-for="(item, index) in global.navList" :key="item.id">
									<template v-if="item.type === 0">
										<router-link :to="item.urlLink">
											<span class="menu-text">
													{{ item.title }}
											</span>
										</router-link>
									</template>
									<template v-if="item.type === 1">
										<a target="_blank" :href="item.urlLink">
											<span class="menu-text">
													{{ item.title }}
											</span>
										</a>
									</template>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="nav-right">
					<div
						class="search-input jb-all"
						:class="{full:focus}">
						<el-input
							v-model="searchKey"
							suffix-icon="el-icon-search"
							@keyup.enter.native="search"
							:placeholder="searchPlace"
							@focus="inputFocus"
							@blur="inputBlur"></el-input>
					</div>
					<a v-if="login.status" :href="writeUrl" class="write-btn">
						<i class="iconfont icon-icon5"></i>
						{{ writeText }}
					</a>
					<div data-type="menu" v-if="login.status" class="user-img">
						<img
							data-type="menu"
							@click="menuStatus"
							:src="global.userInfo.headImg + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/60/h/60'"
							:alt="global.userInfo.nickname">
						<div v-show="menuShow" class="menu-list">
							<div data-type="menu" class="item-group">
								<div data-type="menu" class="item border-line-bottom">
									<a data-type="menu" :href="writeUrl" class="menu-write-btn">
										<i data-type="menu" class="iconfont icon-icon5"></i>
										{{ writeText }}
									</a>
								</div>
							</div>
							<!--<div class="item-group">-->
							<!--<div class="item border-line-bottom">-->
							<!--<a class="menu-write-btn">-->
							<!--<i class="iconfont icon-icon5"></i>-->
							<!--个人主页-->
							<!--</a>-->
							<!--</div>-->
							<!--</div>-->
							<div data-type="menu" class="item-group">
								<div data-type="menu" class="item border-line-bottom">
									<a data-type="menu" class="menu-write-btn" @click="logout">
										<i data-type="menu" class="iconfont icon-dengchu"></i>
										登出
									</a>
								</div>
							</div>
						</div>
					</div>
					<a v-if="!login.status" @click="goLogin" class="login-in">
						登录
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import Cookies from 'js-cookie'

  export default Vue.extend({
    name: 'NavBar',
    data() {
      return {
        searchKey: '',
        focus: false,
        navShow: true,
        writeUrl: '',
        writeText: '记笔记',
        menuShow: false
      }
    },
    methods: {
      menuStatus() {
        this.menuShow = !this.menuShow
      },
      async logout() {

        const res = await this.$axios.get('/api/user/logout')

        if (res.status === 200) {
          window.location.reload()
        }

      },
      search() {
        if (!this.searchKey) {
          return
        }
        if (this.$route.name == 'book' || this.$route.name == 'book-id') {
          window.location.href = `/book?search=${this.searchKey}`
        } else if (this.$route.name == 'doc' || this.$route.name == 'doc-id') {
          window.location.href = `/doc?search=${this.searchKey}`
        } else {
          // window.location.href = `/category/${this.$route.params.level1 || 0}/${this.$route.params.level2 || 0}/1/${this.searchKey}`
          window.location.href = `/category/?keyword=${this.searchKey}`
        }
      },
      changeNav(index) {
        // this.$store.dispatch('setState', {
        //   key: 'navStatus',
        //   value: index
        // })
      },
      goLogin() {
        window.location.href = `/login/?url=${encodeURIComponent(window.location.pathname)}`
      },
      inputFocus() {
        this.focus = true
      },
      inputBlur() {
        this.focus = false
      },
      getActive(status) {
        switch (status) {
          case 'index':
            return '/';
          case 'article':
            return '/category/';
          case 'book':
            return '/book/';
          case 'doc':
            return '/doc/';
          case 'json':
            return 'http://json.webascii.cn/';
          default:
            return ''
        }
      }
    },
    computed: {
      ...mapState(['global', 'login']),
      active() {
        const status = this.global.navStatus
        return this.getActive(status)
      },
      searchPlace() {
        if (this.$route.name == 'book' || this.$route.name == 'book-id') {
          this.writeUrl = '/write'
          this.writeText = '记笔记'
          return '输入关键字后，按回车搜索书名'
        } else if (this.$route.name == 'doc' || this.$route.name == 'doc-id') {
          this.writeUrl = '/doc/write'
          this.writeText = '写文档'
          return '输入关键字后，按回车搜索文档'
        } else {
          this.writeUrl = '/write'
          this.writeText = '记笔记'
          return '输入关键字后，按回车搜索文章'
        }
      },
//      hiddenNavFn(scope) {
//        clearTimeout(scope.hiddenNavTm)
//        scope.hiddenNavTm = setTimeout(() => {
//          scope.navShow = false
//        }, 200)
//      },
//      showNavFn(scope) {
//        clearTimeout(scope.showNavFnTm)
//        scope.showNavFnTm = setTimeout(() => {
//          scope.navShow = true
//        }, 200)
//      }
    },
    mounted() {

      function scrollTop() {
        return Math.max(
          //chrome
          document.body.scrollTop,
          //firefox/IE
          document.documentElement.scrollTop);
      }

      function documentHeight() {
        //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }

      function windowHeight() {
        return (document.compatMode == "CSS1Compat") ?
          document.documentElement.clientHeight :
          document.body.clientHeight;
      }

      let p = 0
      let t = 0
      document.addEventListener('scroll', () => {
        p = scrollTop()
        if (t < p) {
          // 距离顶部小于200
          if (p < 200) {
            this.navShow = true
          } else {
            this.navShow = false
          }
          // 下滚

//          console.log('下滚')
//          this.hiddenNavFn(that)

        } else {
          // 上滑
          this.navShow = true
//          console.log('上滑')
//          this.showNavFn(that)
        }
        clearTimeout(this.gt)
        this.gt = setTimeout(() => {
          t = p
        }, 0)
        // 到达底部
        if (scrollTop() + windowHeight() >= documentHeight()) {
          this.navShow = true
        }
      })

      document.addEventListener('click', (e) => {
        let eve = e || window.event
        let target = eve.target || eve.srcElement
        if (target.getAttribute('data-type') !== 'menu' && this.menuShow) {
          this.menuShow = false
        }
      })
    }
  })
</script>
<style lang="less">
	.navbar {
		.search-input {
			height: 46px;
			line-height: 46px;
			float: left;
			width: 250px;

			&.full {
				width: 100%;
			}

			.el-input {
				height: 46px;

				.el-input__inner {
					background: #f5f5f5;
					border: none;
					height: 32px;
					font-size: 14px;
				}
			}
		}
	}
</style>
<style scoped lang="less">
	.navbar {
		background-color: #fff;
		box-shadow: 0 0.0625rem 0.1875rem 0 rgba(0, 34, 77, .1);
		top: 0;
		border-radius: 0;
		position: fixed;
		right: 0;
		left: 0;
		z-index: 1001;
		min-height: 46px;
		margin-bottom: 20px;
		height: 46px;

		&.hidden {
			top: -50px;
		}

		.width-limit {
			min-width: 768px;
			max-width: 1200px;
			height: 46px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;

			.nav-left {
				display: flex;

				.logo {
					height: 44px;
					width: 68px;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0;
					margin: 0 16px 0 16px;

					img {
						height: 44px;
						width: 68px;
						border: 0;
					}
				}

				.container-nav {
					padding-left: 15px;
					padding-right: 15px;
					width: 500px;

					.collapse {
						border-color: #e7e7e7;
						margin-right: 0;
						display: block;
						height: auto;
						padding-bottom: 0;
						overflow: visible;
						margin-left: -15px;
						width: auto;
						border-top: 0;
						box-shadow: none;

						.nav {
							margin: 0;
							padding-left: 0;
							list-style: none;
							display: flex;

							li {
								position: relative;
								display: block;
								line-height: 20px;

								> a {
									height: 46px;
									line-height: 46px;
									padding: 0 15px;
									position: relative;
									display: block;
									text-decoration: none;
									color: #333;
								}

								> a:hover {
									background-color: hsla(0, 0%, 71%, .1) !important
								}
							}

							li.active a {
								color: #ea6f5a;
							}
						}
					}
				}
			}

			.nav-right {
				display: flex;
				width: 100%;
				justify-content: flex-end;
				align-items: center;

				.write-btn {
					width: 90px;
					height: 32px;
					border-radius: 3px;
					font-size: 15px;
					color: #969696;
					font-weight: 400;
					text-align: center;
					vertical-align: middle;
					-ms-touch-action: manipulation;
					touch-action: manipulation;
					cursor: pointer;
					background-image: none;
					white-space: nowrap;
					user-select: none;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #f7f7f7;
					margin: 0 10px;

					&:hover {
						color: #ea6f5a;
					}

					i {
						font-size: 15px;
						margin-right: 5px;
					}
				}

				.user-img {
					cursor: pointer;
					position: relative;

					> img {
						width: 36px;
						height: 36px;
						border-radius: 36px;
					}

					.menu-list {
						position: absolute;
						top: 46px;
						right: 0;
						width: 150px;
						background: #ffffff;
						box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
						border: 1px solid rgba(177, 180, 185, .45);
						border-radius: 4px;

						.item-group {
							padding: 10px 0;
							border-bottom: 1px solid rgba(0, 0, 0, .04);

							&:last-child {
								border: none;
							}
						}

						.item {
							height: 34px;
							display: flex;
							align-items: center;
							font-size: 14px;

							&:hover {
								background-color: hsla(0, 0%, 94.9%, .5)
							}

							.menu-write-btn {
								color: #71777c;
								flex: 1;
								height: 100%;
								display: flex;
								align-items: center;
								padding: 0 15px;

								> i {
									margin-right: 10px;
								}
							}
						}
					}
				}

				.login-in {
					width: 60px;
					margin-left: 46px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 15px;
					color: #969696;
					font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
					font-weight: bold;
					text-align: center;
					vertical-align: middle;
					-ms-touch-action: manipulation;
					touch-action: manipulation;
					cursor: pointer;
					background-image: none;
					white-space: nowrap;
					user-select: none;
				}
			}

		}
	}
</style>
