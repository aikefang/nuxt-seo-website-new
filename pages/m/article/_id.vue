<template>
  <div class="article-details-dfsgdg">
    <Header/>
    <div class="note-show">
      <h1 class="title">{{ noteContent.title }}</h1>
      <div class="article-info">
        <div class="info-left">
          <a class="user-info">
            <img
              v-lazy="noteContent.author.headImg"
              class="lazy-img-fadein"
              :alt="noteContent.author.nickname">
            <span class="user-nickname">{{ noteContent.author.nickname }}</span>
          </a>
          <a class="classify"># {{ noteContent.levelSecond.title }}</a>
        </div>
        <span class="time">{{ noteContent.simplifyCTime }}</span>
      </div>
      <div
        ref="content"
        class="content-view"
        v-html="noteContent.content"/>
      <div class="line-container">
        <div class="line"/>
        <p class="content">
          <span>随手就是一个赞</span>
          <button>{{ zan }}</button>
        </p>
      </div>
      <div
        class="zan"
        @click="goZan">
        <i class="iconfont icon-dianzan"/>
        <span class="zan-text">赞</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '~/components/m/Header.vue'

  export default {
    async asyncData({store, route, params}) {
      const noteContent = await store.dispatch('article/getDetails', {
        id: params.id,
        imageMogr2: 1
      })
      return {
        noteContent: noteContent.data.note,
        articleId: params.id,
        zan: noteContent.data.note.zanStr
      }
    },
    head() {
      let scriptOrigin = [
        {src: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/scripts/shCore.js'},
        {src: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/scripts/shBrushAll.js'},
      ]
      let linkOrigin = [
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shCore.css'},
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeDefault.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeDjango.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeEclipse.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeEmacs.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeFadeToGrey.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeMidnight.css'},
//        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/styles/shThemeRDark.css'},
        {rel: 'stylesheet', href: '//static.webascii.cn/webascii/froala_editor_2.8.1/css/froala_style.min.css'},
      ]
      let scriptArr = []
      let linkArr = []
      scriptOrigin = scriptOrigin.concat(scriptArr)
      linkOrigin = linkOrigin.concat(linkArr)

      return {
        script: scriptOrigin,
        link: linkOrigin,
        title: `${this.noteContent.title} - webascii.cn`,
        meta: [
          {hid: 'description', name: 'description', content: this.noteContent.articleDescribe || '让记笔记成为一种习惯'}
        ]
      }
    },
    components: {
      Header
    },
    data() {
      return {
      }
    },
    computed: {
    },
    mounted() {
      this.$nextTick(() => {
        SyntaxHighlighter.config.clipboardSwf ='//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/scripts/clipboard.swf';
        SyntaxHighlighter.config.strings = {
          expandSource :'展开代码',
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
      })
    },
    methods: {
      // 点赞
      async goZan() {
        let zanDom = document.querySelector('.icon-dianzan')
        if (/nice-in/.test(zanDom.className)) {
          return
        }
        clearTimeout(zanSet)
        zanDom.className = zanDom.className + ' nice-in'
        let zanSet = setTimeout(() => {
          zanDom.className = zanDom.className.replace(' nice-in', '')
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
    }
  }
</script>
<style lang="less">
  .article-details-dfsgdg {
    .title {
      margin: 15px 0;
      font-size: 26px;
      font-weight: 700;
      color: #2f2f2f;
    }
    .content-view {
      .syntaxhighlighter {
        padding-top: 5px !important;
        padding-bottom: 5px !important;
      }
      img {
        max-width: 100%;
      }
      h1, h2, h3, h4, h5, h6 {
        padding: 20px 0 15px 0;
        margin: 0;
        line-height: 1.6;
      }
      h1 {
        font-size: 24px;
      }
      h2 {
        font-size: 20px;
      }
      h3, h4, h5, h6 {
        font-size: 16px;
      }
      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.7;
        color: #2f2f2f;
        word-break: break-all;
        word-wrap: break-word;
        img {
          /*width: 100% !important;*/
          min-width: 60%;
          margin: 0 auto;
          display: block;
          box-shadow: 0 0.2rem 0.2rem 0 rgba(0, 34, 77, 0.1);
        }
      }
      /*> p {*/
      /*  text-indent: 2rem;*/
      /*}*/
      .fr-img-wrap {
        /*background: red;*/
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 20px;
        img {
          box-shadow: 0 0.0625rem 0.1875rem 0 rgba(0, 34, 77, 0.1);
        }
        .fr-inner {
          position: relative;
          padding: 0 15px;
          &:after {
            position: absolute;
            bottom: 0;
            left: 0;
            content: ' ';
            height: 1px;
            width: 100%;
            border-radius: 50%;
            background: -webkit-linear-gradient(180deg, #d9d9d9, #999999, #d9d9d9);
          }
        }
      }
    }
  }
</style>
<style scoped lang="less">
  .article-details-dfsgdg {
    .note-show {
      padding: 58px 18px 50px 18px;
      .content-view {
        padding-bottom: 30px;
      }
      .article-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .info-left {
          display: flex;
          align-items: center;
          a.user-info {
            display: flex;
            align-items: center;
            margin-right: 10px;
            img {
              width: 28px;
              height: 28px;
              float: left;
              margin-right: 5px;
              border-radius: 50%;
            }
            .user-nickname {
              display: flex;
              font-size: 16px;
              font-weight: 700;
              line-height: 16px;
              color: #484848;
            }
          }
          a.classify {
            padding: 2px 8px;
            /*margin: 0 12px 12px 0;*/
            font-size: 12px;
            position: relative;
            color: #ea6f5a;
            &:after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              border: 1px solid #ea6f5a;
              width: 200%;
              height: 200%;
              -webkit-transform: scale(.5);
              -ms-transform: scale(.5);
              transform: scale(.5);
              -webkit-transform-origin: left top;
              -ms-transform-origin: left top;
              transform-origin: left top;
              border-radius: 8px;
            }
          }
        }
        .time {
          font-size: 12px;
          line-height: 16px;
          color: #999999;
        }
      }
      .line-container {
        position: relative;
        height: 31px;
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        .line {
          position: absolute;
          width: 100%;
          top: 15px;
          height: 1px;
          background-color: #bbb;
          z-index: 0;
        }
        .content {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.7;
          color: #2f2f2f;
          display: inline-block;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          padding: 0 10px;
          background-color: #fff;
          span {
            display: inline-block;
            vertical-align: middle;
            font-size: 16px;
            font-weight: 500;
            line-height: 22px;
            color: #666;
            margin-right: 5px;
          }
          button {
            vertical-align: middle;
            height: 22px;
            border-radius: 2px;
            border: 1px solid #ddd;
            font-size: 12px;
            line-height: 20px;
            padding: 0 8px;
            color: #666;
            background-color: transparent;
          }
        }
      }
      .zan {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100px;
        margin: 0 auto;
        i.iconfont {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border: 1px solid hsla(9, 77%, 64%, .5);
          color: hsla(9, 77%, 64%, .5);
          /*line-height: 60px;*/
          text-align: center;
          border-radius: 50%;
          margin: 12px auto 3px;
          font-size: 40px;
          padding: 10px;
          /*border-color: hsla(9,77%,64%,.5);*/
        }
        .zan-text {
          font-size: 14px;
          color: #ea6f5a;
        }
      }
      .nice-in {
        -webkit-animation: niceIn 0.8s .2s ease;
        -moz-animation: niceIn 0.8s .2s ease;
        -o-animation: niceIn 0.8s .2s ease;
        animation: niceIn 0.8s .2s ease;
      }
    }
  }

  @-webkit-keyframes niceIn {
    0% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1)
    }
    50% {
      opacity: 1;
      -webkit-transform: scale(1.5);
      transform: scale(1.5)
    }
    70% {
      -webkit-transform: scale(.8);
      transform: scale(.8)
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1)
    }
  }

  @keyframes niceIn {
    0% {
      opacity: 1;
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1)
    }
    50% {
      opacity: 1;
      -webkit-transform: scale(1.5);
      -ms-transform: scale(1.5);
      transform: scale(1.5)
    }
    70% {
      -webkit-transform: scale(.8);
      -ms-transform: scale(.8);
      transform: scale(.8)
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1)
    }
  }

  @-o-keyframes niceIn {
    0% {
      opacity: 1;
      -o-transform: scale(1);
      transform: scale(1)
    }
    50% {
      opacity: 1;
      -o-transform: scale(1.5);
      transform: scale(1.5)
    }
    70% {
      -o-transform: scale(.8);
      transform: scale(.8)
    }
    100% {
      opacity: 1;
      -o-transform: scale(1);
      transform: scale(1)
    }
  }

  @-moz-keyframes niceIn {
    0% {
      opacity: 1;
      -moz-transform: scale(1);
      transform: scale(1)
    }
    50% {
      opacity: 1;
      -moz-transform: scale(1.5);
      transform: scale(1.5)
    }
    70% {
      -o-transform: scale(.8);
      transform: scale(.8)
    }
    100% {
      opacity: 1;
      -moz-transform: scale(1);
      transform: scale(1)
    }
  }
</style>
