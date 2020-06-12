<template>
  <div>
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
            <div id="content-view" class="article-content fr-view"
                 v-html="noteContent.content"></div>
          </div>
        </div>
        <ArticleHistory :list="historyList" :isAuthor="isAuthor"></ArticleHistory>
        <ArticleComment @changeCommentNum="commentNum" :articleId="articleId" :edit="inline"></ArticleComment>
      </div>
      <div class="other-info">
        <div class="author-info">
          <div class="author-avatar">
            <a>
              <img :src="noteContent.author.headImg" alt="">
            </a>
          </div>
          <div class="author-name">
            <span>{{noteContent.author.nickname}}</span>
          </div>
          <div class="countbar">
            <div class="articles">
              <b>{{allArticleNum}}</b>
              <span>文章数</span>
            </div>
            <div class="views">
              <b>{{allViewsStr}}</b>
              <span>阅读量</span>
            </div>
          </div>
        </div>
        <div class="list new-article">
          <h5>作者最新文章</h5>
          <ul>
            <li v-for="item in newNoteList">
              <a :href="'/article/' + item._id" class="jb-all" target="_blank">
                <span>{{item.title}}</span>
                <img
                  :src="item.articleImageView + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/80/h/45'"
                  alt="">
              </a>
<!--              <router-link :to="'/article/'+item.id" class="jb-all">-->
<!--                <span>{{item.title}}</span>-->
<!--                <img-->
<!--                  :src="item.articleImageView + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80|imageView2/1/w/80/h/45'"-->
<!--                  alt="">-->
<!--              </router-link>-->
            </li>
          </ul>
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
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import NavBar from '~/components/NavBar.vue'
  import BottomFooter from '~/components/Footer.vue'
  import ArticleHistory from '~/components/ArticleHistory.vue'
  import ArticleComment from '~/components/ArticleComment.vue'

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
        title: `${this.noteContent.title} - webascii.cn`,
        meta: [
          {hid: 'description', name: 'description', content: this.noteContent.articleDescribe || '让记笔记成为一种习惯'}
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



        // /api/biji/article/redirect

      // console.log(noteContent)
// //      let noteCommentList = store.dispatch('noteCommentList', {
// //        articleId: params.id, // 文章ID
// //      })
//       let zan = '0'
//       await Promise.all([noteContent])
//         .then(info => {
//           store.dispatch('setApiData', {
//             key: 'noteContent',
//             data: info[0].data.note
//           })
//           zan = info[0].data.note.zanStr
//         })
//         .catch(e => {
//           // 重定向
//           redirect('/error')
//         })
      return {
        noteContent: noteContent.data.note,
        isAuthor: noteContent.data.isAuthor,
        allArticleNum: noteContent.data.allArticleNum,
        allViews: noteContent.data.allViews,
        allViewsStr: noteContent.data.allViewsStr,
        newNoteList: noteContent.data.newNoteList,
        userCommentAllNum: noteContent.data.userCommentAllNum,
        // 存储文章ID
        articleId: params.id,
        inline: route.query.inline,
        zan: noteContent.data.note.zanStr,
        historyList: historyListRes.data.list
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
      ArticleComment
    },
    computed: {
      // ...mapState(['apiData']),
      ...mapState(['login'])
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
        let that = this
        require('~/plugins/froala-editor-custom-toolbar')()
        this.editDom = $('#content-view')
        this.editDom.froalaEditor({
          toolbarInline: true,
          toolbarButtons: this.$store.state.toolbarButtons,
          // 编辑框左侧加号
          quickInsertButtons: this.$store.state.quickInsertButtons,
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
//        let preDom = $('pre')
//        for (let item = 0; item < preDom.length; item++) {
//          hljs.highlightBlock(preDom[item])
//        }
//         this.$store.dispatch('editNoteContent', {
//           id: id, // 文章ID
//           content: this.editDom.froalaEditor('html.get'), // 内容
//         })
//           .then(info => {
//             this.$message.success('编辑文章成功，2秒后传送至文章内容~')
//             window.location.href = `/article/${info.data.id}`
//           })
//           .catch(error => {
//             this.$message.error('编辑文章失败')
//           })

        console.log(this.editDom.froalaEditor('html.get'))

        const res = await this.$axios.post(`/api/biji/article/edit`, {
          allContent: {
            id: id, // 文章ID
            content: this.editDom.froalaEditor('html.get'), // 内容
          }
        }).catch(error => {
          this.$message.error('编辑文章失败')
        })
        // console.log(res)

        if (res.status === 200) {
          this.$message.success('编辑文章成功，2秒后传送至文章内容~')
          window.location.href = `/article/${res.data.id}`
        }


      },
    },
    created() {
      // console.log(123123)
    },
    mounted() {
      this.$nextTick(() => {
        // this.$on('change_comment_num', (num) => {
        //   console.log(123123123)
        //   this.commentNum(num)
        // })
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
        }
      })
      window.previewImg = this.previewImg
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
  .article-content, .article-comment {
    a[href] {
      color: #333;
      &:hover {
        color: #ea6f5a;
      }
    }
    img {
      max-width: 100%;
    }
  }
</style>
<style scoped lang="less">
  .note {
    position: relative;
    padding-top: 56px;
    width: 1220px;
    margin: 0 auto;
    display: flex;
    .post {
      width: 880px;
      padding-right: 20px;
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
      background: #f7f7f7;
      .author-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        .author-avatar {
          img {
            border-radius: 50%;
            width: 110px;
            height: 110px;
          }
        }
        .author-name {
          font-size: 24px;
          padding-top: 10px;
          color: #333;
          padding-bottom: 20px;
        }
        .countbar {
          font-family: -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          display: flex;
          margin-bottom: 50px;
          .articles, .views {
            width: 150px;
            display: flex;
            align-items: center;
            flex-direction: column;
            b {
              font-weight: 100;
              padding-bottom: 5px;
              font-size: 32px;
              color: #212529;
            }
            span {
              color: #6c757d;
              font-size: 14px;
            }
          }
          .views {
            position: relative;
            &:after {
              top: 0;
              left: 0;
              height: 100%;
              width: 1px;
              background: #ccc;
              content: '';
              position: absolute;
            }
          }
        }
      }
      .list {
        display: flex;
        flex-direction: column;
        h5 {
          font-weight: 500;
          font-size: 18px;
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
        ul {
          li {
            padding: 0 20px;
            display: flex;
            margin-bottom: 15px;
            a {
              display: flex;
              width: 100%;
              color: #333;
              img {
                height: auto;
                border-radius: 3px;
                box-shadow: 0 0.0625rem 0.1875rem 0 rgba(0, 34, 77, 0.1);
              }
              span {
                width: 100%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-size: 16px;
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
