<template>
  <div class="article-comment" v-show="edit != 'edit'">
    <div class="comment-content" v-show="!loginStatus">
      <a class="avatar">
        <img
          src="//static.webascii.cn/webascii/old_pictures/uploads/default_head.png?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/40"
          alt="">
      </a>
      <div class="sign-container">
        <a @click="goLogin">登录</a>
        <span>后发表评论</span>
      </div>
    </div>
    <div class="comment-content" v-show="loginStatus">
      <a class="avatar">
        <img
          :src="apiData.userInfo.headImg"
          alt="">
      </a>
      <div class="content">
        <div class="reply-edit" id="reply-edit"></div>
      </div>
    </div>
    <div class="btn-box" v-if="loginStatus">
      <!--<a class="submit is-disable" @click="replySubmit">发送</a>-->
      <a class="submit" :class="{'is-disable': commentOk === false}" @click="commentArticle">发送</a>
    </div>
    <div v-show="comment.length > 0" class="comment-list">
      <div class="comment-title">
        <span>精彩评论（{{comment.length}}）</span>
      </div>
      <div v-for="(item,index) in comment" class="comment">
        <div class="user-box">
          <div class="author">
            <a>
              <img
                :src="item.authorHeadImg"
                :alt="item.publisherName">
            </a>
          </div>
          <div class="info">
            <a class="name">{{item.publisherName}}</a>
            <div class="meta">
              <span>{{comment.length - index}}楼 · {{item.cTime | Format('yyyy-MM-dd hh:mm')}}</span>
            </div>
          </div>
        </div>
        <div class="comment-wrap">
          <div class="content" v-html="item.content">
          </div>
          <div class="tool-group">
            <a @click="initSubEdit(item.id, 1, item.authorId, item.publisherName)">
              <i class="iconfont icon-iconfontpinglun jb-all"></i>
              <span class="jb-all">回复</span>
            </a>
          </div>
        </div>
        <div class="sub-comment-list">
          <div class="sub-comment" v-for="chi in item.children">
            <div class="reply-meta">
              <img :src="chi.authorHeadImg" alt="">
              <a class="reply-author">{{chi.publisherName}}</a>{{chi.authorId != chi.originAuthorId ? '：' : ''}}<a
              class="at-author" v-if="chi.authorId != chi.originAuthorId">@{{chi.originPublisherName}}</a>
            </div>
            <div class="content" v-html="chi.content"></div>
            <div class="sub-tool-group">
              <span>{{chi.cTime | Format('yyyy-MM-dd hh:mm')}}</span>
              <a @click="initSubEdit(item.id, 2, chi.authorId, chi.publisherName)">
                <i class="iconfont icon-iconfontpinglun jb-all"></i>
                <span class="jb-all">回复</span>
              </a>
            </div>
          </div>
          <div class="more-comment" v-show="item.children && item.children.length > 0">
            <a class="add-comment-btn" @click="initSubEdit(item.id, 1, item.authorId, item.publisherName)">
              <i class="iconfont icon-icon5 jb-all"></i>
              <span class="jb-all">添加新评论</span>
            </a>
            <!--<span class="line-warp">-->
            <!--还有1条评论，-->
            <!--<a>展开查看</a>-->
            <!--</span>-->
          </div>
          <div class="reply-box" :data-id1="initEdit.id" :data-id2="item.id" v-show="initEdit.id == item.id">
            <div class="edit-content" :class="{at: initEdit.at}">
              <div class="at-box" v-show="initEdit.at">
                <a>@{{initEdit.atName}}</a>
                <div class="arrow">
                  <div class="arrow-cir"></div>
                </div>
              </div>
              <div class="reply-edit" :id="'sub-edit-'+item.id"></div>
            </div>
            <div class="btn-box">
              <!--<a class="submit is-disable" @click="replySubmit">发送</a>-->
              <a class="submit" :class="{'is-disable': initEdit.replyOk === false}" @click="commentReply">发送</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination-box" v-show="allLength > 0">
      <el-pagination
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        @current-change="pageSizeChange"
        :total="allLength">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'article-comment',
    data() {
      return {
        comment: [],
        commentOk: false,
        initEdit: {
          replyOk: false,
          id: 0,
          show: false,
          at: false,
          atName: '',
          atId: null,
        },
        pageNum: 1,
        pageSize: 10,
        allPage: 0,
        allLength: 0,
      }
    },
    props: {
      articleId: String,
      edit: String,
    },
    methods: {
      cleanAt() {
        this.initEdit.at = false
        this.initEdit.atName = ''
        this.initEdit.atId = null
        this.initEdit.id = 0
      },
      pageSizeChange(num) {
        this.pageNum = num
        this.initCommentList()
      },
      formatCode() {
        SyntaxHighlighter.highlight()
//        SyntaxHighlighter.config.clipboardSwf ='//static.webascii.cn/webascii/syntaxhighlighter_2.1.382/scripts/clipboard.swf';
//        SyntaxHighlighter.config.strings = {
//          expandSource :'展开代码',
////            viewSource :'查看代码',
////            copyToClipboard :'复制代码',
////            copyToClipboardConfirmation :'代码复制成功',
////            print :'打印',
////            help:'?',
////            alert:'语法高亮\n\n',
////            noBrush:'不能找到刷子: ',
////            brushNotHtmlScript:'刷子没有配置html-script选项',
////            aboutDialog:'<div></div>'
//        };
//        SyntaxHighlighter.all();
//        console.log(123123123)
//        let preDom = $('.comment-list pre')
////        console.log(preDom)
//        preDom.map((index, dom) => {
//          // 不包含code标签
//          if (!/\<code[\s\S]*code\>$/.test($(dom).html())) {
//            // 创建
////          let preDom = $('<pre>')
//            let str = `<code class="${$(dom).attr('class')}">${$(dom).html()}</code>`
//            $(dom).html(str)
//          }
//        })
//        $('pre code').each(function (i, block) {
//          let spt = $(this).text().split('\n')
//          let lines = spt.length
//          if (spt[spt.length - 1] == '') {
//            lines = lines - 1
//          }
//          let numbering = $('<ul/>').addClass('pre-numbering')
//          $(this)
//            .addClass('has-numbering')
//            .parent()
//            .append(numbering)
//            .addClass('has-numbering-parent')
//          for (i = 1; i <= lines; i++) {
//            numbering.append($('<li/>').text(i))
//          }
//        })
      },
      initCommentList() {
        this.$store.dispatch('noteCommentList', {
          articleId: this.articleId, // 文章ID
          pageSize: this.pageSize, // 每页几条
          pageNum: this.pageNum, // 第几页
        })
          .then(info => {
            if (info.status === 200) {
              this.comment = info.data.comment
              this.allLength = info.data.allLength
              this.pageNum = info.data.pageNum
              this.pageSize = info.data.pageSize
              this.allPage = info.data.allPage
              this.$emit('showCommentNum',info.data.allLength)
//              this.clickOK = true
              this.$nextTick(() => {
                this.formatCode()
              })
            }
          })
          .catch(error => {
            this.$message.error('评论获取失败')
          })
      },
      // 编辑器
      replyEdit() {
        if (!this.loginStatus) {
          return
        }
        let that = this
        require('~/plugins/froala-editor-custom-toolbar')()
        this.editDom = $('#reply-edit')
        this.editDom.froalaEditor({
          toolbarInline: true,
          charCounterCount: false,
          placeholderText: '写下你的评论...',
          toolbarButtons: [
            'insertImage',
            'quote',
            'insertCode',
            'formatOL',
            'formatUL',
          ],
          // 编辑框左侧加号
          quickInsertButtons: ['image', 'embedly', 'table', 'ul', 'ol', 'insertCode'],
          pastePlain: true,
          theme: 'gray',
          fontFamilySelection: true,
          fontSizeSelection: true,
          paragraphFormatSelection: true,
          imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
//          imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
          imageInsertButtons: ['imageBack', 'imageUpload'],
          fileUploadURL: `${this.$store.state.apiPath}/api/editor/upload/files`,
          fileUploadParams: {
            loginToken: that.$store.state.Cookies.loginToken,
            userId: that.$store.state.Cookies.userId,
          },
          paragraphFormat: {
//            N: 'Normal',
////            H1: 'Heading 1',
//            H2: 'Heading 2',
//            H3: 'Heading 3',
//            H4: 'Heading 4',
            "PRE class='webascii-code javascript'": 'javascript'
          },
          imageUploadURL: `${this.$store.state.apiPath}/api/editor/upload/files`,
          imageUploadParams: {
            loginToken: that.$store.state.Cookies.loginToken,
            userId: that.$store.state.Cookies.userId,
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
        this.editDom.on('froalaEditor.contentChanged', (e, editor) => {
          if (editor.html.get() == '') {
            this.commentOk = false
          } else {
            this.commentOk = true
          }
        })
      },
      // 提交评论
      commentArticle() {
        if (!this.commentOk) {
          return
        }
        this.commentOk = false
        let content = this.editDom.froalaEditor('html.get')
        if (content == '') {
          this.$message.warning('请输入内容')
          return
        }
//        let preDom = $('#reply-edit pre')
//        for (let item = 0; item < preDom.length; item++) {
//          hljs.highlightBlock(preDom[item])
//        }
        this.$store.dispatch('addNoteComment', {
          articleId: this.articleId, // 文章ID
          content: content, // 内容
          publisherName: this.$store.state.Cookies.nickname,
        })
          .then(info => {
            if (info.status === 200) {
              this.$message.success('评论成功~')
              this.editDom.froalaEditor('html.set', '')
              this.commentOk = false
              this.initCommentList()
//              this.cleanAt()
            } else {
//              this.cleanAt()
              this.$message.error('评论失败，请联系管理员')
              this.commentOk = true
            }
          })
          .catch(error => {
            this.$message.error('评论失败，请联系管理员')
//            this.cleanAt()
            this.commentOk = true
          })
      },
      commentReply() {
        if (!this.initEdit.replyOk) {
          return
        }
        this.initEdit.replyOk = false
        let content = this.initEdit.editDom.froalaEditor('html.get')
        if (content == '') {
          this.$message.warning('请输入内容')
          return
        }
//        let preDom = $('.reply-edit pre')
//        for (let item = 0; item < preDom.length; item++) {
//          hljs.highlightBlock(preDom[item])
//        }
        this.$store.dispatch('replyNoteComment', {
          articleId: this.articleId, // 文章ID
          content: content, // 内容
          publisherName: this.$store.state.Cookies.nickname,
          originCommentId: this.initEdit.id,
          originAuthorId: this.initEdit.atId,
          originPublisherName: this.initEdit.atName,
        })
          .then(info => {
            if (info.status === 200) {
              this.$message.success('评论成功~')
              this.initEdit.editDom.froalaEditor('html.set', '')
              this.initEdit.replyOk = false
              this.initCommentList()
              this.cleanAt()
            } else {
              this.$message.error('评论失败，请联系管理员')
              this.initEdit.replyOk = true
              this.cleanAt()
            }
          })
          .catch(error => {
            this.$message.error('评论失败，请联系管理员')
            this.initEdit.replyOk = true
            this.cleanAt()
          })
      },
      /**
       * 初始化子编辑器
       * @param id
       * @param type
       *  1: 没有@
       *  2: 需要@
       */
      initSubEdit(id, type, atId, atName) {
        if (!this.loginStatus) {
          this.goLogin()
          return
        }
        if (type === 1) {
          this.initEdit.at = false
        } else if (type === 2) {
          this.initEdit.at = true
        }
        this.initEdit.atId = atId
        this.initEdit.atName = decodeURI(atName)
        this.initEdit.id = id
//        this.initEdit.show = true
        let that = this
        this.initEdit.editDom = $(`#sub-edit-${id}`)
//        if (this.initEdit.editDom.froalaEditor) {
        this.initEdit.editDom.froalaEditor('destroy')
//        }
        this.initEdit.editDom.on('froalaEditor.initialized', (e, editor) => {
          // Do something here.
          this.$nextTick(() => {
            editor.events.focus()
            $('html,body').animate({scrollTop: this.initEdit.editDom.offset().top - 400 + "px"}, 300)
          })
        })
        this.initEdit.editDom.froalaEditor({
          toolbarInline: true,
          charCounterCount: false,
          placeholderText: '写下你的评论...',
          toolbarButtons: [
            'insertImage',
            'quote',
            'insertCode',
            'formatOL',
            'formatUL',
          ],
          // 编辑框左侧加号
          quickInsertButtons: ['image', 'embedly', 'table', 'ul', 'ol', 'insertCode'],
          pastePlain: true,
          theme: 'gray',
          fontFamilySelection: true,
          fontSizeSelection: true,
          paragraphFormatSelection: true,
          imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
//          imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
          imageInsertButtons: ['imageBack', 'imageUpload'],
          fileUploadURL: `${this.$store.state.apiPath}/api/editor/upload/files`,
          fileUploadParams: {
            loginToken: that.$store.state.Cookies.loginToken,
            userId: that.$store.state.Cookies.userId,
          },
          paragraphFormat: {
//            N: 'Normal',
////            H1: 'Heading 1',
//            H2: 'Heading 2',
//            H3: 'Heading 3',
//            H4: 'Heading 4',
//            "PRE class='webascii-code javascript'": 'javascript'
          },
          imageUploadURL: `${this.$store.state.apiPath}/api/editor/upload/files`,
          imageUploadParams: {
            loginToken: that.$store.state.Cookies.loginToken,
            userId: that.$store.state.Cookies.userId,
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

        this.initEdit.editDom.on('froalaEditor.contentChanged', (e, editor) => {
          if (editor.html.get() == '') {
            this.initEdit.replyOk = false
          } else {
            this.initEdit.replyOk = true
          }
        })

//        console.log(this.initEdit.editDom.froalaEditor)
//        this.initEdit.editDom.froalaEditor('events.focus')
      },
      // 去登录
      goLogin() {
        window.location.href = `/login/?url=${encodeURIComponent(window.location.pathname)}`
      }
    },
    components: {},
    computed: {
      ...mapState(['apiData']),
      ...mapState(['loginStatus']),
    },
    mounted() {
      this.$nextTick(() => {
        if (this.edit != 'edit') {
          this.initCommentList()
          this.replyEdit()
        }
//        console.log(111111, this.edit)
      })
    }
  }
</script>
<style lang="less">
  .article-comment {
    .pagination-box {
      .el-pagination {
        display: flex;
      }
      .btn-prev, .btn-next, .el-pager li.number, .el-pager li.more {
        height: 36px;
        border-radius: 36px;
        color: #969696;
      }
      .btn-prev, .btn-next {
        min-width: 36px;
        margin: 0 5px;
        border: 1px solid #ddd;
        &:hover {
          background-color: rgba(0, 0, 0, .05);
          color: #969696;
        }
      }
      .btn-prev[disabled=disabled], .btn-next[disabled=disabled] {
        color: #dedede;
        &:hover {
          background-color: inherit;
        }
      }
      .el-pager li.number, .el-pager li.more {
        width: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .btn-prev {
        padding: 0 15px;
      }
      .btn-next {
        padding: 0 15px;
      }
      .el-pager {
        display: flex;
        li.number {
          border: 1px solid #ddd;
          margin: 0 5px;
          &.active {
            font-weight: 700;
            border: none;
          }
          &:hover {
            background-color: rgba(0, 0, 0, .05);
            color: #969696;
          }
        }
        li.more {
          &:hover {
            color: #969696;
          }
        }
      }
    }
    .comment-list {
      .comment-wrap {
        .content {
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
      }
    }
  }
</style>
<style scoped lang="less">
  .article-comment {
    /*width: 880px;*/
    /*margin: 0 auto;*/
    padding-bottom: 50px;
    padding-top: 20px;
    .comment-content {
      display: flex;
      .avatar {
        width: 38px;
        height: 38px;
        img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        /*width: 100%;*/
        margin-left: 10px;
        min-height: 80px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 16px;
        /*overflow: auto;*/
        width: 814px;
        .reply-edit {
          width: 100%;
          min-height: 80px;
        }
        /*background-color: hsla(0,0%,71%,.1);*/
      }
      .sign-container {
        /*padding: 10px 15px;*/
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        width: 100%;
        height: 80px;
        font-size: 13px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        background-color: hsla(0, 0%, 71%, .1);
        resize: none;
        /*display: inline-block;*/
        /*vertical-align: top;*/
        outline-style: none;
        /*text-align: center;*/
        a {
          text-align: center;
          width: 78px;
          /*margin: 11px 10px 0 0;*/
          margin-right: 10px;
          padding: 7px 18px;
          font-size: 16px;
          border: none;
          border-radius: 20px;
          color: #fff;
          background-color: #3194d0;
          outline: none;
        }
        span {
          font-size: 14px;
        }
      }
    }
    .btn-box {
      display: flex;
      justify-content: flex-end;
      .submit {
        /*float: right;*/
        display: flex;
        justify-content: center;
        width: 78px;
        margin: 10px 0;
        padding: 8px 18px;
        font-size: 16px;
        border: none;
        border-radius: 20px;
        color: #fff !important;
        background-color: #42c02e;
        cursor: pointer;
        outline: none;
        &.is-disable {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }

    .comment-list {
      .comment-title {
        padding: 30px 0 20px 0;
        font-size: 17px;
        font-weight: 700;
        border-bottom: 1px solid #f0f0f0;
        span {
          vertical-align: middle;
        }
      }
      .comment {
        padding: 20px 0 30px;
        border-bottom: 1px solid #f0f0f0;
        &:last-child {
          border-bottom: none;
        }
        .user-box {
          display: flex;
          /*flex-direction: column;*/
          .author {
            width: 38px;
            height: 38px;
            margin-right: 8px;
            img {
              width: 38px;
              height: 38px;
              border-radius: 100%;
            }
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name {
              font-size: 15px;
              color: #333;
            }
            .meta {
              font-size: 12px;
              color: #969696;
            }
          }
        }
        .comment-wrap {
          margin-bottom: 20px;
          .content {
            font-size: 16px;
            margin: 10px 0;
            word-break: break-all;
            word-wrap: break-word;
          }
          .tool-group {
            a {
              display: flex;
              align-items: center;
              margin-right: 10px;
              font-size: 0;
              color: #969696;
              cursor: pointer;
              width: 68px;
              i {
                margin-right: 5px;
                font-size: 18px;
                /*vertical-align: middle;*/
              }
              span {
                /*vertical-align: middle;*/
                font-size: 14px;
              }
              &:hover {
                i {
                  color: #ea6f5a;
                }
                span {
                  color: #333333;
                }
              }
            }
          }
        }
        .sub-comment-list {
          padding: 0px 0 0px 20px;
          border-left: 2px solid #d9d9d9;
          .sub-comment {
            font-size: 14px;
            border-bottom: 1px dashed #f0f0f0;
            margin-bottom: 15px;
            padding-bottom: 15px;
            .content {
              margin-bottom: 5px;
            }
            .reply-meta {
              display: flex;
              align-items: center;
              height: 22px;
              margin-bottom: 6px;
              .reply-author {
                color: #3194d0;
              }
              .at-author {
                color: #3194d0;
              }
              img {
                width: 20px;
                height: 20px;
                margin-right: 5px;
                border-radius: 100%;
              }
            }
            .sub-tool-group {
              display: flex;
              align-items: center;
              span {
                font-size: 12px;
                color: #969696;
              }
              a {
                display: flex;
                align-items: center;
                font-size: 0;
                color: #969696;
                cursor: pointer;
                margin-left: 10px;
                i {
                  margin-right: 5px;
                  font-size: 14px;
                  /*vertical-align: middle;*/
                }
                span {
                  /*vertical-align: middle;*/
                  /*font-size: 14px;*/
                }
                &:hover {
                  i {
                    color: #ea6f5a;
                  }
                  span {
                    color: #333333;
                  }
                }
              }
            }
          }
          .more-comment {
            font-size: 14px;
            color: #969696;
            .add-comment-btn {
              color: #969696;
              &:hover {
                color: #333333;
              }
            }
            .line-warp {
              margin-left: 10px;
              padding-left: 10px;
              border-left: 1px solid #d9d9d9;
              a {
                color: #3194d0;
                cursor: pointer;
              }
            }
          }
        }
      }
      .reply-box {
        display: flex;
        flex-direction: column;
        .edit-content {
          &.at {
            border-top-left-radius: 0;
            margin-top: 40px;
          }
          .at-box {
            position: absolute;
            top: -24px;
            left: -1px;
            height: 24px;
            display: flex;
            align-items: center;
            border: 1px solid #dcdcdc;
            border-top-left-radius: 4px;
            border-top-right-radius: 12px;
            z-index: 1;
            border-bottom: 1px dashed #dcdcdc;
            background-color: #fff;
            a {
              color: #3194d0;
              display: flex;
              align-items: center;
              height: 100%;
              padding: 2px 10px 2px 5px;
            }
            .arrow {
              height: 12px;
              width: 12px;
              position: absolute;
              right: -12px;
              bottom: -1px;
              border-left: none;
              border-bottom: 1px dashed #dcdcdc;
              background: #fff;
              .arrow-cir {
                position: absolute;
                width: 13px;
                height: 12px;
                background: #fff;
                top: 0;
                right: -1px;
                z-index: 1;
                border-bottom-left-radius: 20px;
                border-left: 1px solid #dcdcdc;
                border-bottom: 1px solid #dcdcdc;
              }
            }
          }
          position: relative;
          display: flex;
          flex-direction: column;
          /*align-items: center;*/
          width: 100%;
          margin-top: 20px;
          min-height: 80px;
          border: 1px solid #dcdcdc;
          border-radius: 4px;
          padding: 5px 10px;
          font-size: 14px;
          .reply-edit {
            width: 100%;
            min-height: 80px;
          }
          /*background-color: hsla(0,0%,71%,.1);*/
        }
      }
    }
    .pagination-box {
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }
</style>
