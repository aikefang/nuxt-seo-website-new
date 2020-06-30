<template>
  <div class="header-box">
    <header
      :class="{hidden: !navShow && !search}"
      class="web-header jb-all">
      <div class="header-left">
        <a
          href="/m/"
          class="logo">
          <img
            src="https://static.webascii.cn/webascii/old_pictures/uploads/logo-min.png"
            alt="logo">
        </a>
        <span class="slogan">让记笔记成为一种习惯</span>
      </div>
      <div
        :class="{search:search}"
        class="header-right jb-all">
        <div class="box">
          <label class="search-input-label">
            <i
              class="iconfont icon-sousuo"
              @click="searchOpen"/>
          </label>
          <input
            ref="searchInput"
            v-model="key"
            class="search-input"
            placeholder="找文章 / 找答案 / 学经验"
            type="text">
          <label class="search-close-laber">
            <i
              class="iconfont icon-guanbi"
              @click="searchClose"/>
          </label>
        </div>
      </div>
    </header>
    <div
      :class="{show:search}"
      class="flow-list-container search-list jb-all">
      <div
        v-show="noList"
        class="no-list">
        <img
          src="//static.webascii.cn/webascii/uploads/empty.png"
          alt="">
        <p>
          没有找到想看的内容,
          <br>
          要不换个词儿再搜搜~
        </p>
      </div>
      <ul class="flow-list-ul">
        <li
          v-for="item in noteList"
          :key="item.id"
          class="note-flow">
          <div class="summary">
            <a
              :href="'/m/article/' + item._id + '/'"
              class="summary-box">
              <h6
                class="title"
                v-html="item.title"/>
              <p class="abstract">
                {{ item.articleDescribe }}
              </p>
            </a>
            <div class="meta">
              <span>{{ item.nickname }} {{ item.simplifyCTime }}</span>
              <i class="iconfont icon-browse">{{ item.views }}</i>
            </div>
          </div>
          <a
            :class="{'have-img':!!item.articleImageView}"
            class="wrap-img">
            <img
              :src="item.articleImageViewMobile"
              alt="">
          </a>
        </li>
      </ul>
      <div
        v-show="load && noteList.length > 0"
        class="search-load-more"
        @click="loadMore">
        展开更多搜索结果
        <i class="iconfont icon-Group-"/>
      </div>
      <div
        v-show="!load && noteList.length > 0"
        class="search-load-more">
        <i class="line"/>
        <span class="text">我是有底线的</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        navShow: true,
        search: false,
        key: '',
        noteList: [],
        load: true,
        pageNum: 1,
        searchTimer: null,
        noList: false
      }
    },
    watch: {
      key (val, oldVal) {
        if (val == '') {
          this.noteList = []
          return
        }
        clearTimeout(this.searchTimer)
        this.searchTimer = setTimeout(() => {
          this.noteList = []
          this.pageNum = 1
          this.searchList()
        }, 500)
      }
    },
    mounted() {
      this.searchList()

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
        } else {
          // 上滑
          this.navShow = true
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
    },
    methods: {
      async searchList() {
        if (this.key === '') {
          return
        }
        // let noteSearch = await this.$store.dispatch('noteSearch', {
        //   categoryFirst: 0,
        //   categorySecond: 0,
        //   pageSize: 20,
        //   pageNum: this.pageNum,
        //   key: this.key,
        // })
        // if (noteSearch.status === 200) {
        //   this.load = true
        //   this.noteList = this.noteList.concat(noteSearch.data.note.list)
        //   if (noteSearch.data.note.pageNum == noteSearch.data.note.totalPages) {
        //     this.load = false
        //     this.noList = false
        //   }
        //   if (noteSearch.data.note.pageNum == 1 && noteSearch.data.note.totalPages == 0) {
        //     this.load = false
        //     this.noList = true
        //   }
        // }
        const listRes = await this.$axios.get(`/api/biji/article/search`, {
          params: {
            keyword: this.key,
            pageNum: this.pageNum,
            levelFirst: null,
            levelSecond: null
          }
        })
        this.noteList = this.noteList.concat(listRes.data.note.list)
        // console.log(listRes)
      },
      searchOpen() {
        document.body.style.overflow = 'hidden'
        this.noList = false
        this.$refs.searchInput.focus()
        if (this.search === true) {
          return
        }
        this.search = true
        this.key = ''
        this.noteList = []
      },
      searchClose() {
        this.search = false
        this.noList = false
        this.key = ''
        this.noteList = []
        document.body.style.overflow = 'auto'
      },
      async loadMore() {
        if (this.load === false) {
          return
        }
        this.pageNum += 1
        this.searchList()
//        let info = await getNote(this.$store.dispatch, {
//          pageSize: 20,
//          pageNum: ++this.pageNum
//        })
//        // 初始化存储note数据
//        this.$store.dispatch('setApiDataPush', {
//          key: 'note',
//          value: info.data.note
//        })
//        if (info.data.len < 20) {
//          this.load = false
//        }
      }
    }
  }
</script>

<style scoped lang="less">
  .header-box {
    .web-header {
      position: fixed;
      top: 0;
      width: 100%;
      /*font-size: 0;*/
      background-color: #fff;
      z-index: 10;
      height: 48px;
      padding: 0 0 0 18px;
      -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
      box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      &.hidden {
        top: -50px;
      }
      .header-left {
        display: flex;
        align-items: center;
        .logo {
          display: flex;
          align-items: center;
          img {
            width: 65px;
            height: 42px;
          }
        }
        .slogan {
          margin-left: 12px;
          font-size: 16px;
          color: #333;
          font-weight: 400;
        }
      }
      .header-right {
        &.search {
          /*width: 100%;*/
          /*padding: 0 20px;*/
          /*justify-content: flex-start;*/
          right: 0;
        }
        height: 100%;
        width: 100%;
        display: flex;
        background-color: #ffffff;
        /*padding: 0 20px;*/
        /*justify-content: center;*/
        align-items: center;
        position: absolute;
        right: calc(40px - 100%);
        /*right: 0;*/
        top: 0;
        i.iconfont {
          font-size: 20px;
          color: #666666;
          height: 40px;
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          &.icon-sousuo {

          }
        }
        .search-input-label {

        }
        .box {
          display: flex;
          align-items: center;
          width: 100%;
          .search-input {
            display: flex;
            width: 100%;
            /*padding: 5px;*/
            outline: none;
            /*background: red;*/
            border: none;
            height: 40px;
            font-size: 16px;
            color: #2f2f2f;
          }
        }
      }
    }
    .search-list {
      position: fixed;
      overflow-y: auto;
      /*解决ios上滑动不流畅*/
      -webkit-overflow-scrolling: touch;
      height: calc(100% - 48px);
      top: 48px;
      /*left: 0;*/
      left: calc(100%);
      width: 100%;
      background: rgba(255, 255, 255, 96%);
      z-index: 6;
      &.show {
        left: 0;
      }
      &.flow-list-container {
        .flow-list-ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          .note-flow {
            display: flex;
            padding: 15px 18px;
            border-bottom: 1px solid;
            border-color: #f0f0f0;
            background-color: #ffffff;
            .summary {
              width: 100%;
              margin-right: 10px;
              .summary-box {
                display: flex;
                flex-direction: column;
                text-decoration: none;
                .title {
                  font-size: 18px;
                  color: #333;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
                .abstract {
                  margin-top: 6px;
                  font-size: 13px;
                  color: #999;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                }
              }
              .meta {
                margin-top: 8px;
                font-size: 12px;
                color: #b1b1b1;
                display: flex;
                align-items: center;
                i {
                  font-size: 12px;
                  display: flex;
                  align-items: center;
                  margin-left: 5px;
                  &:before {
                    margin-right: 2px;
                  }
                }
              }
            }
            .wrap-img {
              display: none;
              align-items: center;
              &.have-img {
                display: flex;
              }
              img {
                width: 80px;
                height: 45px;
              }
            }
          }
        }
        .flow-list-placeholder-load-more {
          margin: auto 0;
          padding: 15px 0 15px 7px;
          text-align: center;
          font-size: 15px;
          color: #969696;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /*hr {*/
          /*border-width: 0;*/
          /*height: 10px;*/
          /*background-color: #f5f5f5;*/
        /*}*/
      }
      .no-list {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #999999;
        font-size: 14px;
        img {
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
        }
      }
    }
    .search-load-more {
      margin: auto 0;
      /*padding: 15px 0 15px 7px;*/
      text-align: center;
      font-size: 15px;
      color: #969696;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 48px;
      background-color: #ffffff;
      i.line {
        width: 80%;
        position: absolute;
        height: 1px;
        top: 50%;
        background-color: #b1b1b1;
      }
      .text {
        display: block;
        background-color: #ffffff;
        padding: 0 10px;
        z-index: 1;
      }
    }
  }

</style>
