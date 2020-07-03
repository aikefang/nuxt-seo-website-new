<template>
    <div class="book-detail">
        <NavBar></NavBar>
        <div class="book-header">
            <div class="book-info-box">
                <div class="book-img">
                    <img
                      class="lazy-img-fadein"
                      v-lazy="bookDetail.bookImg + '?imageMogr2/auto-orient/strip/format/jpg/interlace/1/quality/80'"
                      :alt="bookDetail.bookName">
                </div>
                <h1 class="book-title">{{ bookDetail.bookName }}</h1>
                <ul class="book-meta">
                    <li>
                        <time :datetime="bookDetail.cTime">{{bookDetail.cTime | Format('yyyy-MM-dd hh:mm')}}</time>
                    </li>
                    <li>
                        <i class="iconfont icon-browse"></i>
                        {{bookDetail.views}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="download-info">
            <div class="baidu-url">
                {{bookDetail.baiduCloudDiskUrl}}
            </div>
        </div>
        <div class="statement">
            <p>免责声明：网站所有作品均由网友上传，仅供读者预览及学习交流使用，下载后请24小时内删除。</p>
            <p>如果喜欢请购买正版资源!原作者如果认为本站侵犯了您的版权,请微信告知,我们会立即删除! 微信：zhuangkai168</p>
        </div>
        <BottomFooter></BottomFooter>
    </div>
</template>
<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import NavBar from '~/components/NavBar.vue'
  import BottomFooter from '~/components/Footer.vue'


  export default {
    name: 'Book_detail',
    async asyncData({store, route, params, $axios, redirect}) {
      if (Number(params.id)) {
        const redirectRes = await $axios.get(`/api/book/redirect`, {
          params: {
            id: params.id
          }
        })
        if (redirectRes.status === 200 && redirectRes.data.needRedirect) {
          return redirect(`/book/${redirectRes.data.redirect}/`)
        }
      }


      store.commit('global/setNavStatus', 'book')


      // store.state.navStatus = 3
      const bookDetail = await $axios.get('/api/book/details', {
        params: {
          id: params.id
				}
      })

			console.log(bookDetail)
			return {
        bookDetail: bookDetail.data
			}
    },
    head() {
      return {
        script: [
//          { src: '//static.webascii.cn/webascii/global/qiniu-v2.5.1/qiniu.min.js' }
        ],
        link: [
//        { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css' },
        ],
        title: `${this.bookDetail.bookName}_pdf_下载 - webascii.cn`,
        meta: [
          {hid: 'keywords', name: 'keywords', content: 'javascript系列、jquery系列、HTML5系列、css系列'},
          {hid: 'description', name: 'description', content: 'js书籍，html书籍，犀牛书，设计书籍'}
        ]
      }
    },
    data() {
      return {

      }
    },
    methods: {},
    components: {
      NavBar,
//      slide,
      BottomFooter,
//      recommendCollection,
//      recommendContent
    },
    computed: {
      ...mapState(['apiData']),
      ...mapState(['apiPath']),
    },
    mounted() {
      if (this.$route.name == 'book') {
        if (this.$route.query.upload == 1) {
          this.openUploadPopup()
        }
      }
    }
  }


</script>
<style scoped lang="less">
    .book-detail {
        margin-top: 56px;
        .book-header {
            background-image: url("//static.webascii.cn/webascii/book/bg/book-detail-bg.jpg");
            position: relative;
            padding: 1px 0;
            height: 380px;
            background-position: top center;
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            &:before {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: #000;
                content: " ";
                opacity: .6;
            }
            .book-info-box {
                position: relative;
                width: 1200px;
                margin: 0 auto;
                .book-img {
                    padding-top: 60px;
                    display: flex;
                    justify-content: center;
                    img {
                        width: 135px;
                        height: 175px;
                    }
                }
                .book-title {
                    color: #fff;
                    text-align: center;
                    text-transform: none;
                    font-weight: 400;
                    font-size: 24px;
                    line-height: 30px;
                }
                .book-meta {
                    display: flex;
                    justify-content: center;
                    margin: 10px 0 10px;
                    padding: 0;
                    color: #fff;
                    text-align: center;
                    font-size: 12px;
                    li {
                        height: 20px;
                        display: flex;
                        align-items:center;
                        justify-content: center;
                        margin: 0 8px 0 0;
                        padding-left: 12px;
                        border-left: 1px solid #EEE;
                        &:first-child {
                            border: none;
                        }
                        i {
                            font-size: 14px;
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
        .download-info {
            .baidu-url {
                width: 575px;
                height: 200px;
                margin: 0 auto;
            }
            padding-top: 30px;
        }



        .statement {
            width: 1200px;
            margin: 0 auto;
            font-size: 14px;
            padding-top: 20px;
            text-align: center;
            color: #666666;
        }
    }
</style>
