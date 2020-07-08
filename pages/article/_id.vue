<template>
	<div class="article-page">
		<NavBar></NavBar>
		<div class="note">
			<div class="post">
				<div class="article wrap">
					<h1 class="title">{{noteContent.title}}</h1>
					<div class="info-content">
						<span>{{noteContent.author.nickname}}</span>
						<span>{{noteContent.views}}阅读</span>
						<el-tooltip class="item" effect="dark"
												:content="noteContent.cTime | format('yyyy-MM-dd hh:mm')"
												placement="top">
							<span>{{noteContent.simplifyCTime}}</span>
						</el-tooltip>
					</div>
					<div class="show-content">
						<!--<div class="describe" v-if="!!noteContent.articleDescribe === true">-->
						<!--{{noteContent.articleDescribe}}-->
						<!--</div>-->
						<div ref="content" id="content-view" class="article-content fr-view"
								 v-html="noteContent.content"></div>
					</div>
				</div>
				<ArticleHistory :list="historyList" :isAuthor="isAuthor"></ArticleHistory>
				<ArticleComment ref="article-comment" @changeCommentNum="commentNum" :articleId="articleId" :edit="inline"></ArticleComment>
			</div>
			<div class="other-info">
				<div class="author-info">
          <div class="title">关于作者</div>
					<div class="author-box">
            <div class="author-avatar">
              <a>
                <img v-lazy="noteContent.author.headImg" class="lazy-img-fadein" alt="作者头像">
              </a>
            </div>
            <div class="author-name tof">
              {{noteContent.author.nickname}}
            </div>
          </div>
          <div class="num-box">
            <div>
              <i class="iconfont icon-icon_article"></i>
            </div>
            <span>总文章数</span>
            <b>{{allArticleNum}}</b>
          </div>
          <div class="num-box">
            <div>
              <i class="iconfont icon-browse"></i>
            </div>
            <span>总阅读量</span>
            <b>{{allViewsStr}}</b>
          </div>
				</div>
				<div class="list">
					<div class="recommend-list">
            <div class="title">相关推荐</div>
						<ul>
							<li v-for="item in recommendList">
								<a :href="'/article/' + item._id + '/'" :alt="item.title" class="jb-all" target="_blank">
									<span>{{item.title}}</span>
									<div class="img-box">
										<img
											v-lazy="item.articleImageView + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/80/h/45'"
											class="lazy-img-fadein"
											:alt="item.title">
									</div>
								</a>
							</li>
						</ul>
					</div>
					<!-- 当前不是状态不是编辑 && 锚点个数 > 0 -->
					<div v-if="inline !== 'edit' && noteContent.anchorList.length > 0" class="fixed-box">
						<div class="fixed-content">
							<h5>目录</h5>
							<div class="anchor-list-box">
								<ul class="anchor-list">
									<li :class="[item.tag, item.id]" class="jb-all" v-for="(item, index) in noteContent.anchorList"
											@click="goAnchor(item.id)" :key="index">
										<a class="jb-all" :href="'#' + item.id" rel="external nofollow">
											{{ item.text }}
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex-menu-left">
			<ul>
				<el-tooltip effect="dark" content="当前页面编辑" placement="right">
					<li class="jb-all bg-cb edit-fast no-number" v-if="isAuthor && inline != 'edit'">
						<a :href="'/article/' + articleId + '?inline=edit'">
							<i class="iconfont icon-tuanduicankaoxian-"></i>
							<span class="name">快编</span>
						</a>
					</li>
				</el-tooltip>
				<el-tooltip effect="dark" content="快速保存" placement="right">
					<li class="jb-all bg-cb submit no-number" v-if="isAuthor && inline == 'edit'"
							@click="publishEdit(articleId)">
						<i class="iconfont icon-checkmark-circle"></i>
						<span class="name">保存</span>
					</li>
				</el-tooltip>
				<el-tooltip effect="dark" content="新页面编辑" placement="right">
					<li class="jb-all bg-cb edit no-number" v-if="isAuthor">
						<a :href="'/write/'+articleId">
							<i class="iconfont icon-bianji"></i>
							<span class="name">编辑</span>
						</a>
					</li>
				</el-tooltip>
				<li class="jb-all bg-cb pinglun" @click="goComment">
					<i class="iconfont icon-pinglun"></i>
					<span class="name">评论</span>
					<span class="number">{{commentLength}}</span>
				</li>
				<li class="jb-all bg-cb zan" @click="goZan">
					<i class="iconfont icon-dianzan" ref="zan"></i>
					<span class="name">赞</span>
					<span class="number">{{zan}}</span>
				</li>
			</ul>
		</div>
		<div class="flex-menu-right">
			<ul>
				<li class="jb-all bg-cb top no-number" @click="goTop">
					<i class="iconfont icon-huidaodingbu"></i>
					<span class="name">Top</span>
				</li>
			</ul>
		</div>
		<BottomFooter></BottomFooter>
		<ImgView ref="img-view"></ImgView>
	</div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import NavBar from '~/components/NavBar.vue'
  import BottomFooter from '~/components/Footer.vue'
  import ArticleHistory from '~/components/ArticleHistory.vue'
  import ArticleComment from '~/components/ArticleComment.vue'
  import ImgView from '~/components/ImgView.vue'

  export default {
    name: 'ArticleDetail',
    head() {
      let scriptOrigin = [
        {src: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/scripts/shCore.js'},
        {src: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/scripts/shBrushAll.js'},
      ]
      let linkOrigin = [
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shCore.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_3.0.83/styles/shCore.css'},
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeDefault.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeDjango.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeEclipse.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeEmacs.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeFadeToGrey.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeMidnight.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeRDark.css'},
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/froala_style.min.css'},
      ]
      let scriptArr = [
//        {src: '//static.webascii.cn/webascii/jquery/1.11.0/jquery.min.js'},
        {src: '//static.webascii.cn/webascii/jquery/3.2.1/jquery.min.js'},
        {src: '//static.webascii.cn/webascii/codemirror/5.25.0/codemirror.min.js'},
        {src: '//static.webascii.cn/webascii/codemirror/5.25.0/mode/xml/xml.min.js'},
        {src: '//static.webascii.cn/webascii/froala_editor_2.8.1/js/froala_editor.pkgd2.min.js'},
        {src: '//static.webascii.cn/webascii/froala_editor_2.8.1/js/languages/zh_cn.js'}
      ]
      let linkArr = [
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/font-awesome/4.7.0/css/font-awesome.min.css'},
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/froala_editor.min.css'},
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/plugins/code_view.min.css'},
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/plugins/colors.min.css'},
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/plugins/emoticons.min.css'},
        {
          rel: 'stylesheet',
          href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/plugins/image_manager.min.css'
        },
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/plugins/image.min.css'},
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/plugins/table.min.css'},
        {
          rel: 'stylesheet',
          href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/plugins/char_counter.min.css'
        },
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/plugins/video.min.css'},
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/plugins/fullscreen.min.css'},
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/plugins/file.min.css'},
        {
          rel: 'stylesheet',
          href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/plugins/quick_insert.min.css'
        }
      ]
//      if (this.inline === 'edit') {
      scriptOrigin = scriptOrigin.concat(scriptArr)
      linkOrigin = linkOrigin.concat(linkArr)
//      }

      return {
        script: scriptOrigin,
        link: linkOrigin,
        title: `${this.noteContent.title}_webascii.cn`,
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.seoKeywords.toString()
          },
          {
            hid: 'description',
            name: 'description',
            content: this.noteContent.articleDescribe || '笔记网(webascii.cn)，让你全面学习前端、后端、数据库等开发知识，快速掌握开发技能。'
          }
        ]
      }
    },
    // 页面进入之后 返回顶部
//    scrollToTop: true,
    //预请求
    async asyncData({store, route, params, redirect, $axios}) {
      // 需要重定向
      if (Number(params.id)) {
        const redirectRes = await $axios.get('/api/biji/article/redirect', {
          params: {
            id: params.id
          }
        })
        if (redirectRes.status === 200 && redirectRes.data.needRedirect) {
          const rArr = route.path.split('/')
          rArr[2] = redirectRes.data.redirect
          redirect(`${rArr.join('/')}`)
          return
        }
      }

      store.commit('global/setNavStatus', 'article')

      const noteContent = await store.dispatch('article/getDetails', {
        id: params.id,
        imageMogr2: route.query.inline == 'edit' ? 0 : 1
      })


      const historyListRes = await $axios.get('/api/biji/article/historyList', {
        params: {
          id: params.id
        }
      })

      return {
        noteContent: noteContent.data.note,
        isAuthor: noteContent.data.isAuthor,
        allArticleNum: noteContent.data.allArticleNum,
        allViews: noteContent.data.allViews,
        allViewsStr: noteContent.data.allViewsStr,
        recommendList: noteContent.data.recommendList,
        userCommentAllNum: noteContent.data.userCommentAllNum,
        // 存储文章ID
        articleId: params.id,
        inline: route.query.inline,
        zan: noteContent.data.note.zanStr,
        historyList: historyListRes.data.list,
        seoKeywords: [noteContent.data.note.levelFirst.title, noteContent.data.note.levelSecond.title, '技术文档']
      }
    },
    data() {
      return {
        commentLength: 0
      }
    },
    components: {
      NavBar,
      BottomFooter,
      ArticleHistory,
      ArticleComment,
      ImgView
    },
    computed: {
      // ...mapState(['apiData']),
      ...mapState(['login', 'froalaEditor'])
    },
    methods: {
//      edit() {
////        console.log(this.articleId)
//      },
      commentNum(data) {
        this.commentLength = data
      },
      // 去评论
      goComment() {
        if (!this.login.status) {
          window.location.href = `/login/?url=${encodeURIComponent(window.location.pathname)}`
          return
        }
        $('html,body').animate({scrollTop: $('#reply-edit').offset().top - 400 + "px"}, 300)
        $('#reply-edit').froalaEditor('events.focus')
      },
      // 点赞
      async goZan() {
        clearTimeout(zanSet)
        let zanDom = $('.icon-dianzan')
        zanDom.addClass('nice-in')
        let zanSet = setTimeout(() => {
          zanDom.removeClass('nice-in')
        }, 1000)
        const res = await this.$axios.post('/api/biji/article/zan', {
          id: this.articleId
        }).catch(e => {
          this.$message.error('点赞失败，请重新尝试')
        })
        if (res.status === 200) {
          this.zan = res.data.zanStr
        } else {
          this.$message.error('点赞失败，请重新尝试')
        }
      },
      previewImg(src) {
        this.$alert(`<img src="${src}">`, {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          closeOnClickModal: true,
          closeOnPressEscape: true,
          customClass: 'preview-img'
        })
          .then(() => {
          })
          .catch(() => {
          })
      },
      // 实时编辑
      realTimeEdit() {
        require('~/plugins/froala-editor-custom-toolbar')()
        this.editDom = $('#content-view')
        this.editDom.froalaEditor({
          toolbarInline: true,
          toolbarButtons: this.froalaEditor.toolbarButtons,
          // 编辑框左侧加号
          quickInsertButtons: this.froalaEditor.quickInsertButtons,
          pastePlain: true,
          theme: 'gray',
          fontFamilySelection: true,
          fontSizeSelection: true,
          paragraphFormatSelection: true,
          imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
          imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
          // fileUploadURL: `${this.$store.state.apiPath}/api/editor/upload/files`,
          fileUploadURL: `/api/upload/files`,
          fileUploadParams: {
            // loginToken: that.$store.state.Cookies.loginToken,
            // userId: that.$store.state.Cookies.userId,
          },
          paragraphFormat: this.$store.state.paragraphFormat,
          // imageUploadURL: `${this.$store.state.apiPath}/api/editor/upload/files`,
          imageUploadURL: `/api/upload/files`,
          imageUploadParams: {
            // loginToken: that.$store.state.Cookies.loginToken,
            // userId: that.$store.state.Cookies.userId,
          },
          language: 'zh_cn',
          codeBeautifierOptions: {
            end_with_newline: true,
            indent_inner_html: true,
            extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
            brace_style: 'expand',
            indent_char: ' ',
            indent_size: 4,
            wrap_line_length: 0
          }
        })
      },
      async publishEdit(id) {
        console.log(this.editDom.froalaEditor('html.get'))
        const res = await this.$axios.post(`/api/biji/article/edit`, {
          allContent: {
            id: id, // 文章ID
            content: this.editDom.froalaEditor('html.get'), // 内容
          }
        }).catch(error => {
          this.$message.error('编辑文章失败')
        })
        if (res.status === 200) {
          this.$message.success('编辑文章成功，2秒后传送至文章内容~')
          window.location.href = `/article/${res.data.id}`
        }
      },

      computerIndex(sTop) {
        let cacheArr = []
        const anchorTags = $('.anchor-tag')
        anchorTags.map((index, data) => {
          cacheArr.push($(data).offset().top)
        })
        for (let i = 0; i < cacheArr.length; i++) {
          // 如果下一个索引存在
          if (cacheArr[i + 1]) {
            // 匹配到索引值
            if (sTop >= (cacheArr[i] - 60) && sTop < (cacheArr[i + 1] - 60)) {
              return {
                index: i,
                id: anchorTags.eq(i).attr('anchor-id')
              }
            } else {
              continue
            }
          } else { // 不存在(最后一个索引)
            // 返回索引
            if (!!cacheArr[1] && sTop < (cacheArr[1] - 60)) {
              return undefined
            }
            return {
              index: i,
              id: anchorTags.eq(i).attr('anchor-id')
            }
          }
        }
      },
      goAnchor(selector) {
        let anchor = this.$el.querySelector(`[anchor-id=${selector}]`)
        window.scrollTo({
          top: anchor.offsetTop - 50,
          behavior: "smooth"
        })

      },
    },
    created() {
      // console.log(123123)
    },
    mounted() {
      this.$nextTick(() => {
        // 如果是编辑
        if (this.inline === 'edit' && this.$route.name == 'article-id' && this.isAuthor === true) {
          this.realTimeEdit()
        } else { // 不是编辑
          SyntaxHighlighter.config.clipboardSwf = '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/scripts/clipboard.swf';
          SyntaxHighlighter.config.strings = {
            expandSource: '展开代码',
//            viewSource :'查看代码',
//            copyToClipboard :'复制代码',
//            copyToClipboardConfirmation :'代码复制成功',
//            print :'打印',
//            help:'?',
//            alert:'语法高亮\n\n',
//            noBrush:'不能找到刷子: ',
//            brushNotHtmlScript:'刷子没有配置html-script选项',
//            aboutDialog:'<div></div>'
          };
          SyntaxHighlighter.defaults['auto-links'] = false
          SyntaxHighlighter.all();

          // 锚点个数大于0
          if (this.noteContent.anchorList.length > 0) {
            window.onscroll = () => {
              // const articleCommentTop = $('.article-comment').offset().top
              const fixedBox = $('.fixed-box')
              const fixedBoxTop = fixedBox.offset().top
              const scrollTop = this.scrollTop()

              if (scrollTop > fixedBoxTop - 60) {
                $('.fixed-content').addClass('fixed')
              } else {
                $('.fixed-content').removeClass('fixed')
              }

              // 防抖 提升性能
              clearTimeout(this.selectLink)
              this.selectLink = setTimeout(() => {
                const data = this.computerIndex($(window).scrollTop())
                if (data === undefined) {
                  $('.anchor-list li').removeClass('select')
                  return
                }

                $('.anchor-list li').removeClass('select')
                $(`.${data.id}`).addClass('select')
              }, 20)
            }
          }
        }
        this.$refs.content.addEventListener('click', (ev) => {
          let eve = ev || window.event
          let target = eve.target || eve.srcElement
          if (target.nodeName.toLowerCase() === 'img') {
            this.$refs['img-view'].open(target.getAttribute('src'))
          }
        })
        this.$refs['article-comment'].$el.addEventListener('click', (ev) => {
          let eve = ev || window.event
          let target = eve.target || eve.srcElement
					if (target.parentNode.nodeName.toLowerCase() === 'p' && target.nodeName.toLowerCase() === 'img') {
            this.$refs['img-view'].open(target.getAttribute('src'))
					}
        })
      })
    },
  }
</script>
<style lang="less">
	.preview-img.el-message-box {
		width: inherit;
		min-width: 300px;
		min-height: 200px;
	}

	.article-content, .reply-edit {
		ul {
			list-style: inherit;
			padding-left: 40px;
			position: relative;

			&:after {
				position: absolute;
				content: '\e601';
				font-size: 12px;
				left: 0;
				top: 2px;
				color: #f56c6c;
				font-family: "iconfont" !important;
				/*font-size: 16px;*/
				font-style: normal;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
			}

			li {
				padding-bottom: 5px;
			}
		}

		ol {
			position: relative;

			&:after {
				position: absolute;
				content: '\e600';
				font-size: 12px;
				left: 0;
				top: 2px;
				color: #f56c6c;
				font-family: "iconfont" !important;
				/*font-size: 16px;*/
				font-style: normal;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
			}

			li {
				padding-bottom: 5px;
			}
		}
	}

	.content-style {
		a[href] {
			color: #333;

			&:hover {
				color: #ea6f5a;
			}
		}

		img {
			max-width: 100%;
			cursor: zoom-in !important;
			/*cursor: url(../images/big.cur);*/
		}
	}

	.article-content {
		.content-style()
	}
	.article-comment {
		.comment-list {
			.comment {
				.comment-wrap {
					.content {
						.content-style()
					}
				}
				.sub-comment-list {
					.sub-comment {
						.content, .quote {
							.content-style()
						}
					}
				}
			}
		}
	}
</style>
<style scoped lang="less">
	.article-page {
		background: #f4f5f5;
	}

	.note {
		position: relative;
		padding-top: 70px;
		width: 1200px;
		margin: 0 auto;
		display: flex;
		/*box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);*/
		border-radius: 2px;

		.post {
			width: 880px;
			padding: 0 20px;
			background: #ffffff;

			.article {
				.title {
					word-break: break-all;
					margin: 20px 0 0;
					font-family: -apple-system, SF UI Display, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
					font-size: 34px;
					font-weight: 700;
					line-height: 1.3;
				}

				.info-content {
					display: flex;
					position: relative;
					padding: 15px 0 25px 0;
					margin-bottom: 30px;
					font-size: 14px;

					&:after {
						display: block;
						right: 0;
						bottom: 0;
						left: 0;
						height: .0625rem;
						background: #ececec;
						content: '';
						position: absolute;
					}

					span {
						position: relative;
						padding-right: 14px;
						color: #bbb;

						&:after {
							position: absolute;
							display: block;
							width: 3px;
							height: 3px;
							border-radius: 50%;
							top: 50%;
							right: 4px;
							margin-top: -1px;
							background: #ccc;
							content: '';
						}

						&:last-child {
							&:after {
								content: '';
								width: 0px;
								height: 0px;
							}
						}
					}
				}

				.show-content {
					color: #2f2f2f;
					word-break: break-all;
					font-size: 16px;
					font-weight: 400;
					line-height: 1.7;

					.describe {
						padding-bottom: 40px;
					}
				}
			}
		}

		.other-info {
			width: 320px;
			background: #f4f5f5;
			margin-left: 20px;

			.author-info {
				display: flex;
				flex-direction: column;
        background: #ffffff;
        border-radius: 2px;
        margin-bottom: 20px;
        .title {
          font-size: 14px;
          border-bottom: 1px solid hsla(0,0%,58.8%,.1);
          padding: 15px;
        }

        .author-box {
          display: flex;
          padding: 15px;
          .author-avatar {
            a {
              width: 50px;
              height: 50px;
              background: rgba(234, 234, 234, .6);
              box-shadow: 0 2px 2px 2px rgba(0, 34, 77, 0.1);
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 15px;
              img {
                border-radius: 50%;
                width: 50px;
                height: 50px;
              }
            }
          }

          .author-name {
            font-size: 22px;
            padding-top: 10px;
            color: #333;
            max-width: 195px;
            padding-bottom: 20px;
          }
        }

        .num-box {
          font-family: -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          padding: 0 15px 15px 15px;
          display: flex;
          align-items: center;
          b {
            font-weight: 100;
            font-size: 20px;
            color: #212529;
          }
          span {
            color: #6c757d;
            font-size: 16px;
            margin-right: 10px;
          }
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            background: #E1EFFF;
            border-radius: 10px;
            margin-right: 10px;
            i {
              font-size: 12px;
              color: #7BB9FF;
            }
          }
        }
			}

			.fixed-box {
				.fixed-content {

					&.fixed {
						position: fixed;
						top: 60px;
						width: 320px;
					}

					.anchor-list {
						display: flex;
						flex-direction: column;
						position: relative;
            font-size: 14px;

						&:before {
							content: ' ';
							position: absolute;
							top: 0;
							left: 20px;
							bottom: 0;
							width: 2px;
							background-color: #ebedef;
							opacity: .5;
						}

						/*padding-left: 20px;*/

						li {
							padding: 5px 0;
							position: relative;

							&.h1 {
								padding-left: 30px;
								font-weight: bold;

								a {
									&:before {
										left: -12px;
										margin-top: -3px;
										width: 6px;
										height: 6px;
									}
								}
							}

							&.h2 {
								padding-left: 45px;
							}

							&.h3 {
								padding-left: 60px;
							}

							&.h4 {
								padding-left: 70px;
							}

							&.h5 {
								padding-left: 80px;
							}

							&.h6 {
								padding-left: 90px;
							}

							&:hover {
								cursor: pointer;
								background-color: #ebedef
							}

							&.select {
								background-color: #ebedef;

								a {
									color: #007fff;
								}
							}

							a {
								position: relative;

								&:before {
									content: ' ';
									position: absolute;
									top: 50%;
									left: -10px;
									margin-top: -2px;
									width: 4px;
									height: 4px;
									background-color: currentColor;
									border-radius: 50%;
								}
							}

						}
					}
				}
			}

			h5 {
				font-weight: 500;
				font-size: 16px;
				position: relative;
				padding-left: 20px;
				margin-bottom: 15px;
				margin-top: 0;

				&:after {
					display: block;
					top: 0;
					bottom: 0;
					left: 0;
					width: .3125rem;
					height: 100%;
					background: #0366d6;
					content: '';
					position: absolute;
				}
			}

			.recommend-list {
        background: #ffffff;
        margin-bottom: 20px;
        .title {
          font-size: 14px;
          border-bottom: 1px solid hsla(0,0%,58.8%,.1);
          padding: 15px;
        }
				ul {
          padding: 15px 0;
					li {
						padding: 0 15px;
						display: flex;
						margin-bottom: 15px;

						a {
							display: flex;
							width: 100%;
							color: #333;

							.img-box {
								background: rgba(234, 234, 234, .6);
								box-shadow: 0 1px 1px 1px rgba(0, 34, 77, 0.1);
								width: 80px;
								height: 45px;
								border-radius: 3px;
								display: flex;
								justify-content: center;
								align-items: center;

								img {
									width: 80px;
									height: 45px;
									border-radius: 3px;
									box-shadow: 0 0.0625rem 0.1875rem 0 rgba(0, 34, 77, 0.1);

								}
							}

							span {
								width: 100%;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
								font-size: 14px;
								line-height: 22px;
								margin-right: 10px;
							}

							&:hover {
								color: #ea6f5a;
							}

							/*display: flex;*/
							/*align-items: center;*/
						}
					}
				}
			}
		}
	}
</style>
